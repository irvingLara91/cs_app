import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARrBFVOAj-lj4V9coZQewxg6F32d3I2j4",
  authDomain: "cornerstone-sandblasting.firebaseapp.com",
  projectId: "cornerstone-sandblasting",
  storageBucket: "cornerstone-sandblasting.appspot.com",
  messagingSenderId: "582395585721",
  appId: "1:582395585721:web:bf1923cf912e3a50d7a768",
  measurementId: "G-JJ5GE6D3J4"
};

const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);

// const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
// const analytics = getAnalytics(app);

export const auth = getAuth(app)