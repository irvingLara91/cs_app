import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Center, Stack, IconButton, FormControl, Input, Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import screens from "~/constants/screens";

const PasswordUpdate = ({ navigation }) => { 
	const { control, handleSubmit, formState: { errors } } = useForm();
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] = useState(false);
  
	const onSubmit = (data) => {
		console.log("submiting with ", data);
		navigation.navigate(screens.PENDING_REGISTER_VALIDATION);
	};

	return (
		<Center pt="5" pb="5">
			<Stack w="full" maxWidth="300">
				<FormControl isRequired isInvalid={"currentPassword" in errors} >
					<FormControl.Label>Current password</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								InputRightElement={<IconButton onPress={() => setShowCurrentPassword((prevState) => !prevState)}variant="outlined" _icon={{
									as: MaterialIcons,
									name: `${!showCurrentPassword? "visibility" : "visibility-off"}`,
									color: "black",
									size: 4
								}} />}
								type={`${showCurrentPassword ? "text" : "password"}`}
								variant="outline"
								onBlur={onBlur}
								onChangeText={(text) => onChange(text)}
								value={value}
							/>
						)}
						name="currentPassword"
						rules={{ required: "Field is required", minLength: 3 }}
						defaultValue=""
					/>
					<FormControl.ErrorMessage>
						{errors?.currentPassword?.message}
					</FormControl.ErrorMessage>
				</FormControl>
				<FormControl isRequired isInvalid={"newPassword" in errors} >
					<FormControl.Label>New password</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
                
								InputRightElement={<IconButton onPress={() => setShowNewPassword((prevState) => !prevState)} variant="outlined" _icon={{
									as: MaterialIcons,
									name: `${!showNewPassword ? "visibility" : "visibility-off"}`,
									color: "black",
									size: 4
								}} />}
								type={`${showNewPassword ? "text" : "password"}`}
								variant="outline"
								onBlur={onBlur}
								onChangeText={(text) => onChange(text)}
								value={value}
							/>
						)}
						name="newPassword"
						rules={{ required: "Field is required", minLength: 3 }}
						defaultValue=""
					/>
					<FormControl.ErrorMessage>
						{errors?.newPassword?.message}
					</FormControl.ErrorMessage>
				</FormControl>
				<FormControl isRequired isInvalid={"newPasswordConfirm" in errors} >
					<FormControl.Label>Confirm new password</FormControl.Label>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
                
								InputRightElement={<IconButton onPress={() => setShowNewPasswordConfirmation((prevState) => !prevState)} variant="outlined" _icon={{
									as: MaterialIcons,
									name: `${!showNewPasswordConfirmation ? "visibility" : "visibility-off"}`,
									color: "black",
									size: 4
								}} />}
								type={`${showNewPasswordConfirmation  ? "text" : "password"}`}
								variant="outline"
								onBlur={onBlur}
								onChangeText={(text) => onChange(text)}
								value={value}
							/>
						)}
						name="newPasswordConfirm"
						rules={{ required: "Field is required", minLength: 3 }}
						defaultValue=""
					/>
					<FormControl.ErrorMessage>
						{errors?.newPasswordConfirm?.message}
					</FormControl.ErrorMessage>
				</FormControl>
				<Button mt="3" onPress={handleSubmit(onSubmit)} size="lg" style={{width: "100%"}}>
          Change password
				</Button>
			</Stack>
		</Center>
	);
};

export default PasswordUpdate;