import React from "react";
import {Link} from "@react-navigation/native";
import {Stack, Box, Center, Image} from "native-base";
import Form from "./Form";
import ReferenceImage from "~/assets/image.png";
import screens from "~/constants/screens";
import styles from "./styles";
import ContainerBase from "~/components/common/ContainerBase";
import Loading from "~/components/Loading/Loading";
import {useAuthUserContext} from "~/context/authUser";

export default function Login() {
	const {passwordRecoveryLink} = styles;
	const {fetching} = useAuthUserContext()
	return (
		<ContainerBase>
			<Center>
				<Stack mt={3} space={4} w="75%" maxW="300px">
					<Center mt={20} mb={20}>
						<Image source={ReferenceImage} alt="reference login image"/>
					</Center>
					<Form/>
					<Box>
						<Link
							to={{screen: screens.PASSWORD_RECOVERY}}
							style={passwordRecoveryLink}
						>
							Did you forget your password?
						</Link>
					</Box>
				</Stack>
			</Center>
			{
				fetching &&
				<Loading loading={fetching} color={"black"} text={"loading..."}/>
			}
		</ContainerBase>
	);
}
