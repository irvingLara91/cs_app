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
        case 1 :
            role = "User";
            break;
        case 2:
            role = "Administrator"
            break;
        case 3:
            role = "Technician"
            break;
    };

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

export const statusCode = (status) => {
    let statusCode = ""
    switch (status) {
        case 1:
            statusCode = "Confirmed"
            break;
        case 2:
            statusCode = "In process"
            break;
        case 3:
            statusCode = "Order ready"
            break;
        case 4:
            statusCode = "Order sent"
            break;
        default:
            statusCode = "No status"
            break
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
    let error = ""

    if (codeError === "auth/email-already-in-use") {

        error = "The email address is already in use";

    } else if (codeError === "auth/invalid-email") {

        error = "The email address is not valid.";

    } else if (codeError === "auth/operation-not-allowed") {

        error = "Operation not allowed.";
    } else if (error.code === "auth/weak-password") {

        error = "The password is too weak.";
    }

    return error
};

    /***
     *Generate order Id
     ***/
const isNumber = (value) => {
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

export const FAKE_ORDER_DETAIL = {
    date: "12-03-2022",
    media: "~/assets/gravestone-media.png",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    address: "724 echo ave, Romeoville, IL, 60446",
    additionalInstructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    status: {code: 1, msg: "Order received"}
};

export const FAKE_USER_DETAILS = {
    fullName: "Oscar",
    lastName:"Fuentes",
    phone: "5554095303",
    email: "me@cornernstone.com",
    rol:3,
    city: "chi",
    zipCode: "60446",
    password: "enctrypted password",
    address: "724 Echo ave,"
};