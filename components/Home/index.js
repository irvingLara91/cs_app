import React, { useEffect, useState } from "react";
import { Box, Button, Center, Divider, Image, Heading } from "native-base";

import Welcome from "./Welcome";
import Banners from "./Banners";
import Orders from "~/components/Orders";

import disabledImage from "~/assets/disabled-image.png";

import ordersService from "~/services/orders";
import screens from "~/constants/screens";

export default function Home({navigation, route}) {
	const { params } = route;
	const { isFirstTime } = params;
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		// fake api call while firebase gets setup
		const getOrders = async () => {
			const data = await ordersService.getOrders(1);
			setOrders(data);
		};
		
		getOrders();
		
	}, []);

	if (isFirstTime) return <Welcome />;
	
	return (
		<Center>
			<Banners />
			<Divider my={2} />
			<Heading>Your orders</Heading>
			{
				(Array.isArray(orders) && orders.length > 0) ? <Orders orders={orders} /> : <NoOrders />
			} 
			<Box w="full" maxW="300" ><Button bgColor="dark.50" borderRadius="none" onPress={() => navigation.navigate({name: screens.NEW_ORDER})}>New Order</Button></Box>
		</Center>
	);
}


const NoOrders = () => {
	return (
		<Center mb="4">
			<Image source={disabledImage} alt="no orders" />
			<Heading w="200" textAlign="center" fontSize="28">You currently have no orders</Heading>
		</Center>
	);
};