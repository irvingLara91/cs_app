import React from "react";
import Navigation from "../../Navigation";
import AppLoading from "expo-app-loading";

const Layout = (props) => {
    if (props.fontsLoaded) {
        return (
            <>
                <Navigation/>
            </>
        );
    } else {
        return (
            <AppLoading/>
        )
    }
}
export default Layout;