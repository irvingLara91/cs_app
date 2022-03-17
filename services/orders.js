import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { uploadBytes, getDownloadURL } from "firebase/storage";

import { db, gravestoneStorageRef, cardStorageRef } from "~/firebase";
import { generateOrderId, initialResponse, ORDERS_FAKE_DATA} from "../utils/utils";


const getOrder = async (orderId) => {
  const orderRef = doc(db, "orders", orderId);
  const docSnap = await getDoc(orderRef);
  if (docSnap.exists()) {
    return {...initialResponse, success: true, message: docSnap.data() }
  } else return {...initialResponse, error: true, message: "Document doesn't exist"}
};

const getOrdersAssigned = async (ordersIds = []) => {
  const assigned = [];
  const all = await getAllOrders();
  all.forEach((order) => {
    const { orderId } = order;
    if (ordersIds.includes(orderId)) {
      assigned.push(order);
    }
  });
  return assigned;
};

const getAllOrders = async () => {
  const orders = [];
  const ordersRef = collection(db, "orders");
  const querySnapshot = await getDocs(ordersRef);
  querySnapshot.forEach((document) => {
    orders.push(document.data());
  });
  return orders;
};

const assignCreatedOrder = async ({ userId, orderId, orders }) => {
  const docRef = doc(db, "users", userId);
  const newOrders = [...orders, orderId];
  const updateOrders = await updateDoc(docRef, {
    orders: newOrders,
  })
    .then(() => {
      return { success: true, message: "Order assigned correctly."};
    })
    .catch(() => {
      return { success: false, message: "Error assigning order" };
    });
  return updateOrders;
};



const uploadCardPicture = async ({userId, orderId}, photo) => {
	const metadata = {
			contentType: 'image/jpeg',
	};
	const img  = await fetch(photo);
	const bytes= await img.blob();
	return await uploadBytes(cardStorageRef(userId, orderId), bytes, metadata).then(() => getDownloadURL(cardStorageRef(userId, orderId))).catch(() => "")
}

const uploadGravestonePicture = async ({userId, orderId}, photo) => {
	const metadata = {
			contentType: 'image/jpeg',
	};
	const img  = await fetch(photo);
	const bytes= await img.blob();
	return await uploadBytes(gravestoneStorageRef(userId, orderId), bytes, metadata).then(() => getDownloadURL(gravestoneStorageRef(userId, orderId))).catch(() => "")
};


const createOrder = async (userId, data, orders) => {
  const orderId = generateOrderId();
  const docRef = doc(db, "orders", orderId);
  const orderDocData = { ...data, orderId };
	const gravestoneURL = await uploadGravestonePicture({userId, orderId}, orderDocData.gravestone.image.uri);
	const cardURL = await uploadCardPicture({userId, orderId}, orderDocData.card.uri);

	orderDocData.card = cardURL;
	orderDocData.gravestone.image = gravestoneURL;
  return setDoc(docRef, orderDocData)
    .then(async () => {
			let response;
      const assignOrderResult = await assignCreatedOrder({
        userId,
        orderId,
        orders,
      });
      if (assignOrderResult.success) {
        response = {
          success: true,
					order: orderDocData,
          message: "Order created successfully.",
        };
      } else {
				// pending delete of order doc in case of error

        response = {
          success: false,
          message: "Error updating user's orders",
        };
      }
			return response;
    })
    .catch(() => {
      return {
        success: false,
        message: "There was an error creating the order.",
      };
    });
};

const ordersService = {
  getOrder,
  getOrdersAssigned,
  getAllOrders,
  createOrder,
};

export default ordersService;
