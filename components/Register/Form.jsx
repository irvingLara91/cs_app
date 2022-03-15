import React from "react";
import {
    VStack,
    Input,
    Button,
    FormControl,
    View
} from "native-base";
import {useForm, Controller} from "react-hook-form";
import {useNavigation} from "@react-navigation/native";
import {TextInput} from "react-native"

import styles from "./styles";
import CustomButton from "~/components/CustomButton  /CustomButton";


const Form = ({onSubmit}) => {
    const navigation = useNavigation();
    const {flexSpaceBetween,textInput} = styles;
    const {control, handleSubmit, formState: {errors}} = useForm();

    return (
        <VStack space={2} alignItems="center">
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
            <FormControl isRequired isInvalid={"password" in errors}>
                <FormControl.Label>Password</FormControl.Label>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
						<TextInput
							style={textInput}
                            type="password"
                            secureTextEntry={true}
                            variant="outline"
                            onBlur={onBlur}
                            onChangeText={(text) => onChange(text)}
                            value={value}
                            autoCapitalize="none"
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