import { FAKE_ORDER_DETAIL, ORDERS_FAKE_DATA } from "~/utils";
import {collection, getDocs} from "firebase/firestore";
import {db} from "~/firebase";

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


const getOrdersAssigned = async (ordersIds = []) => {
	const orders = [];
	const ordersRef = collection(db, "orders");
	const querySnapshot = await getDocs(ordersRef);
	querySnapshot.forEach((document) => {
		const { orderId } = document.data();
		if (ordersIds.includes(orderId)) {
			orders.push(document.data())
		}
	})
	return orders
}

const ordersService = { getOrders, getOrderDetails, getOrdersAssigned };

export default ordersService;