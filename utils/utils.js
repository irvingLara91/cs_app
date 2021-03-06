import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dimensions} from "react-native";
export const SCREEN_WIDTH = Dimensions.get("window").width
export const SCREEN_HEIGHT = Dimensions.get("window").height

export const setData = async (name, data) => {
    try {
        await AsyncStorage.setItem(
            '@' + name,
            JSON.stringify(data)
        );
    } catch (e) {
        console.log(e)
    }
}

export const getData = async (name) => {
    try {
        let storage = await AsyncStorage.getItem("@" + name);
        storage = JSON.parse(storage)
        return storage
    } catch (e) {
        console.log(e)
    }
}
export const removeData = async (name) => {
    try {
        await AsyncStorage.removeItem("@" + name);
    } catch (e) {
        console.log(e)
    }
}

export const textSizeRender = (size) => {
    let resolution = size / 100
    return resolution * SCREEN_WIDTH
}

export const roleType =(type)=>{
    let role = ""
    switch (type) {
        case 1:
            role = "User"
            break;
        case 2:
            role = "Administrator"
            break;
        case 3:
            role = "Technician"
            break;
    }

    return role;
};

export const roles = [
    {
        label: "Client",
        value: 1
    },
    {
        label: "Administrator",
        value: 2
    },
    {
        label: "Technician",
        value: 3
    }
];

export const longName =(name,lastname)=>{
    let fullName=name+" "+lastname;
    if (fullName.length>30){
        fullName =fullName.substr(0,12)+"..."
    }else {
        fullName = fullName
    }
    return fullName;
}
export const statusCode = (status) => {
    let statusCode = ""
    switch (status) {
        case 0:
            statusCode = "Cancelled"
            break;
        case 1:
            statusCode = "Created"
            break;
        case 2:
            statusCode = "In progress"
            break;
        case 3:
            statusCode = "Completed"
            break;
        case 4:
            statusCode = "Finished"
            break;
        case 5:
            statusCode = "Paused"
            break;
        case 6:
            statusCode = "Activated"
            break;
        case 7:
            statusCode = "Rejected"
            break;
        default:
            statusCode= "Status"
    }

    return statusCode;
};

export const valStatusCode = (status) => {
    let statusCode = {name:"Cancelled",code:0}
    switch (status) {
        case 0:
            statusCode = {name:"Cancelled",code:0}
            break;
        case 5:
            statusCode =  {name:"Paused",code:3}
            break;
        case 6:
            statusCode = {name:"Activated",code:4}
            break;
        case 7:
            statusCode = {name:"Rejected",code:5}
            break;
    }
    ;

    return statusCode;
}

export const generateRandomPassword = (length = 8) => {
    const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*_-+=";
    const characters = alpha + numbers + symbols
    let password = "";
    for (let i = 0; i < length; i++) {
        password += characters.charAt(
        Math.floor(Math.random() * characters.length)
        );
    }
  return password;
}

export const rgx = {
    url: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
}


export const errorMessage = (codeError) => {
    let error = codeError

    if (codeError === "auth/email-already-in-use") {

        error = "The email address is already in use";

    } else if (codeError === "auth/invalid-email") {

        error = "The email address is not valid.";

    } else if (codeError === "auth/operation-not-allowed") {
        error = "Operation not allowed.";
    } else if (codeError === "auth/weak-password") {
        error = "The password is too weak.";
    }else if (codeError ==="auth/too-many-requests"){
        error = "Incorrect user credentials";
    }else if (codeError ==="auth/user-not-found"){
        error="There is no user record corresponding to this identifier."
    }else if (codeError==="auth/wrong-password"){
        error="Incorrect user credentials"
    }
    return error
};

    /***
     *Generate order Id
     ***/
export const isNumber = (value) => {
    if (typeof value != "string") return false;
    return !isNaN(value) && !isNaN(parseFloat(value));
};

const getNumbersFromLocaleTime = (localeTime) => {
    const splitted = localeTime.split("");
    return splitted.reduce((acc, currentValue) => {
        if (isNumber(currentValue)) acc.push(currentValue);
        return acc;
    }, []).join("");
};

export const generateOrderId = () => {
    const localeTime = new Date().toLocaleTimeString("en-US");
    const orderId = getNumbersFromLocaleTime(localeTime) + Math.floor((1 + Math.random()) * 0x10);
    return orderId;
};
/***
 *End generate order Id
 ***/



export const ORDERS_FAKE_DATA =  [
    {
        orderId: 1458976,
        date: "12-03-2022",
        status: "Order Shipped"
    },
    {
        orderId: 1458977,
        date: "12-03-2022",
        status: "In process"
    },
    {
        orderId: 1458979,
        date: "12-03-2022",
        status: "Delivered",
    },
];


const barHeightFactor = Dimensions.get('window').height * .2 - 125;
export const statusBarHeight = barHeightFactor > 22 ? barHeightFactor : 22;

export const initialResponse = { success: false, error: false, message: "" }
