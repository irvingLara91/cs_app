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
    
    const LogOut = async () => {
        await setUser(null);
        await removeData("user");
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
        LogOut,
        setUser,
        setFetching,
        user,
        fetching,
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
