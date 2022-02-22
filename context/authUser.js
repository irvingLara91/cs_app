import React, {
    useState,
    createContext,
    useContext, useEffect,
} from "react";
import {getData, removeData, setData} from "~/utils/utils";

export const AuthUserContext = createContext();

export function AuthUserProvider(props) {
    const {children} = props;
    const [fetching, setFetching] = useState(false);
    const [user, setUser] = useState(null);

    const LoginUser = async (params) => {
        await setFetching(true)
        await setUser(params)
        await setData("user", params)
        await setFetching(false)
    }

    const RegisterUser = async (params) => {
        await setUser(params)
        await setData("user", params)
    }

    const LogOut = async () => {
        await setUser(null);
        await removeData("user");
    }

    const FirstTime = async () => {
        await  setUser({...user, isFirstTime: false})
        await setData("user",{...user, isFirstTime: false})

    }

    const getUser = () => {
        setFetching(true)
        getData("user").then(response => {
            setUser(response)
            setFetching(false)
        }).catch(e=>{
            setFetching(false)
        });
    }
    useEffect(() => {
        getUser();
    }, [])

    const defaultContext = {
        LoginUser,
        RegisterUser,
        LogOut,
        FirstTime,
        user,
        setUser,
        fetching,
        setFetching
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
