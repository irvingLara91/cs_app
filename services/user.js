import { FAKE_USER_DETAILS } from "../utils/utils";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  getDocs,
  updateDoc
} from "firebase/firestore";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db, avatarStorageRef } from "~/firebase";
import { errorMessage, generateRandomPassword } from "~/utils/utils";
import _ from "lodash";

const uploadUserPhoto = async (userId, photo) => {
  if (photo === "") return "";
  const metadata = {
    contentType: "image/jpeg",
  };
  const img = await fetch(photo);
  const bytes = await img.blob();
  return await uploadBytes(avatarStorageRef(userId), bytes, metadata)
    .then(() => getDownloadURL(avatarStorageRef(userId)))
    .catch(() => "");
};

const createUserDoc = async (userId, data) => {
  const docRef = doc(db, "users", userId);
  return await setDoc(docRef, data)
    .then(() => {
      return { success: true, message: "user created successfully." };
    })
    .catch(() => {
      return {
        success: false,
        message: "There was an error creating the user.",
      };
    });
};
const createUser = ({
  address = "",
  city = "",
  email,
  firstName,
  lastName,
  password = generateRandomPassword(),
  phoneNumber,
  photo = "",
  role = 1,
  zipCode = "",
}) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const userId = userCredential.user.uid;
      const uploadResult = await uploadUserPhoto(userId, photo);
      const data = {
        address: {
          address,
          city,
          zipCode,
        },
        email,
        firstName,
        lastName,
        phoneNumber,
        photoURL: uploadResult,
        role,
        createdAt: new Date(),
        orders: [],
      };
      return await createUserDoc(userId, data);
    })
    .catch((error) => {
      return { error: true, message: errorMessage(error.code) };
    });
};

const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const userDoc = await getUser(userCredential.user.uid);
      const user = userCredential.user;
      return { ...user, userDoc };
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { errorCode, errorMessage };
    });
};

const getUsers = async () => {
  const usersRef = query(collection(db, "users"));
  const users = [];
  let user_filter = [];
  const querySnapshot = await getDocs(usersRef);
  querySnapshot.forEach((document) => {
    users.push(document.data());
  });

  /***
   * Function to filter users that are different from role 1
   ***/
  if (users.length > 0) {
    user_filter = _.filter(users, function (user) {
      return user.role !== 1;
    });
  }
  return user_filter;
};

const getUser = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else return new Error({ errorMessage: "Document doesn't exist" });
};

const getUserDetails = (userId) => {
  return new Promise((resolve, reject) => {
    const data = FAKE_USER_DETAILS;
    try {
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

const updateUser = async (userId, data) => {
    const userDocRef = doc(db, "users", userId);
    return await updateDoc(userDocRef, data).then(() => { return {success: true} }).catch((error) => {return {success: false, msg: error}})
};

const userService = {
  getUserDetails,
  loginUser,
  createUser,
  getUser,
  getUsers,
  updateUser,
  uploadUserPhoto
};

export default userService;
