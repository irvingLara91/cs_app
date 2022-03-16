import React from "react";
import { Center, Stack, Heading } from "native-base";
import Form from "./Form";
import ContainerBase from "../common/ContainerBase";
import authService from "~/services/auth";
import { useAuthUserContext } from "~/context/authUser";
import { setData } from "~/utils/utils";

const Register = ({ navigation }) => {
	const { setUser } = useAuthUserContext();
	const { createUser } = authService;
	
	const onRegister = async(data) => {
		const result = await createUser(data);
		if (result.hasOwnProperty("errorMessage")) {
			console.log("trigger error")
		} else {
			setUser({...result, role: 1,isFirstTime : true});
			setData("user", {...result, role: 1,isFirstTime : true})
			// navigate(screens.PENDING_REGISTER_VALIDATION,{register:data});
		}
	}

	return (
		<ContainerBase backgroundColor={"white"}>
			<Center>
				<Stack mt={3} mb={10} space={4} w="75%" maxW="300px">
					<Heading>Complete the following information</Heading>
					<Form onSubmit={onRegister} />
				</Stack>
			</Center>
		</ContainerBase>
	);
};

export default Register;
