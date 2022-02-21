import AsyncStorage from '@react-native-async-storage/async-storage';

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