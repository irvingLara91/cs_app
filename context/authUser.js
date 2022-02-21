import React, {
    useState,
    createContext,
    useContext, useEffect,
} from "react";
import {getData, removeData, setData} from "~/utils/utils";

export const AuthUserContext = createContext();

export function AuthUserProvider(props) {
    const {children} = props;
    const [user, setUser] = useState(null);

    const LoginUser = async (params) => {
        await setUser(params)
        await setData("user", params)
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
        getData("user").then(response => {
            setUser(response)
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
        setUser
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
