import React from "react";
import {
	VStack,
	Input,
	Button,
	FormControl,
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import screens from "~/constants/screens";

import {useAuthUserContext} from "~/context/authUser";


const Form = () => {
	const {LoginUser} = useAuthUserContext()
	const { control, handleSubmit, formState: { errors } } = useForm();
	const navigation = useNavigation();
	const onSubmit = async (response) => {
		let data ={}
		data.email= response.email;
		data.password= response.password;
		data.LoggedIn = true;
		data.isFirstTime = false;
		await saveUser(data)
		///navigation.navigate({ name: screens.HOME, params: { isFirsTime: false } });
	};

	const saveUser=async (data)=>{
			await LoginUser(data)
	}


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
			<Button onPress={handleSubmit(onSubmit)} size="lg" style={{width: "100%"}}>
          Log in
			</Button>
		</VStack>
	);
};

export default Form;