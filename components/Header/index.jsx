import React from "react";
import { TouchableOpacity } from "react-native";
import { Stack, Center, Image, Flex, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = (screen) => {
	const navigation = useNavigation();
	return (
		<Stack mt={5}>
			<Flex direction="row" mb="2.5" mt="1.5">
				<Center w={"10"} h={"16"}>
					<TouchableOpacity
						onPress={() => navigation.navigate({name: screen.screenName})}
					>
						<Icon as={MaterialIcons} name="arrow-back-ios" size={"24px"} />
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
	);
};

export default Header;
