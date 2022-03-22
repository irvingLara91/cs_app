import React, {useEffect} from "react";
import {
    VStack,
    Input,
    FormControl,
    View,
    Select,
    CheckIcon,
    Text,
    IconButton, Box, Button, Center
} from "native-base";
import {useForm, Controller} from "react-hook-form";
import {useNavigation} from "@react-navigation/native";
import {MaterialIcons} from "@expo/vector-icons";

import screens from "~/constants/screens";
import styles from "./styles";
import CustomButton from "~/components/CustomButton/CustomButton";

const Form = ({profile = null, ...props}) => {
    const {onSubmit} = props;
    const {flexSpaceBetween} = styles;
    const navigation = useNavigation();
    const {control, setValue, handleSubmit, reset, formState: {errors}} = useForm();


    const setUserData = () => {
        setValue("firstName", profile.firstName);
        setValue("lastName", profile.lastName);
        setValue("email", profile.email);
        setValue("phoneNumber", profile.phoneNumber);
        setValue("address", profile.address.address)
        setValue("zipCode", profile.address.zipCode.toString())
        setValue("city", profile.address.city)
        setValue("password", ".............")
    }
    useEffect(() => {
        if (profile) {
            setUserData()
        }
    }, [profile]);

   /* const updateIcon = (name, val) => (
        <IconButton
            onPress={
					name.substr(0, 7) === "address" ?
						profile?.address?.[name.substr(8)] !== val && handleSubmit((data) => onSubmit(data, {
							name,
							val
						}))
						:
						profile?.[name] !== val && handleSubmit((data) => onSubmit(data, {name, val}))
		}
            variant="outlined"
            _icon={{
                as: MaterialIcons,
                name: name.substr(0, 7) === "address" ?
					profile?.address?.[name.substr(8)] !== val+"" ? "check" : ""
					:
					profile?.[name] !== val ? "check" : "",
                color: "black",
                size: 4
            }}
        />
    )*/


    return (
        <VStack space={2} pb="5" alignItems="center">
            <Text alignSelf="flex-start" fontSize={19} fontWeight="bold" mb="5">My personal information</Text>
            <FormControl isRequired isInvalid={"firstName" in errors}>
                <FormControl.Label>First name</FormControl.Label>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <Input
                            //InputRightElement={updateIcon("firstName", value)}
                            variant="outline"
                            onBlur={onBlur}
                            onChangeText={(text) => {
                                onChange(text)
                                props.setFirstName(text)
                            }}
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
                        <Input
                           /// InputRightElement={updateIcon("lastName", value)}
                            variant="outline"
                            onBlur={onBlur}
                            onChangeText={(text) => {
                                onChange(text)
                                props.setLastName(text)
                            }}
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
                        <Input
                            //InputRightElement={updateIcon("phoneNumber", value)}
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
            <FormControl isRequired isInvalid={"email" in errors}>
                <FormControl.Label>Email</FormControl.Label>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <Input
                            variant="outline"
                            onBlur={onBlur}
                            onChangeText={(text) => onChange(text)}
                            value={value}
                            isDisabled={true}

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
            <FormControl isRequired isInvalid={"address" in errors}>
                <FormControl.Label>Address</FormControl.Label>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <Input
                           // InputRightElement={updateIcon("address.address", value)}
                            //InputRightElement={profile?.address?.address !== value && updateIcon()}
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
                <FormControl isRequired isInvalid={"city" in errors} style={{width: "48%"}}>
                    <FormControl.Label>City</FormControl.Label>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <Input
								//InputRightElement={updateIcon("address.city", value)}
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
                            <Input
								//InputRightElement={updateIcon("address.zipCode", value)}
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
            <FormControl isRequired isInvalid={"password" in errors}>
                <FormControl.Label>Password</FormControl.Label>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <Input

                            InputRightElement={<IconButton
                                onPress={() => navigation.navigate({name: screens.PASSWORD_UPDATE})} variant="outlined"
                                _icon={{
                                    as: MaterialIcons,
                                    name: "edit",
                                    color: "black",
                                    size: 4
                                }}/>}
                            type="password"
                            variant="outline"
                            onBlur={onBlur}
                            onChangeText={(text) => onChange(text)}
                            value={value}
                            isDisabled={true}
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
                <Box w="full" mt={5} maxW="full">
                    <CustomButton  onPress={handleSubmit(onSubmit)}
                                  title={"Save change"}
                                  textColor={"#fff"}
                                  gradient={["#555555", "#171717"]}
                                  borderRadius={10}/>
                </Box>
        </VStack>
    );
};

export default Form;