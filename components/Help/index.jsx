import React from "react";
import {
	Stack,
	Box,
	Text,
	VStack,
	Pressable,
	HStack,
	Spacer,
	Icon,
} from "native-base";
import { Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import screens from "~/constants/screens";

const { width } = Dimensions.get("window");

const Help = () => {
	const navigation = useNavigation();
	return (
		<Stack w="full" h={"full"} backgroundColor={"#FFFFFF"}>
			<VStack space={0} alignItems="center">
				<Pressable
					onPress={() => navigation.navigate({ name: screens.FAQ, params: { question: "HowCardPhoto" }, })}
				>
					{({ isHovered, isPressed }) => {
						return (
							<Box
								width={width}
								borderTopWidth={1}
								borderColor="coolGray.300"
								bg={
									isPressed
										? "coolGray.200"
										: isHovered
											? "coolGray.200"
											: "coolGray.100"
								}
								p="5"
								style={{
									transform: [
										{
											scale: isPressed ? 0.99 : 1,
										},
									],
								}}
							>
								<HStack alignItems="center">
									<Text fontSize={16}>How to take a credit card photo?</Text>
									<Spacer />
									<Text fontSize={14} color="coolGray.800">
										<Icon
											as={MaterialIcons}
											name="arrow-forward-ios"
											size={24}
										/>
									</Text>
								</HStack>
							</Box>
						);
					}}
				</Pressable>
				<Pressable
					onPress={() => navigation.navigate({ name: screens.FAQ, params: { question: "HowGravestonePhoto"}, })}
				>
					{({ isHovered, isPressed }) => {
						return (
							<Box
								width={width}
								borderTopWidth={1}
								borderColor="coolGray.300"
								bg={
									isPressed
										? "coolGray.200"
										: isHovered
											? "coolGray.200"
											: "coolGray.100"
								}
								p="5"
								style={{
									transform: [
										{
											scale: isPressed ? 0.99 : 1,
										},
									],
								}}
							>
								<HStack alignItems="center">
									<Text fontSize={16}>How to take a photo the gravestone</Text>
									<Spacer />
									<Text fontSize={14} color="coolGray.800">
										<Icon
											as={MaterialIcons}
											name="arrow-forward-ios"
											size={24}
										/>
									</Text>
								</HStack>
							</Box>
						);
					}}
				</Pressable>
				<Pressable
					onPress={() => navigation.navigate({ name: screens.FAQ, params: { question: "StatusOrden"}, })}
				>
					{({ isHovered, isPressed }) => {
						return (
							<Box
								width={width}
								borderTopWidth={1}
								borderColor="coolGray.300"
								bg={
									isPressed
										? "coolGray.200"
										: isHovered
											? "coolGray.200"
											: "coolGray.100"
								}
								p="5"
								style={{
									transform: [
										{
											scale: isPressed ? 0.99 : 1,
										},
									],
								}}
							>
								<HStack alignItems="center">
									<Text fontSize={16}>See status of my order ?</Text>
									<Spacer />
									<Text fontSize={14} color="coolGray.800">
										<Icon
											as={MaterialIcons}
											name="arrow-forward-ios"
											size={24}
										/>
									</Text>
								</HStack>
							</Box>
						);
					}}
				</Pressable>				
				<Pressable onPress={() => navigation.navigate({ name: screens.FAQ, params: { question: "PaymentMethods" }, })}>
					{({ isHovered, isPressed }) => {
						return (
							<Box
								width={width}
								borderTopWidth={1}
								borderColor="coolGray.300"
								bg={
									isPressed
										? "coolGray.200"
										: isHovered
											? "coolGray.200"
											: "coolGray.100"
								}
								p="5"
								style={{
									transform: [
										{
											scale: isPressed ? 0.99 : 1,
										},
									],
								}}
							>
								<HStack alignItems="center">
									<Text fontSize={16}>Payment methods</Text>
									<Spacer />
									<Text fontSize={14} color="coolGray.800">
										<Icon
											as={MaterialIcons}
											name="arrow-forward-ios"
											size={24}
										/>
									</Text>
								</HStack>
							</Box>
						);
					}}
				</Pressable>
				<Pressable onPress={() => navigation.navigate({ name: screens.FAQ, params: { question: "ContactMeans" }, })}>
					{({ isHovered, isPressed }) => {
						return (
							<Box
								width={width}
								borderTopWidth={1}
								borderBottomWidth={1}
								borderColor="coolGray.300"
								bg={
									isPressed
										? "coolGray.200"
										: isHovered
											? "coolGray.200"
											: "coolGray.100"
								}
								p="5"
								style={{
									transform: [
										{
											scale: isPressed ? 0.99 : 1,
										},
									],
								}}
							>
								<HStack alignItems="center">
									<Text fontSize={16}>Contact means</Text>
									<Spacer />
									<Text fontSize={14} color="coolGray.800">
										<Icon
											as={MaterialIcons}
											name="arrow-forward-ios"
											size={24}
										/>
									</Text>
								</HStack>
							</Box>
						);
					}}
				</Pressable>
			</VStack>
		</Stack>
	);
};

export default Help;
