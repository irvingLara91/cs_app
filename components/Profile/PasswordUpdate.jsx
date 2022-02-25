import React, {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {Center, Stack, IconButton, FormControl, Input, Button, Box} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";

import screens from "~/constants/screens";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";
import ContainerBaseV2 from "~/components/common/ContainerBaseV2";

const PasswordUpdate = ({navigation}) => {
    const {control, handleSubmit, formState: {errors}} = useForm();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] = useState(false);

    const onSubmit = (data) => {
        console.log("submiting with ", data);
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
                                        borderColor: 'primary_black.100',
                                        backgroundColor: 'primary_white.50',
                                    }} _dark={{
                                    borderColor: 'primary_black.100',
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
                                        borderColor: 'primary_black.100',
                                        backgroundColor: 'primary_white.50',
                                    }} _dark={{
                                    borderColor: 'primary_black.100',
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