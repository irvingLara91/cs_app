import React from "react";
import { Center, Stack, Heading, KeyboardAvoidingView } from "native-base";
import { Platform } from "react-native";
import Header from "../Header";
import Form from "./Form";

const Register = ({ navigation }) => {
	return (
		<KeyboardAvoidingView h={{
			base: "700px",
			lg: "auto"
		  }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<Center>
				<Header screenName={ "POST_SPLASH"} />
				<Stack mt={3} space={4} w="75%" maxW="300px">
					<Heading>Complete the following information</Heading>
					<Form navigation={navigation} />
				</Stack>
			</Center>
		</KeyboardAvoidingView>		
	);
};

export default Register;
