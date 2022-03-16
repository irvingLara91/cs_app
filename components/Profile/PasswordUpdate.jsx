import React, {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {Center, Stack, IconButton, FormControl, Input, Button, Box} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";

import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";
import ContainerBaseV2 from "~/components/common/ContainerBaseV2";
import authService from "~/services/auth";
import {useAuthUserContext} from "~/context/authUser";

const PasswordUpdate = ({navigation}) => {
    const { user } = useAuthUserContext();
    const {control, handleSubmit, formState: {errors}, setError} = useForm();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] = useState(false);

    const onSubmit = async(data) => {
        const { newPassword, newPasswordConfirm, currentPassword } = data;
        const verified = await authService.login(user.email, currentPassword);

        if (!verified.hasOwnProperty("errorCode")) {
            if (newPassword === newPasswordConfirm) {
               const result = await authService.updateUserPassword(newPassword);
               if (result.success) {
                   //trigger success 
               } else {
                   // trigger error alert
               }
            } else {
                setError("newPassword", {
                    type: "manual",
                    message: "Password mismatch",
                });
                setError("newPasswordConfirm", {
                    type: "manual",
                    message: "Password mismatch",
                });
            }
        } else {
            setError("currentPassword", {
                type: "manual",
                message: "Incorrect password",
            });
        }        
    };

    return (
        <ContainerBaseV2>
            <Center pt="5" pb="5">
                <Stack w="full" maxWidth="300">
                    <FormControl mb={3} isInvalid={"currentPassword" in errors}>
                        <FormControl.Label
                            _text={{
                                color: "primary_black",
                                fontFamily: "Roboto_700Bold",
                                fontSize: textSizeRender(4),
                            }}
                        >Current password</FormControl.Label>
                        <Controller
                            control={control}
                            render={({field: {onChange, onBlur, value}}) => (
                                <Input
                                    height={SCREEN_WIDTH * .12}
                                    _light={{
                                        paddingLeft: 5,
                                        backgroundColor: 'primary_white.50',
                                    }} _dark={{
                                    paddingLeft: 5,
                                    backgroundColor: 'primary_white.50',
                                }}
                                    variant="rounded"
                                    InputRightElement={<IconButton
                                        onPress={() => setShowCurrentPassword((prevState) => !prevState)}
                                        variant="outlined"
                                        _icon={{
                                            as: MaterialIcons,
                                            name: `${!showCurrentPassword ? "visibility" : "visibility-off"}`,
                                            color: "black",
                                            size: 4
                                        }}/>}
                                    type={`${showCurrentPassword ? "text" : "password"}`}
                                    onBlur={onBlur}
                                    onChangeText={(text) => onChange(text)}
                                    value={value}
                                />
                            )}
                            name="currentPassword"
                            rules={{required: "Field is required", minLength: 3}}
                            defaultValue=""
                        />
                        <FormControl.ErrorMessage>
                            {errors?.currentPassword?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl mb={3} isInvalid={"newPassword" in errors}>
                        <FormControl.Label
                            _text={{
                                color: "primary_black",
                                fontFamily: "Roboto_700Bold",
                                fontSize: textSizeRender(4),
                            }}
                        >New password</FormControl.Label>
                        <Controller
                            control={control}
                            render={({field: {onChange, onBlur, value}}) => (
                                <Input
                                    height={SCREEN_WIDTH * .12}
                                    _light={{
                                        paddingLeft: 5,
                                        backgroundColor: 'primary_white.50',
                                    }} _dark={{
                                    paddingLeft: 5,
                                    backgroundColor: 'primary_white.50',
                                }}
                                    variant="rounded"
                                    InputRightElement={<IconButton
                                        onPress={() => setShowNewPassword((prevState) => !prevState)} variant="outlined"
                                        _icon={{
                                            as: MaterialIcons,
                                            name: `${!showNewPassword ? "visibility" : "visibility-off"}`,
                                            color: "black",
                                            size: 4
                                        }}/>}
                                    type={`${showNewPassword ? "text" : "password"}`}
                                    onBlur={onBlur}
                                    onChangeText={(text) => onChange(text)}
                                    value={value}
                                />
                            )}
                            name="newPassword"
                            rules={{required: "Field is required", minLength: 3}}
                            defaultValue=""
                        />
                        <FormControl.ErrorMessage>
                            {errors?.newPassword?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl mb={8} isInvalid={"newPasswordConfirm" in errors}>
                        <FormControl.Label
                            _text={{
                                color: "primary_black",
                                fontFamily: "Roboto_700Bold",
                                fontSize: textSizeRender(4),
                            }}
                        >Confirm new password</FormControl.Label>
                        <Controller
                            control={control}
                            render={({field: {onChange, onBlur, value}}) => (
                                <Input
                                    height={SCREEN_WIDTH * .12}
                                    _light={{
                                        paddingLeft: 5,
                                        backgroundColor: 'primary_white.50',
                                    }} _dark={{
                                    paddingLeft: 5,
                                    backgroundColor: 'primary_white.50',
                                }}
                                    variant="rounded"
                                    InputRightElement={<IconButton
                                        onPress={() => setShowNewPasswordConfirmation((prevState) => !prevState)}
                                        variant="outlined" _icon={{
                                        as: MaterialIcons,
                                        name: `${!showNewPasswordConfirmation ? "visibility" : "visibility-off"}`,
                                        color: "black",
                                        size: 4
                                    }}/>}
                                    type={`${showNewPasswordConfirmation ? "text" : "password"}`}
                                    onBlur={onBlur}
                                    onChangeText={(text) => onChange(text)}
                                    value={value}
                                />
                            )}
                            name="newPasswordConfirm"
                            rules={{required: "Field is required", minLength: 3}}
                            defaultValue=""
                        />
                        <FormControl.ErrorMessage>
                            {errors?.newPasswordConfirm?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <Button bgColor="primary_black.900" borderRadius={10} onPress={handleSubmit(onSubmit)} size="lg"
                            style={{width: "100%"}}>
                        Change password
                    </Button>
                </Stack>
            </Center>
        </ContainerBaseV2>
    );
};

export default PasswordUpdate;