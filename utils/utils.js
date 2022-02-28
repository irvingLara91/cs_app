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
    let rol = ""
    switch (type) {
        case 1 :
            rol = "user";
        case 2:
            rol = "administrator";
        case 3:
            rol = "Technician"
    };

    return rol;
};
