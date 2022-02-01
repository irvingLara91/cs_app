import React from "react";
import { Center, Box, Stack } from "native-base";
import Order from "./Order";

const Orders = ({orders}) => {

	return (
		<Center>
			<Box rounded="xl" p="10">
				<Stack space={2} maxW="300px">
					{
						orders.map((order) => <Order key={order.orderID} {...order} />)
					}
				</Stack>
			</Box>
		</Center>
	); 
};

export default Orders;