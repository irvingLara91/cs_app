import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
	Box,
	VStack,
	Input,
	Button,
	FormControl,
	TextArea,
	Text
} from "native-base";
import  Steps from "./Steps";
import screens from "~/constants/screens";
import ContainerBaseV2 from "~/components/common/ContainerBaseV2";


const DetailsStep = () => {
	return (
		<ContainerBaseV2>
		<Box alignItems="center">
			<Steps />
			<Form />
		</Box>
		</ContainerBaseV2>
	);
};


const Location = () => {
	const { navigate } = useNavigation();
	return (
		<TouchableOpacity onPress={() => navigate(screens.NEW_ORDER_STEP_3_MAP)}>
			<Text mr="2" fontSize="11" underline>Locate in the map</Text>
		</TouchableOpacity>
	);
};


const Form = () => {
	const { control, handleSubmit, formState: { errors } } = useForm();
	const { navigate } = useNavigation();
	const onSubmit = (data) => {
		console.log({data});
		navigate(screens.NEW_ORDER_STEP_4);
	};
	return (
		<VStack w="full" maxW={280} mt="30" mb={30} space={3} alignItems="center">
			<FormControl isRequired isInvalid={"gravestoneText" in errors}>
				<FormControl.Label>Gravestone text</FormControl.Label>
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
					name="gravestoneText"
					rules={{ required: "Field is required", minLength: 3 }}
					defaultValue=""
				/>
				<FormControl.ErrorMessage>
					{errors?.gravestoneText?.message}
				</FormControl.ErrorMessage>
			</FormControl>
			<FormControl isRequired isInvalid={"additionalInformation" in errors}>
				<FormControl.Label>Additional information</FormControl.Label>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextArea
							variant="outline"
							onBlur={onBlur}
							onChangeText={(text) => onChange(text)}
							value={value}
						/>
					)}
					name="additionalInformation"
					rules={{ required: "Field is required", minLength: 3 }}
					defaultValue=""
				/>
				<FormControl.ErrorMessage>
					{errors?.additionalInformation?.message}
				</FormControl.ErrorMessage>
			</FormControl>
			<FormControl isRequired isInvalid={"address" in errors}>
				<FormControl.Label>Address</FormControl.Label>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							InputRightElement={<Location />}
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
			<Button borderRadius="none" bgColor="dark.50" onPress={handleSubmit(onSubmit)} size="lg" style={{width: "100%"}}>
          Continue
			</Button>
		</VStack>
	);
};




export default DetailsStep;