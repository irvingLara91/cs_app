import React, {useState} from "react";
import {
	Center,
	Heading,
	FormControl,
	Input,
	Stack,
	VStack,
	Button,
} from "native-base";
import {TextInput} from "react-native";
import {useForm, Controller} from "react-hook-form";
import screens from "~/constants/screens";
import ContainerBase from "~/components/common/ContainerBase";
import {textSizeRender} from "~/utils/utils";
import styles from "~/components/Register/styles";
import CustomButton from "~/components/CustomButton/CustomButton";
import {useNavigation} from "@react-navigation/native";
import authService from "~/services/auth";
import CustomModal from "~/components/Modals/CustomModal";
import ApiApp from "~/api/ApiApp";

const PasswordRecovery = () => {

	return (
		<ContainerBase backgroundColor={"white"} screenName={screens.LOGIN_ADMIN} >
			<Center>
				<Stack mt={20} mb={40} space={4} w="75%" maxW="300px">
					<Heading
						style={{
							fontFamily: "Roboto_700Bold",
							fontSize: textSizeRender(7),
						}}
					>Help with password</Heading>
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
		ApiApp.passwordReset({"email":values.email}).then(response=>{
			//console.log(response.data)
			if (response.data.success){
				setMessage(response.data.message)
				setModalVisible(true)
				setIsError(false)
			}else {
				setMessage(response.data.message)
				setModalVisible(true)
				setIsError(true)
			}
		}).catch(e=>{
			console.log(JSON.stringify(e))
			setMessage("There was an error try again")
			setModalVisible(true)
			setIsError(true)
		});
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
							autoCapitalize='none'
							keyboardType={"email-address"}
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
