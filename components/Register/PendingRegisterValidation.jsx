import React from "react";
import {
	Image,
	Center,
	Stack,
	Box,
	View,
	Heading,
	Text,
	Button,
	Flex,
} from "native-base";
import screens from "~/constants/screens";
import pendingValidationImage from "~/assets/pending-register.png";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const PendingRegisterValidation = ({ navigation }) => {
	return (
		<Center>
			<Stack mt={9}>
				<Flex direction="row" mb="2.5" mt="1.5">
					<Center w={"10"} h={"16"}>
						<TouchableOpacity onPress={() => navigation.navigate(screens.POST_SPLASH)} >
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
					<Image source={pendingValidationImage} alt="pending validation" />
				</Center>
				<View>
					<Heading>Thanks for signing up</Heading>
					<Text>
            Your account is pending validation, we will contact you soon
					</Text>
				</View>
				<Box mt={3}>
					<Button
						onPress={() =>
							navigation.navigate({
								name: screens.HOME,
								params: { isFirstTime: true },
							})
						}
					>
            Continue
					</Button>
				</Box>
			</Stack>
		</Center>
	);
};

export default PendingRegisterValidation;
