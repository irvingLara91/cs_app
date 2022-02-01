import { FAKE_ORDER_DETAIL, ORDERS_FAKE_DATA } from "~/utils";

const getOrders = (userId) => {
	// FAKE API CALL
	return new Promise((resolve, reject) => {
		const orders = ORDERS_FAKE_DATA.map((o) => o);
		try {
			resolve(orders);
		} catch(error) {
			reject(error);
		}
	});
};

const getOrderDetails = (orderId) => {
	return new Promise((resolve, reject) => {
		const details = FAKE_ORDER_DETAIL;
		try {
			resolve(details);
		} catch(error) {
			reject(error);
		}
	});
};

const ordersService = { getOrders, getOrderDetails };

export default ordersService;