import React from "react";
import { ScrollView } from "react-native";
import {
	Stack,
	Box,
	Image,
	Center,
	Divider,
	Text,
	VStack,
	Pressable,
	Flex,
	HStack,
	Badge,
	Spacer,
	Icon
} from "native-base";
import Header from "../Header";

const HowCardPhoto = () => {
	return (
		<Stack w="full" h={"full"}  backgroundColor={"#FFFFFF"}>
			<Center>
				<Header screenName={ "Help"} />
			</Center>
		</Stack>
		
	);
};

export default HowCardPhoto;
