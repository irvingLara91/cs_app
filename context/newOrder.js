import React, {
	useState,
	createContext,
	useContext,
} from "react";

export const NewOrderContext = createContext();

export function NewOrderProvider(props) {
	const { children } = props;
	const [step, setStep] = useState(1);
	const totalSteps = 4;

	const defaultContext = {
		setStep,
		step,
		totalSteps,
	};
	return (
		<NewOrderContext.Provider value={defaultContext}>
			{children}
		</NewOrderContext.Provider>
	);
}

export function useNewOrderContext() {
	return useContext(NewOrderContext);
}
