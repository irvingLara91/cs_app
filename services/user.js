import {FAKE_USER_DETAILS} from "~/utils";
import {doc, setDoc, getDoc, collection, query, getDocs} from "firebase/firestore";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth, db, avatarStorageRef} from "~/firebase";
import { generateRandomPassword } from "~/utils/utils";


const uploadUserPhoto = async (userId, photo) => {
    if (photo === "") return ""
    const metadata = {
        contentType: 'image/jpeg',
    };
    const img  = await fetch(photo);
    const bytes= await img.blob();
    return await uploadBytes(avatarStorageRef(userId), bytes, metadata).then(() => getDownloadURL(avatarStorageRef(userId))).catch(() => "")
}

const createUserDoc = async (userId, data) => {
    const docRef = doc(db, "users", userId)
    return await setDoc(docRef, data).then(() => {return {success: true}}).catch(() => {return {success: false}})
}
const createUser = ({address = "", city =  "", email, firstName, lastName, password = generateRandomPassword(), phoneNumber, photo = "", role = 1, zipCode = ""}) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const userId = userCredential.user.uid;
            const uploadResult = await uploadUserPhoto(userId, photo);
            const data = {
                address,
                city,
                email,
                firstName, 
                lastName,
                phoneNumber,
                photoURL: uploadResult,
                role,
                zipCode,
                createdAt: new Date(),
                orders: []
            }
            return await createUserDoc(userId, data);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return {errorCode, errorMessage}
        })
}

const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const userDoc = await getUser(userCredential.user.uid);
            const user = userCredential.user;
            return {...user, userDoc};
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return {errorCode, errorMessage}
        })
}

const getUsers = async () => {
    const usersRef = query(collection(db, "users"));

    const users = [];

    const querySnapshot = await getDocs(usersRef);
    querySnapshot.forEach((document) => {
        users.push(document.data())
    });

    return users;
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


const userService = {getUserDetails, loginUser, createUser, getUser, getUsers};

export default userService;