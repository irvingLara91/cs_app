import React from "react";
import {
	VStack,
	Input,
	Button,
	FormControl,
	View
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";


const Form = ({ onSubmit }) => {
	const navigation = useNavigation();
	const { flexSpaceBetween } = styles;
	const { control, handleSubmit, formState: { errors } } = useForm();

	return (
		<VStack space={2} alignItems="center">
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
							keyboardType="email-address"
							autoCapitalize="none"
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
			<FormControl isRequired isInvalid={"password" in errors}>
				<FormControl.Label>Password</FormControl.Label>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							type="password"
							variant="outline"
							onBlur={onBlur}
							onChangeText={(text) => onChange(text)}
							value={value}
							autoCapitalize="none"
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
			<FormControl isRequired isInvalid={"firstName" in errors}>
				<FormControl.Label>First name</FormControl.Label>
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
							variant="outline"
							onBlur={onBlur}
							onChangeText={(text) => onChange(text)}
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
				<FormControl isRequired isInvalid={"address" in errors} style={{width: "48%"}}>
					<FormControl.Label>City</FormControl.Label>
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
						name="city"
						rules={{ required: "Field is required", minLength: 3 }}
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
			<Button bgColor="primary_black.900" borderRadius={0} size="lg" onPress={handleSubmit(onSubmit)}  style={{width: "100%",marginTop:30}}>
          Register
			</Button>
			<Button bgColor="primary_black.400" borderRadius={0} size="lg" onPress={() => navigation.goBack()}  style={{width: "100%"}}>
          Back
			</Button>
		</VStack>
	);
};

export default Form;