import {FAKE_USER_DETAILS} from "~/utils";
import {doc, setDoc, getDoc} from "firebase/firestore";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "~/firebase";


const createUser = ({address, city, email, firstName, lastName, password, phoneNumber, photoURL = "", zipCode}) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const data = {
                address,
                city,
                email,
                firstName,
                lastName,
                phoneNumber,
                photoURL,
                role: 1,
                zipCode
            }
            const docRef = doc(db, "users", userCredential.user.uid)
            const newDocumentStatus = await setDoc(docRef, data).then(() => {
                return {
                    success: true
                }
            }).catch(error => new Error(error))
            return newDocumentStatus
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return {errorCode, errorMessage}
        })
}

const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return {errorCode, errorMessage}
        })
}

const getUser = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else return new Error({errorMessage: "Document doesn't exist"})
}

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

const userService = {getUserDetails, loginUser, createUser, getUser};

export default userService;