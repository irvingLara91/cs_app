import { updatePassword, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "~/firebase";
import userService from "./user";
import { errorMessage, generateRandomPassword, initialResponse } from "~/utils/utils";

const createUser = ({
  isRegister=true,
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
      const uploadResult = await userService.uploadUserPhoto(userId, photo);
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
        userId
      };
      return await userService.createUserDoc(userId, data,isRegister);
    })
    .catch((error) => {
      return { ...initialResponse, error: true, message: errorMessage(error.code) };
    });
};

const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const userDoc = await userService.getUser(userCredential.user.uid);
      const user = userCredential.user;
      return { ...user, userDoc };
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // return { ...initialResponse, error: true, message: errorMessage(error.code) };
      return { errorCode, errorMessage };
    });
};

const updateUserPassword = async(newPassword) => {
  const { currentUser } = auth;
  
  return await updatePassword(currentUser, newPassword).then(() => {
    return {
      success: true
    }
  }).catch((error) => {
    return { ...initialResponse, error: true, message: errorMessage(error.code) };
  });
}

const passwordReset = async(email) => {
  return await sendPasswordResetEmail(auth, email).then(() => {
    return {
      success: true,
      message: "An email with a link for recovery has been sent."
    }
  }).catch((error) => {
    return { ...initialResponse, error: true, message: errorMessage(error.code) }
  })

}

const logout = async () => {
  return await signOut(auth)
}

const authService = { createUser, login, updateUserPassword, logout, passwordReset };

export default authService;
