import { updatePassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "~/firebase";
import userService from "./user";

const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const userDoc = await userService.getUser(userCredential.user.uid);
      const user = userCredential.user;
      return { ...user, userDoc };
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { errorCode, errorMessage };
    });
};

const updateUserPassword = async(newPassword) => {
  const user = auth.currentUser;
  
  return await updatePassword(user, newPassword).then(() => {
    return {
      success: true
    }
  }).catch((error) => {
    return {
      success: false,
      msg: error
    }
  });
}

const authService = { updateUserPassword, loginUser };

export default authService;
