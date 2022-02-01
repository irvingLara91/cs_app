import React from "react";
import { Image, View, Box, Text } from "native-base";
import orderThumbnail from "~/assets/order_thumbnail.png";

const Order = ({status, date, orderID}) => {
	return (
		<View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center"}} p="2"  borderRadius="md" borderWidth="1" borderColor="dark.50">
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