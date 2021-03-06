import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  deleteDoc
} from "firebase/firestore";
import { uploadBytes, getDownloadURL } from "firebase/storage";

import { db, gravestoneStorageRef, cardStorageRef } from "~/firebase";
import { generateOrderId, initialResponse, errorMessage } from "../utils/utils";


const getOrder = async (orderId) => {
  const orderRef = doc(db, "orders", orderId);
  const docSnap = await getDoc(orderRef);
  if (docSnap.exists()) {
    return {...initialResponse, success: true, message: docSnap.data() }
  } else return {...initialResponse, error: true, message: "Document doesn't exist"}
};

const getOrdersAssigned = async (ordersIds = []) => {
  let assigned = [];
  let   all = await getAllOrders();
  all.forEach((order) => {
    const { orderId } = order;
    if (ordersIds.includes(orderId)) {
      assigned.push(order);
    }
  });
  assigned =  assigned.sort(function(a,b) {
    return new Date(b.createdAt.seconds) - new Date(a.createdAt.seconds);
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


const removeOrderFromUsers = async (orderId) => {
  const usersRef = collection(db, "users");
  const querySnapshot = await getDocs(usersRef);
  querySnapshot.forEach(async (document) => {
    const docId = document.id;
    const data = document.data();
    const { orders } = data;
    const isIncluded = orders.find((id) => id === orderId);
    let newOrders = orders;
    const docRef = doc(db, "users", docId);
    if (isIncluded) {
      newOrders = newOrders.filter((order) => order !== orderId);
      await updateDoc(docRef, {
        orders: newOrders,
      })
        .then(() => {
          return { ...initialResponse, success: true, message: "Order removed from Doc"};
        })
        .catch((error) => {
          return { ...initialResponse, success: false, message: errorMessage(error.code) };
        });
    }
  });
}

const deleteOrder = async (orderId) => {
  // remove order from users doc
  await removeOrderFromUsers(orderId)

  return await deleteDoc(doc(db, "orders", orderId)).then(() => { return {...initialResponse, success: true} }).catch((error) => { return {...initialResponse, error: true, message: errorMessage(error.code)}})
}

const ordersService = {
  getOrder,
  getOrdersAssigned,
  getAllOrders,
  createOrder,
  deleteOrder
};

export default ordersService;
