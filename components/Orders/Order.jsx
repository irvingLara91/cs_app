import React from "react";
import { Image, View, Box, Text } from "native-base";
import orderThumbnail from "~/assets/order_thumbnail.png";
import styles from "./styles";

const Order = ({status, date, orderID}) => {
	console.log({styles});
	return (
		<View style={styles.orderContainer} p="2"  borderRadius="md" borderWidth="1" borderColor="dark.50">
			<Image source={orderThumbnail} alt="order thumbnail" />
			<View w="1/3">
				<Text fontSize="13" fontWeight="bold" >Order: {orderID}</Text>
				<Text fontSize="12">{date}</Text>
			</View>
			<Box bgColor="dark.50" p={1.5} w="1/3" borderRadius="full">
				<Text fontSize={12} color="white" textAlign="center">{status}</Text>
			</Box>
		</View>
	);
};

export default Order;