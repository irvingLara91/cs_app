import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Center, Button, Image, Flex  } from "native-base";
import Carousel from "~/components/common/Carousel";
import screens from "~/constants/screens";



const Tutorial = () => {
	const navigation = useNavigation();
	const { navigate } = navigation;

	const data = [
		{
			img: <Image alt="image" source={require("~/assets/image.png")} />,
			title: "How does it work 1",
			msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
		},
		{
			img: <Image alt="image" source={require("~/assets/image.png")} />,
			title: "How does it work 2",
			msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
		},
		{
			img: <Image alt="image" source={require("~/assets/image.png")} />,
			title: "How does it work 3",
			msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
		},
	];


	return (
		<Flex maxW="85%" direction="column" justify="flex-start">
			<Carousel data={data} />
			<Center>
				<Button w="full" bgColor="dark.50" borderRadius="none" onPress={() => navigate({name: screens.NEW_ORDER_STEP_1})}>Continue</Button>
			</Center>
		</Flex>	
	);
};

export default Tutorial;