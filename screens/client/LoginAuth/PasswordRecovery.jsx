import React, {useState} from "react";
import {
	Center,
	Heading,
	FormControl,
	Stack,
	VStack,
} from "native-base";
import {TextInput} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {useForm, Controller} from "react-hook-form";
import ContainerBase from "~/components/common/ContainerBase";
import {textSizeRender} from "~/utils/utils";
import CustomButton from "~/components/CustomButton/CustomButton";
import styles from "~/components/Register/styles";
import authService from "~/services/auth";
import CustomModal from "~/components/Modals/CustomModal";

const PasswordRecovery = () => {

	return (
		<ContainerBase backgroundColor={"white"} screenName={"LOGIN"} >
			<Center>
				<Stack mt={20} mb={40} space={4} w="75%" maxW="300px">
					<Heading style={{
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
	const {textInput} = styles;
	const navigation = useNavigation();

	const {
		control,
		handleSubmit,
		formState: {errors},
	} = useForm();

	/***
	 * States de CustomModal
	 * **/
	const [modalVisible, setModalVisible] = useState(false)
	const [message, setMessage] = useState("")
	const [isError, setIsError] = useState(false)

	/***
	 * End States de CustomModal
	 * **/

	const onSubmit = async (values) => {
		const result = await authService.passwordReset(values.email);
		if (result.success) {
			//navigation.goBack();
			setMessage(result.message)
			setModalVisible(true)
			setIsError(false)
		}else {
			setMessage(result.message)
			setModalVisible(true)
			setIsError(true)
		}
	};

	const closeModal=()=>{
		if (isError){
			setMessage("")
			setModalVisible(false)
			setIsError(false)
		}else {
			navigation.goBack();
			setMessage("")
			setModalVisible(false)
			setIsError(false)
		}
	}

	return (
		<VStack space={2} alignItems="center">
			<FormControl isRequired isInvalid={"email" in errors}>
				<FormControl.Label>Email address</FormControl.Label>
				<Controller
					control={control}
					render={({field: {onChange, onBlur, value}}) => (
						<TextInput
							style={textInput}
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
			<CustomButton onPress={handleSubmit(onSubmit)}
						  title={"Recover password"}
						  textColor={"#fff"}
						  gradient={["#555555","#171717"]}
						  borderRadius={10} />

			{
				modalVisible &&
				<CustomModal message={message} visible={modalVisible} setVisible={closeModal} isError={isError}/>
			}
		</VStack>
	);
};

export default PasswordRecovery;
