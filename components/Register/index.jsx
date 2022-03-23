import React, {useState} from "react";
import { Center, Stack, Heading } from "native-base";
import Form from "./Form";
import ContainerBase from "../common/ContainerBase";
import authService from "~/services/auth";
import { useAuthUserContext } from "~/context/authUser";
import { setData } from "~/utils/utils";
import Loading from "~/components/Loading/Loading";

const Register = ({ navigation }) => {
	const { setUser } = useAuthUserContext();
	const { createUser } = authService;
	const [loading,setLoading] = useState(false);

	const onRegister = async(data) => {
			setLoading(true)
		const result = await createUser(data);
		if (result.hasOwnProperty("errorMessage")) {
			console.log("trigger error")
			setTimeout(() => {
				setLoading(false)
				}, 500);
		} else {

			setTimeout(() => {
				setLoading(false)
				setUser({...result.message, role: 1,isFirstTime : true});
				setData("user", {...result.message, role: 1,isFirstTime : true})
			}, 500);
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
			{
				loading &&
				<Loading loading={loading} text={"Loading"} color={"white"}/>
			}
		</ContainerBase>
	);
};

export default Register;
