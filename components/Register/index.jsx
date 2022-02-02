import React from "react";
import { Center, Stack, Heading, Flex, Image, KeyboardAvoidingView } from "native-base";
import { TouchableOpacity, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import screens from "~/constants/screens";
import Form from "./Form";

const Register = ({ navigation }) => {
	return (
		<KeyboardAvoidingView h={{
			base: "700px",
			lg: "auto"
		  }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<Center>
				<Stack mt={8}>
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
		</KeyboardAvoidingView>		
	);
};

export default Register;
