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
	const assigned = [];
	const all = await getAllOrders();
	all.forEach((order) => {
		const { orderId } = order;
		if (ordersIds.includes(orderId)) {
			assigned.push(order);
		}
	})
	return assigned;
}

const getAllOrders = async () => {
	const orders = [];
	const ordersRef = collection(db, "orders");
	const querySnapshot = await getDocs(ordersRef);
	querySnapshot.forEach((document) => {
		orders.push(document.data())
	})
	return orders;
}

const ordersService = { getOrders, getOrderDetails, getOrdersAssigned, getAllOrders };

export default ordersService;