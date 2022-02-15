import React from "react";
import { Center, Image, Heading } from "native-base";
import disabledImage from "~/assets/disabled-image.png";


const NoOrders = () => {
	return (
		<Center mb="4">
			<Image source={disabledImage} alt="no orders" />
			<Heading w="200" textAlign="center" fontSize="28">You currently have no orders</Heading>
		</Center>
	);
};

export default NoOrders;