import React, { useEffect } from "react";
import {
	VStack,
	Input,
	FormControl,
	View,
	Select,
	CheckIcon,
	Text,
	IconButton
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import screens from "~/constants/screens";
import styles from "./styles";
import userService from "~/services/user";

const Form = ({profile = null,...props}) => {
	const { flexSpaceBetween } = styles;
	const navigation = useNavigation();
	const { control,setValue, handleSubmit, reset, formState: { errors } } = useForm();


	const setUserData =()=>{

		console.log(profile)
		setValue("firstName", profile.firstName);
		setValue("lastName", profile.lastName);
		setValue("email", profile.email);
		setValue("phoneNumber", profile.phoneNumber);
		setValue("address",profile.address.address)
		setValue("zipCode",profile.address.zipCode+"")
		setValue("city","chi")
		setValue("password",".............")



		//setImage(user.photoURL)
	}
	useEffect(() => {
		if (profile){
			setUserData()
		}
		/*const getUserDetails = async() => {
			const result = await userService.getUserDetails(1);
			reset({...result});
		};
		getUserDetails();*/

	}, [profile]);

	const onSubmit = (data) => {
		console.log("submiting with ", data);
	};


	return (
		<VStack space={2} pb="5" alignItems="center">
			<Text alignSelf="flex-start" fontSize={19} fontWeight="bold" mb="5">My personal information</Text>
			<FormControl isRequired isInvalid={"firstName" in errors}>
				<FormControl.Label>First name</FormControl.Label>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							InputRightElement={<IconButton variant="outlined" _icon={{
								as: MaterialIcons,
								name: "edit",
								color: "black",
								size: 4
							}} />}
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
					rules={{ required: "Field is required", minLength: 3 }}
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
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							InputRightElement={<IconButton variant="outlined" _icon={{
								as: MaterialIcons,
								name: "edit",
								color: "black",
								size: 4
							}} />}
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
					rules={{ required: "Field is required", minLength: 3 }}
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
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							InputRightElement={<IconButton variant="outlined" _icon={{
								as: MaterialIcons,
								name: "edit",
								color: "black",
								size: 4
							}} />}
							variant="outline"
							onBlur={onBlur}
							onChangeText={(text) => onChange(text)}
							value={value}
						/>
					)}
					name="phoneNumber"
					rules={{ required: "Field is required", minLength: 3 }}
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
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							InputRightElement={<IconButton variant="outlined" _icon={{
								as: MaterialIcons,
								name: "edit",
								color: "black",
								size: 4
							}} />}
							variant="outline"
							onBlur={onBlur}
							onChangeText={(text) => onChange(text)}
							value={value}
							isDisabled={true}

						/>
					)}
					name="email"
					rules={{ required: "Field is required", minLength: 3 }}
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
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							InputRightElement={<IconButton variant="outlined" _icon={{
								as: MaterialIcons,
								name: "edit",
								color: "black",
								size: 4
							}} />}
							variant="outline"
							onBlur={onBlur}
							onChangeText={(text) => onChange(text)}
							value={value}
						/>
					)}
					name="address"
					rules={{ required: "Field is required", minLength: 3 }}
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
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								InputRightElement={<IconButton variant="outlined" _icon={{
									as: MaterialIcons,
									name: "edit",
									color: "black",
									size: 4
								}} />}
								selectedValue={value}
								onValueChange={(itemValue) => {
									onChange(itemValue);
								}}
								_selectedItem={{
									bg: "teal.400",
									endIcon: <CheckIcon size={4} />
								}}  
							>
								{
									[{label: "Chicago", value: "chi"}, {label: "New York", value: "ny"}].map((city, index) => <Select.Item key={index} label={city.label} value={city.value} />)
								}
							</Select>
						)}
						name="city"
						rules={{ required: "Field is required" }}
						defaultValue="chi"
					/>
					<FormControl.ErrorMessage>
						{errors.city?.message}
					</FormControl.ErrorMessage>
				</FormControl>
				<FormControl isRequired isInvalid={"zipCode" in errors} style={{width: "48%"}}>
					<FormControl.Label>Zip code</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								InputRightElement={<IconButton variant="outlined" _icon={{
									as: MaterialIcons,
									name: "edit",
									color: "black",
									size: 4
								}} />}
								variant="outline"
								onBlur={onBlur}
								onChangeText={(text) => onChange(text)}
								value={value}
							/>
						)}
						name="zipCode"
						rules={{ required: "Field is required", minLength: 3 }}
						defaultValue=""
					/>
					<FormControl.ErrorMessage>
						{errors?.zipCode?.message}
					</FormControl.ErrorMessage>
				</FormControl>
				
			</View>
			<FormControl isRequired isInvalid={"password" in errors} >
				<FormControl.Label>Password</FormControl.Label>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
              
							InputRightElement={<IconButton onPress={() => navigation.navigate({ name: screens.PASSWORD_UPDATE  })} variant="outlined" _icon={{
								as: MaterialIcons,
								name: "edit",
								color: "black",
								size: 4
							}} />}
							type="password"
							variant="outline"
							onBlur={onBlur}
							onChangeText={(text) => onChange(text)}
							value={value}
							isDisabled={true}
						/>
					)}
					name="password"
					rules={{ required: "Field is required", minLength: 3 }}
					defaultValue=""
				/>
				<FormControl.ErrorMessage>
					{errors?.password?.message}
				</FormControl.ErrorMessage>
			</FormControl>
		</VStack>
	);
};

export default Form;