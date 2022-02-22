import React from "react";
import { Center, Stack, Heading, KeyboardAvoidingView } from "native-base";
import Form from "./Form";
import ContainerBase from "../common/ContainerBase";

const Register = ({ navigation }) => {
	return (
		<ContainerBase>
			<Center>
				<Stack mt={3} space={4} w="75%" maxW="300px">
					<Heading>Complete the following information</Heading>
					<Form navigation={navigation} />
				</Stack>
			</Center>
		</ContainerBase>
	);
};

export default Register;
