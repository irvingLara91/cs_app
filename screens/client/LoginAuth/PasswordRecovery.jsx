import React from "react";
import {
	Center,
	Heading,
	FormControl,
	Input,
	Stack,
	VStack,
	Button,
} from "native-base";
import {useForm, Controller} from "react-hook-form";
import ContainerBase from "~/components/common/ContainerBase";
import {textSizeRender} from "~/utils/utils";

const PasswordRecovery = () => {
	return (
		<ContainerBase screenName={"LOGIN"} >
			<Center>
				<Stack mt={20} space={4} w="75%" maxW="300px">
					<Heading style={{
						color: "primary_black.900",
						fontFamily: "Roboto_700Bold",
						fontSize: textSizeRender(7),
					}}>Help with password</Heading>
					<PasswordRecoveryForm/>
				</Stack>
			</Center>
		</ContainerBase>
	);
};

const PasswordRecoveryForm = () => {
	const {
		control,
		handleSubmit,
		formState: {errors},
	} = useForm();

	const onSubmit = (values) => {
		console.log({values});
	};

	return (
		<VStack space={2} alignItems="center">
			<FormControl isRequired isInvalid={"email" in errors}>
				<FormControl.Label>Email address</FormControl.Label>
				<Controller
					control={control}
					render={({field: {onChange, onBlur, value}}) => (
						<Input
							variant="outline"
							onBlur={onBlur}
							onChangeText={(text) => onChange(text)}
							value={value}
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
			<Button
				bgColor="primary_black.900" borderRadius={0} size="lg"
				onPress={handleSubmit(onSubmit)}
				style={{width: "100%",marginTop:30}}
			>
				Recover password
			</Button>
		</VStack>
	);
};

export default PasswordRecovery;
