import React, {useEffect, useState} from "react";
import {
    VStack,
    Input,
    Button,
    FormControl,
    View, IconButton
} from "native-base";
import {useForm, Controller} from "react-hook-form";
import {useNavigation} from "@react-navigation/native";
import {Text, TextInput} from "react-native"

import styles from "./styles";
import CustomButton from "~/components/CustomButton/CustomButton";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";
import {MaterialIcons} from "@expo/vector-icons";


const Form = ({onRegister}) => {
    const navigation = useNavigation();
    const {flexSpaceBetween, textInput} = styles;
    const {control, handleSubmit,register, formState: {errors}, setError} = useForm();
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] = useState(false);


    const onSubmit = async (data) => {

        const {password, passwordConfirm} = data;

        if (password === passwordConfirm) {
            delete data.passwordConfirm
            onRegister(data)
        }else {
            setError("password", {
                type: "manual",
                message: "Password mismatch",
            });
            setError("passwordConfirm", {
                type: "manual",
                message: "Password mismatch",
            });
        }

    }

    return (
        <VStack space={2}>
            <FormControl isRequired isInvalid={"email" in errors}>
                <FormControl.Label>Email</FormControl.Label>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style={textInput}
                            variant="outline"
                            onBlur={onBlur}
                            onChangeText={(text) => onChange(text)}
                            value={value}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            {...register("email", {
                                required: "required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Entered value does not match email format"
                                }
                            })}
                        />
                    )}
                    name="email"
                    rules={{required: "Field is required", minLength: 3}}
                    defaultValue=""
                />
                <FormControl.ErrorMessage>
                    {errors?.email?.message}
                </FormControl.ErrorMessage>
            </FormControl>
            <View style={{
                marginTop: 2,
                marginBottom: 5
            }}>
                <Text style={{
                    fontFamily: "Roboto_400Regular",
                    fontSize: textSizeRender(3.6)
                }}>Password<Text style={{color: 'red'}}>*</Text></Text>
            </View>
            <FormControl
                style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0, height: 4,
                    },
                    borderColor: '#C4C4C4',
                    shadowOpacity: 0.30,
                    shadowRadius: 2.65,
                    elevation: 8,
                }}
                mb={2} isRequired isInvalid={"password" in errors}>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <Input
                            height={SCREEN_WIDTH * .11}
                            borderRadius={8}
                            borderColor='#C4C4C4'
                            borderWidth={.5}
                            _focus={{borderColor: '#C4C4C4'}}
                            _light={{
                                paddingLeft: 5,
                                backgroundColor: 'primary_white.50',
                            }} _dark={{
                            paddingLeft: 5,
                            backgroundColor: 'primary_white.50',
                        }}
                            InputRightElement={<IconButton
                                onPress={() => setShowNewPassword((prevState) => !prevState)}
                                variant="outlined" _icon={{
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
                    name="password"
                    rules={{required: "Field is required", minLength: 3}}
                    defaultValue=""
                />
                <FormControl.ErrorMessage>
                    {errors?.password?.message}
                </FormControl.ErrorMessage>
            </FormControl>

            <View style={{
                marginTop: 2,
                marginBottom: 5
            }}>
                <Text style={{
                    fontFamily: "Roboto_400Regular",
                    fontSize: textSizeRender(3.6)
                }}>Confirm password<Text style={{color: 'red'}}>*</Text></Text>
            </View>
            <FormControl
                style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0, height: 4,
                    },
                    borderColor: '#C4C4C4',
                    shadowOpacity: 0.30,
                    shadowRadius: 2.65,
                    elevation: 8,
                }}
                mb={2} isRequired isInvalid={"passwordConfirm" in errors}>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <Input
                            height={SCREEN_WIDTH * .11}
                            borderRadius={8}
                            borderColor='#C4C4C4'
                            borderWidth={.5}
                            _focus={{borderColor: '#C4C4C4'}}
                            _light={{
                                paddingLeft: 5,
                                backgroundColor: 'primary_white.50',
                            }} _dark={{
                            paddingLeft: 5,
                            backgroundColor: 'primary_white.50',
                        }}
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
                    name="passwordConfirm"
                    rules={{required: "Field is required", minLength: 3}}
                    defaultValue=""
                />
                <FormControl.ErrorMessage>
                    {errors?.passwordConfirm?.message}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={"firstName" in errors}>
                <FormControl.Label>First name</FormControl.Label>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style={textInput}
                            variant="outline"
                            onBlur={onBlur}
                            onChangeText={(text) => onChange(text)}
                            value={value}
                        />
                    )}
                    name="firstName"
                    rules={{required: "Field is required", minLength: 3}}
                    defaultValue=""
                />
                <FormControl.ErrorMessage>
                    {errors?.firstName?.message}
                </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={"lastName" in errors}>
                <FormControl.Label>Last name</FormControl.Label>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style={textInput}
                            variant="outline"
                            onBlur={onBlur}
                            onChangeText={(text) => onChange(text)}
                            value={value}
                        />
                    )}
                    name="lastName"
                    rules={{required: "Field is required", minLength: 3}}
                    defaultValue=""
                />
                <FormControl.ErrorMessage>
                    {errors?.lastName?.message}
                </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={"phoneNumber" in errors}>
                <FormControl.Label>Phone number</FormControl.Label>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style={textInput}
                            variant="outline"
                            onBlur={onBlur}
                            onChangeText={(text) => onChange(text)}
                            value={value}
                        />
                    )}
                    name="phoneNumber"
                    rules={{required: "Field is required", minLength: 3}}
                    defaultValue=""
                />
                <FormControl.ErrorMessage>
                    {errors?.phoneNumber?.message}
                </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={"address" in errors}>
                <FormControl.Label>Address</FormControl.Label>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style={textInput}
                            variant="outline"
                            onBlur={onBlur}
                            onChangeText={(text) => onChange(text)}
                            value={value}
                        />
                    )}
                    name="address"
                    rules={{required: "Field is required", minLength: 3}}
                    defaultValue=""
                />
                <FormControl.ErrorMessage>
                    {errors?.address?.message}
                </FormControl.ErrorMessage>
            </FormControl>
            <View style={flexSpaceBetween}>
                <FormControl isRequired isInvalid={"address" in errors} style={{width: "48%"}}>
                    <FormControl.Label>City</FormControl.Label>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={textInput}
                                variant="outline"
                                onBlur={onBlur}
                                onChangeText={(text) => onChange(text)}
                                value={value}
                            />
                        )}
                        name="city"
                        rules={{required: "Field is required", minLength: 3}}
                        defaultValue=""
                    />
                    <FormControl.ErrorMessage>
                        {errors?.city?.message}
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={"zipCode" in errors} style={{width: "48%"}}>
                    <FormControl.Label>Zip code</FormControl.Label>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={textInput}
                                variant="outline"
                                onBlur={onBlur}
                                onChangeText={(text) => onChange(text)}
                                value={value}
                            />
                        )}
                        name="zipCode"
                        rules={{required: "Field is required", minLength: 3}}
                        defaultValue=""
                    />
                    <FormControl.ErrorMessage>
                        {errors?.zipCode?.message}
                    </FormControl.ErrorMessage>
                </FormControl>

            </View>
            <CustomButton onPress={handleSubmit(onSubmit)}
                          title={"Register"}
                          textColor={"#fff"}
                          gradient={["#555555", "#171717"]}
                          borderRadius={10}/>
            <CustomButton onPress={() => navigation.goBack()}
                          title={"Back"}
                          textColor={"#fff"}
                          gradient={["#838B95", "#4A4E54"]}
                          borderRadius={10}/>
        </VStack>
    );
};

export default Form;