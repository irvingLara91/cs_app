import React, {
    useState,
    createContext,
    useContext, useEffect,
} from "react";
import {getData, removeData, setData} from "~/utils/utils";
import authService from "~/services/auth";

export const AuthUserContext = createContext();

export function AuthUserProvider(props) {
    const {children} = props;
    const [fetching, setFetching] = useState(false);
    const [user, setUser] = useState(null);

    const LogOut = async () => {
        await authService.logout().then(async () => {
            await setUser(null);
            await removeData("user");
        }).catch((error) => {
            // console.log({error})
        })
    }

    const getUser = () => {
        setFetching(true)
        getData("user").then(response => {
            setUser(response)
            setFetching(false)
        }).catch(e => {
            setFetching(false)
        });
    }

    /**
     * Function to change user profile data
     * **/
    const setUserDoc=async (doc)=>{
       await setUser({...user, userDoc: doc})
        await setData("user", {...user, userDoc: doc})
    }

    /**
     * Function to change user profile data
     * **/
    const setUserParam = async (name, value) => {
        let userDoc = user.userDoc;
        let address = userDoc.address;
        if (name.substr(0, 7) === "address") {
            setUser({...user,userDoc:{...userDoc,address:{...address,[name.substr(8)]:value}}})
            await setData("user",{...user,userDoc:{...address,address:{...address,[name.substr(8)]:value}}})
        } else {
            setUser({...user, userDoc: {...userDoc, [name]: value}})
            await setData("user", {...user, userDoc: {...userDoc, [name]: value}})
        }
    }


    const FirstTime = async () => {
        await setUser({...user, isFirstTime: false})
        await setData("user", {...user, isFirstTime: false})

    }


    const setPushNotification  = async()=>{
        await setUser({...user,pushRegister:true})
        await setData("user", {...user, pushRegister: true})
    }


    const setNewOrder = async (user, newOrder) => {
        let user_ = user
        user_.userDoc.orders.push(newOrder)
        //console.log("userData:::", user_)
        await setUser(user_)
        await setData("user", user_)
    }

    useEffect(() => {
        getUser();
    }, [])

    const defaultContext = {
        LogOut,
        setUser,
        setFetching,
        user,
        fetching,
        FirstTime,
        setUserDoc,
        setNewOrder,
        setPushNotification
    };
    return (
        <AuthUserContext.Provider value={defaultContext}>
            {children}
        </AuthUserContext.Provider>
    );
}

export function useAuthUserContext() {
    return useContext(AuthUserContext);
}
