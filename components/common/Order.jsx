import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Image, View, Box, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";

import screens from "~/constants/screens";
import orderThumbnail from "~/assets/order_thumbnail.png";


const styles = StyleSheet.create({
	orderContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		alignItems: "center"
	},
});

const Order = ({status, date, orderId}) => {
	const navigation = useNavigation();
	const { navigate } = navigation;
	return (
		<TouchableOpacity onPress={() => navigate({name: screens.ORDER_DETAILS, params: { orderId }})}>
			<View style={styles.orderContainer} p="2"  borderRadius="md" borderWidth="1" borderColor="dark.50">
				<Image source={orderThumbnail} alt="order thumbnail" />
				<View w="1/3">
					<Text fontSize="13" fontWeight="bold" >Order: {orderId}</Text>
					<Text fontSize="12">{date}</Text>
				</View>
				<Box bgColor="dark.50" p={1.5} w="1/3" borderRadius="full">
					<Text fontSize={12} color="white" textAlign="center">{status}</Text>
				</Box>
			</View>
		</TouchableOpacity>
	);
};

export default Order;