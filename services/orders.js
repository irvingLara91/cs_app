import { ORDERS_FAKE_DATA } from "~/utils";

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

const ordersService = { getOrders };

export default ordersService;