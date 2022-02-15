import React from "react";
import {Dimensions, Platform} from "react-native";
import {Link} from "@react-navigation/native";
import {Stack, Box, Center, Image, KeyboardAvoidingView} from "native-base";
import Form from "./Form";
import Header from "../Header";
import ReferenceImage from "~/assets/image.png";
import screens from "~/constants/screens";
import styles from "./styles";
import ContainerBase from "~/components/common/ContainerBase";

export default function Login() {
	const {passwordRecoveryLink} = styles;
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
		</ContainerBase>
	);
}
