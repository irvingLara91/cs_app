import React from "react";
import { Center, Box, Stack } from "native-base";
import Order from "./Order";

const Orders = ({orders}) => {

	return (
				<Stack space={2}  maxW="320px">
					{
						orders.map((order) => <Order key={order.orderId} {...order} />)
					}
				</Stack>
	);
};

export default Orders;