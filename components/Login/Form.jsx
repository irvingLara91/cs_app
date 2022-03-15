import React from "react";
import {
	VStack,
	Input,
	Button,
	FormControl,
} from "native-base";
import {TextInput} from "react-native"
import { useForm, Controller } from "react-hook-form";
import CustomButton from "~/components/CustomButton/CustomButton";
import styles from "~/components/Register/styles";


const Form = ({ onSubmit }) => {
	const {textInput} = styles;
	const { control, handleSubmit, formState: { errors } } = useForm();


	return (
		<VStack space={2} alignItems="center">
			<FormControl isRequired isInvalid={"email" in errors}>
				<FormControl.Label>Email</FormControl.Label>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
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
						<TextInput
							style={textInput}
							secureTextEntry={true}
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

				<CustomButton onPress={handleSubmit(onSubmit)}
							  title={"Log In"}
							  textColor={"#fff"}
							  gradient={["#555555","#171717"]}
							  borderRadius={10} />
                  
		</VStack>
	);
};

export default Form;