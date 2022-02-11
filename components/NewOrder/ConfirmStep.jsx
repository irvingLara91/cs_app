import React from "react";
import { TouchableHighlight } from "react-native";
import { Text, Box, Center, Button, Flex, VStack, Image } from "native-base";
import Steps from "./Steps";

import DemoImage from "~/assets/image.png"; 
import screens from "~/constants/screens";

const ConfirmStep = ({ navigation, route }) => {
	const { navigate } = navigation;

	const onConfirm = () => {
		console.log("confirm order");
		navigate(screens.NEW_ORDER_PLACED);
	};

	return (
		<Center>
			<VStack space={5} maxW="85%">
				<Steps />
				<Box>
					<Flex p="3" borderWidth={1} borderColor="#E8E8E8" direction="row" alignItems="center" justify="space-between">
						<Text fontSize={12}>
							1. Gravestone picture
						</Text>
						<TouchableHighlight onPress={() => navigate({ name: screens.NEW_ORDER_STEP_1, params: { referer:  route} })}>
							<Text fontSize="11" underline>Take another photo</Text>
						</TouchableHighlight>
					</Flex>
					<Center mt="5">
						<Image source={DemoImage} width={62} height={50} alt="gravestone photo" />
					</Center>
				</Box>
				<Box>
					<Flex p="3" borderWidth={1} borderColor="#E8E8E8" direction="row" alignItems="center" justify="space-between">
						<Text fontSize={12}>
							2. Gravestone details
						</Text>
						<TouchableHighlight onPress={() => navigate({ name: screens.NEW_ORDER_STEP_1, params: { referer:  route} })}>
							<Text fontSize="11" underline>Edit</Text>
						</TouchableHighlight>
					</Flex>
					<VStack space={3} mt="3">
						<Text fontSize="10" fontWeight="bold">Text</Text>
						<Text fontSize="10">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
						</Text>
					</VStack>
					<VStack space={3} mt="3">
						<Text fontSize="10" fontWeight="bold">Additional information</Text>
						<Text fontSize="10">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
						</Text>
					</VStack>
					<VStack space={3} mt="3">
						<Text fontSize="10" fontWeight="bold">Address</Text>
						<Text fontSize="10">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
						</Text>
					</VStack>
				</Box>
				<Button mt="5" borderRadius="none" bgColor="dark.50" onPress={onConfirm} >Confirm order</Button>
			</VStack>
		</Center>
	);
};

export default ConfirmStep;