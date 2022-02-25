import React from "react";
import {
	VStack,
	Input,
	Button,
	FormControl,
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import screens from "~/constants/screens";


const Form = (props) => {
	const { control, handleSubmit, formState: { errors } } = useForm();
	const onSubmit = async (response) => {
		await props.LoginParams(response)
	};

	return (
		<VStack space={2} alignItems="center">
			<FormControl isRequired isInvalid={"username" in errors}>
				<FormControl.Label>Username</FormControl.Label>
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
					name="username"
					rules={{ required: "Field is required", minLength: 3 }}
					defaultValue=""
				/>
				<FormControl.ErrorMessage>
					{errors?.username?.message}
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
			<Button bgColor="primary_black.900" borderRadius={0} size="lg" onPress={handleSubmit(onSubmit)} size="lg" style={{width: "100%",marginTop:30}}>
          Log in
			</Button>
		</VStack>
	);
};

export default Form;