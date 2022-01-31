import React from "react";
import { Link } from "@react-navigation/native";
import { Stack, Box, Center, Image } from "native-base";
import Form from "./Form";
import ReferenceImage from "~/assets/image.png";
import screens from "~/constants/screens";
import styles from "./styles";

export default function Login() {
	const { passwordRecoveryLink } = styles;
	return (
		<Center>
			<Stack mt={3} space={4} w="75%" maxW="300px">
				<Center mt={20} mb={20}>
					<Image source={ReferenceImage} alt="reference login image"/>
				</Center>
				<Form />
				<Box>
					<Link to={{ screen: screens.PASSWORD_RECOVERY }} style={passwordRecoveryLink}>
            Did you forget your password?
					</Link>
				</Box>
			</Stack>
		</Center>
	);
}

  