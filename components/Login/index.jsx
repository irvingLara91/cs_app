import React from "react";
import { TouchableOpacity } from "react-native";
import { Link } from "@react-navigation/native";
import { Stack, Box, Center, Image, Flex, Divider } from "native-base";
import Form from "./Form";
import ReferenceImage from "~/assets/image.png";
import screens from "~/constants/screens";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

export default function Login(props) {
	const { passwordRecoveryLink } = styles;
	return (
		<Center>
			<Stack mt={5}>
				<Flex direction="row" mb="2.5" mt="1.5">
					<Center w={"10"} h={"16"}>
						<TouchableOpacity onPress={() => props.navigation.navigate(screens.POST_SPLASH)} >
							<MaterialIcons name="arrow-back-ios" size={32} color="black" />
						</TouchableOpacity>
					</Center>
					<Center>
						<Image
							alt="image"
							source={require("~/assets/cornerstone-logo-250px.png")}
						/>
					</Center>
				</Flex>
				
			</Stack>
			<Stack mt={3} space={4} w="75%" maxW="300px">
				<Center mt={20} mb={20}>
					<Image source={ReferenceImage} alt="reference login image" />
				</Center>
				<Form />
				<Box>
					<Link
						to={{ screen: screens.PASSWORD_RECOVERY }}
						style={passwordRecoveryLink}
					>
            Did you forget your password?
					</Link>
				</Box>
			</Stack>
		</Center>
	);
}
