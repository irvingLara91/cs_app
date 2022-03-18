import React from "react";
import { Center, Box, Stack } from "native-base";
import Order from "./Order";

const Orders = ({orders}) => {

	return (
		<Center>
			<Box rounded="xl">
				<Stack space={2} maxW="300px">
					{
						orders.map((order) => <Order key={order.orderId} {...order} />)
					}
				</Stack>
			</Box>
		</Center>
	); 
};

export default Orders;