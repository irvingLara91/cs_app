import React, { useRef, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";

import { Box, Text, View } from "native-base";
import RNCarousel, { Pagination } from "react-native-snap-carousel";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH  / 1.3);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH /1.2);

const styles = StyleSheet.create({
	dots: {
		marginHorizontal: 8,
		backgroundColor: "red",
	},
	itemContainer: {  
		width: ITEM_WIDTH,
		height: ITEM_HEIGHT,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#C4C4C4",
		padding: 10,
	},
});


const Carousel = ({data, containerStyle = {}, }) => {
	const carouselRef = useRef();
	const SLIDER_WIDTH = Dimensions.get("window").width;
	const ITEM_WIDTH = SLIDER_WIDTH;
	const length = data.length;

	const [slide, setSlide] = useState(0);


	const renderItem = ({ item }) => {
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
		<View mt="10">
			<RNCarousel
				layout={"stack"}
				layoutCardOffset={3}
				ref={carouselRef}
				data={data}
				renderItem={renderItem}
				sliderWidth={SLIDER_WIDTH}
				itemWidth={ITEM_WIDTH}
				onSnapToItem={(i) => setSlide(i)}
			/>
			<Pagination
				containerStyle={containerStyle}
				dotStyle={styles.dots}
				inactiveDotOpacity={0.4}
				inactiveDotScale={0.6}
				activeDotIndex={slide}
				dotsLength={length}
			/>
		</View>
	);
};

export default Carousel;
