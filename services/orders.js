import {FAKE_ORDER_DETAIL, ORDERS_FAKE_DATA} from "~/utils";
import {auth, db, avatarStorageRef} from "~/firebase";
import {collection, doc, getDoc, query, where, getDocs} from "firebase/firestore";

const getOrdersAll = async (userId) => {
    const orders = [];
    const query_ = query(collection(db, "orders"));
    const querySnapshot = await getDocs(query_);
    querySnapshot.forEach((doc) => {
        orders.push(doc.data())
    });
    return orders
}

const getOrders = (userId) => {
    // FAKE API CALL
    return new Promise((resolve, reject) => {
        const orders = ORDERS_FAKE_DATA.map((o) => o);
        try {
            resolve(orders);
        } catch (error) {
            reject(error);
        }
    });
};

const getOrderDetails = (orderId) => {
    return new Promise((resolve, reject) => {
        const details = FAKE_ORDER_DETAIL;
        try {
            resolve(details);
        } catch (error) {
            reject(error);
        }
    });
};

const ordersService = {getOrders, getOrderDetails, getOrdersAll};

export default ordersService;