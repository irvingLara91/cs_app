import { FAKE_USER_DETAILS } from "../utils/utils";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  getDocs,
  updateDoc, deleteDoc
} from "firebase/firestore";
import { uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

import { db, avatarStorageRef } from "~/firebase";
import { errorMessage, initialResponse } from "~/utils/utils";
import _ from "lodash";

const removePreviousUserPhoto = async (userId) => {
  return await deleteObject(avatarStorageRef(userId)).then(() => {
    return {
      success: true,
    }
  }).catch((error) => {
    return {
      success: false,
      msg: error
    }
  })

}

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

const updateUserPhoto = async(userId, photo) => {
  const removeResult = await removePreviousUserPhoto(userId);
  if (!removeResult.success) return new Error(removeResult.msg);
  return await uploadUserPhoto(userId, photo);
}


const createUserDoc = async (userId, data = {},isRegister=true) => {
  if (isRegister){
    const userData = {
      userDoc: {
        ...data
      },
      userId
    }
    const docRef = doc(db, "users", userId);
    return await setDoc(docRef, data)
        .then(() => {
          return { success: true, message: userData };
        })
        .catch(() => {
          return { ...initialResponse, error: true, message: errorMessage(error.code) };
        });
  }else {
    const docRef = doc(db, "users", userId);
    return await setDoc(docRef, data)
        .then(() => {
          return { success: true,   message: "user created successfully." };
        })
        .catch(() => {
          return { ...initialResponse, error: true, message: errorMessage(error.code) };
        });
  }

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
  // return { ...initialResponse, error: true, message: errorMessage(error.code) };
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
    return await updateDoc(userDocRef, data).then(() => { return {success: true} }).catch((error) => {return { ...initialResponse, error: true, message: errorMessage(error.code) }})
};

const deleteUser = async (userId) => {
  return await deleteDoc(doc(db, "users", userId)).then(() => { return {...initialResponse, success: true} }).catch((error) => { return {...initialResponse, error: true, message: errorMessage(error.code)}})
}

const userService = {
  getUserDetails,
  getUser,
  getUsers,
  updateUser,
  uploadUserPhoto,
  updateUserPhoto,
  createUserDoc,
  deleteUser
};

export default userService;
