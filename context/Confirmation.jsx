import React, {
  useState,
  createContext,
  useContext,
  useRef,
  useCallback
} from "react";
import { AlertDialog, Button, Text } from "native-base";

export const ConfirmationContext = createContext();

const _defaultOptions = {
  title: "Are you sure?",
  description: "",
  confirmationText: "Confirm",
  cancellationText: "Cancel",
  dialogProps: {},
  confirmationButtonProps: {},
  cancellationButtonProps: {},
};

export function ConfirmationProvider(props, defaultOptions = {}) {
  const { children } = props;
  const [options, setOptions] = useState({ ..._defaultOptions, ...defaultOptions });
  const [resolveReject, setResolveReject] = useState([]);
  const [resolve, reject] = resolveReject;

  const confirm = useCallback((options = {}) => {
    return new Promise((resolve, reject) => {
      setOptions({ ..._defaultOptions, ...defaultOptions, ...options });
      setResolveReject([resolve, reject]);
    });
  }, [defaultOptions]);

  const handleClose = useCallback(() => {
    setResolveReject([]);
  }, []);

  const handleCancel = useCallback(() => {
    reject("Cancelled");
    handleClose();
  }, [reject, handleClose]);

  const handleConfirm = useCallback(() => {
    resolve();
    handleClose();
  }, [resolve, handleClose]);


  return ([
    <ConfirmationContext.Provider value={confirm}>
      {children}
    </ConfirmationContext.Provider>,
    <ConfirmationDialog options={options} onCancel={handleCancel} onConfirm={handleConfirm} onClose={handleClose} open={resolveReject.length === 2}/>
  ]);
}

export function useConfirmationContext() {
  return useContext(ConfirmationContext);
}


const ConfirmationDialog = ({options, onConfirm, onCancel, onClose, open}) => {
  const cancelRef = useRef();
  const {
    title,
    description,
    confirmationText,
    cancellationText,
    dialogProps,
    confirmationButtonProps,
    cancellationButtonProps,
  } = options;
  return (
    <AlertDialog {...dialogProps} leastDestructiveRef={cancelRef} isOpen={open} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header><Text>{title}</Text></AlertDialog.Header>
        <AlertDialog.Body>
          <Text>{description}</Text>
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button {...cancellationButtonProps} variant="unstyled" colorScheme="coolGray" onPress={onCancel} ref={cancelRef}>
              {cancellationText}
            </Button>
            <Button {...confirmationButtonProps} colorScheme="danger" onPress={onConfirm}>
              {confirmationText}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};