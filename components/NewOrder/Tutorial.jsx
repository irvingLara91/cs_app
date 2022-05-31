import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Center, Box, Stack, Button, Image, View, Flex  } from "native-base";
import Carousel from "~/components/common/Carousel";
import screens from "~/constants/screens";
import CustomButton from "~/components/CustomButton/CustomButton";
import {SCREEN_WIDTH} from "~/utils/utils";



const Tutorial = () => {
	const navigation = useNavigation();
	const { navigate } = navigation;

	const data = [
		{
			img: <Image alt="image"  source={require("~/assets/phone_icon.png")} />,
			title: "How does it work 1",
			msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
		},
		{
			img: <Image alt="image" source={require("~/assets/phone_icon.png")} />,
			title: "How does it work 2",
			msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
		},
		{
			img: <Image alt="image" source={require("~/assets/phone_icon.png")} />,
			title: "How does it work 3",
			msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
		},
	];


	return (
		<Center>
			<Stack mt={0} space={4} w="75%" maxW="300px">
				<Carousel
					data={data}
				/>
			</Stack>
				<Box w="full" maxW="300">
					<CustomButton onPress={() => navigate({name: screens.NEW_ORDER_STEP_1})}
								  title={"Continue"}
								  textColor={"#fff"}
								  gradient={["#838B95", "#4A4E54"]}
								  borderRadius={10}/>
				</Box>
		</Center>
	);
};

export default Tutorial;
