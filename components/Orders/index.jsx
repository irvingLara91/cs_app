import React, { useEffect, useState } from "react";
import { Center, Box, ScrollView, Button } from "native-base";
import OrdersCommon from "~/components/common/Orders";
import NoOrders from "~/components/common/NoOrders";

import screens from "~/constants/screens";
import ordersService from "~/services/orders";

const Orders = ({navigation}) => {
	const { navigate } = navigation;
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		// fake api call while firebase gets setup
		const getOrders = async () => {
			const data = await ordersService.getOrders(1);
			setOrders(data);
		};
		
		getOrders();
		
	}, []);

	return (
		<ScrollView>
			<Center>
				{
					(Array.isArray(orders) && orders.length > 0) ? <OrdersCommon orders={orders} /> : <NoOrders />
				}
				<Box w="full" maxW="300" ><Button bgColor="dark.50" borderRadius="none" onPress={() => navigate({name: screens.NEW_ORDER})}>New Order</Button></Box> 
			</Center>
		</ScrollView>
	); 
};

export default Orders;