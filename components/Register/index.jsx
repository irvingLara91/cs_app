import React from "react";
import { Center, Stack, Heading, Flex, Image } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import screens from "~/constants/screens";
import Form from "./Form";

const Register = ({ navigation }) => {
	return (
		<Center>
			<Stack mt={5}>
				<Flex direction="row" mb="2.5" mt="1.5">
					<Center w={"10"} h={"16"}>
						<TouchableOpacity
							onPress={() => navigation.navigate(screens.POST_SPLASH)}
						>
							<MaterialIcons name="arrow-back-ios" size={24} color="black" />
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
				<Heading>Complete the following information</Heading>
				<Form navigation={navigation} />
			</Stack>
		</Center>
	);
};

export default Register;
