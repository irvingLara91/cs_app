import React, { useEffect, useState } from "react";
import { Box, Button, Center, Image, Heading, Stack } from "native-base";

import Welcome from "./Welcome";
import Carousel from "~/components/common/Carousel";
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
		<Center>
			<Stack mt={0} space={4} w="75%" maxW="300px">
				<Carousel
					data={data}
				/>
			</Stack>
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