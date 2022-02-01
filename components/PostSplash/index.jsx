import React, { useRef, useState } from "react";
import { Dimensions } from "react-native";
import { Center, Stack, Text, Box, Button, Image } from "native-base";
import screens from "~/constants/screens";
import Carousel, { Pagination } from "react-native-snap-carousel";
import styles from "./styles";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const PostSplash = ({ navigation }) => {
	const _carousel = useRef(null);
	const [slide, setSlide] = useState(0);

	const carouselItems = [
		{
			img: <Image alt="image" source={require("~/assets/image.png")} />,
			title: "How Does it Work?",
			msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
		},
		{
			img: <Image alt="image" source={require("~/assets/image.png")} />,
			title: "How Does it Work?",
			msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
		},
		{
			img: <Image alt="image" source={require("~/assets/image.png")} />,
			title: "How Does it Work?",
			msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
		},
	];

	const _renderItem = ({ item, index }) => {
		return (
			<Box style={styles.itemContainer}>
				<Text>{item.img}</Text>
				<Text fontSize="2xl" fontWeight="black" textAlign={"center"}>
					{item.title}
				</Text>
				<Text>{item.msg}</Text>
			</Box>
		);
	};


	return (
		<Center>
			<Stack mt={50}>
				<Image alt="image" source={require("~/assets/cornerstone-logo-250px.png")} />
			</Stack>
			<Stack mt={100} space={4} w="75%" maxW="300px">
				<Carousel
					layout={"stack"}
					layoutCardOffset={3}
					ref={_carousel}
					data={carouselItems}
					renderItem={_renderItem}
					sliderWidth={SLIDER_WIDTH}
					itemWidth={ITEM_WIDTH}
					onSnapToItem={(i) => setSlide(i)}
				/>
				<Pagination
					containerStyle={{}}
					dotStyle={styles.do}
					inactiveDotOpacity={0.4}
					inactiveDotScale={0.6}
					activeDotIndex={slide}
					dotsLength={carouselItems.length}
				/>
				<Box>
					<Button onPress={() => navigation.navigate(screens.LOGIN)}>
            Login
					</Button>
				</Box>
				<Box>
					<Button onPress={() => navigation.navigate(screens.REGISTER)}>
            Register
					</Button>
				</Box>
			</Stack>
		</Center>
	);
};

export default PostSplash;

