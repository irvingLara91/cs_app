import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAehmLg_tdZFvLBkOqgWN62IxGa9xv7c-I",
  authDomain: "cornerstone-338522.firebaseapp.com",
  databaseURL: "https://cornerstone-338522-default-rtdb.firebaseio.com",
  projectId: "cornerstone-338522",
  storageBucket: "cornerstone-338522.appspot.com",
  messagingSenderId: "942793777563",
  appId: "1:942793777563:web:1e05a437f4eeceff7ec13e",
  measurementId: "G-9KRNNHHEJQ"
};

const app = initializeApp(firebaseConfig);



export const db = getFirestore(app);

export const auth = getAuth(app);

const storage = getStorage(app);

export const avatarStorageRef = (userId) =>  ref(storage, `avatar-bucket/${userId}.jpg`);
export const cardStorageRef = (userId, orderId) =>  ref(storage, `card-bucket/${userId}-${orderId}.jpg`);
export const gravestoneStorageRef = (userId, orderId) =>  ref(storage, `gravestone-bucket/${userId}-${orderId}.jpg`);
