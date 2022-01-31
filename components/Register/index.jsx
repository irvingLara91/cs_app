import React from "react";
import { Center, Stack, Heading } from "native-base";
import Form from "./Form";

const Register = ({ navigation }) => {
	return (
		<Center>
			<Stack mt={3} space={4} w="75%" maxW="300px">
				<Heading>Complete the following information</Heading>
				<Form navigation={navigation} />
			</Stack>
		</Center>
	);
};

export default Register;