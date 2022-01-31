import React from "react";
import {
	VStack,
	Input,
	Button,
	FormControl,
	View,
	Select,
	CheckIcon
} from "native-base";
import { useForm, Controller } from "react-hook-form";

import screens from "~/constants/screens";
import styles from "./styles";


const Form = ({navigation}) => {
	const { flexSpaceBetween } = styles;
	const { control, handleSubmit, formState: { errors } } = useForm();
	const onSubmit = (data) => {
		console.log("submiting with ", data);
		navigation.navigate(screens.PENDING_REGISTER_VALIDATION);
	};


	return (
		<VStack space={2} alignItems="center">
			<FormControl isRequired isInvalid={"fullName" in errors}>
				<FormControl.Label>Full name</FormControl.Label>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							variant="outline"
							onBlur={onBlur}
							onChangeText={(text) => onChange(text)}
							value={value}
						/>  
					)}
					name="fullName"
					rules={{ required: "Field is required", minLength: 3 }}
					defaultValue=""
				/>
				<FormControl.ErrorMessage>
					{errors?.fullName?.message}
				</FormControl.ErrorMessage>
			</FormControl>
			<FormControl isRequired isInvalid={"email" in errors}>
				<FormControl.Label>Email</FormControl.Label>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							variant="outline"
							onBlur={onBlur}
							onChangeText={(text) => onChange(text)}
							value={value}
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
			<FormControl isRequired isInvalid={"phone" in errors}>
				<FormControl.Label>Phone number</FormControl.Label>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							variant="outline"
							onBlur={onBlur}
							onChangeText={(text) => onChange(text)}
							value={value}
						/>
					)}
					name="phone"
					rules={{ required: "Field is required", minLength: 3 }}
					defaultValue=""
				/>
				<FormControl.ErrorMessage>
					{errors?.phone?.message}
				</FormControl.ErrorMessage>
			</FormControl>
			<FormControl isRequired isInvalid={"address" in errors}>
				<FormControl.Label>Address</FormControl.Label>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
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
			<Button onPress={handleSubmit(onSubmit)} size="lg" style={{width: "100%"}}>
          Register
			</Button>
			<Button onPress={() => navigation.goBack()} size="lg" style={{width: "100%"}}>
          Back
			</Button>
		</VStack>
	);
};

export default Form;