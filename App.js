import React from "react";
import {NativeBaseProvider} from "native-base";
import {
    useFonts,
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";
import {NewOrderProvider} from "./context/newOrder";
import theme from "~/theme";
import {LogBox} from "react-native";
import {AuthUserProvider} from "~/context/authUser";
import Layout from "~/components/container/Layout";

LogBox.ignoreAllLogs(true);
export default function App() {
    const [fontsLoaded] = useFonts({
        Roboto_100Thin,
        Roboto_100Thin_Italic,
        Roboto_300Light,
        Roboto_300Light_Italic,
        Roboto_400Regular,
        Roboto_400Regular_Italic,
        Roboto_500Medium,
        Roboto_500Medium_Italic,
        Roboto_700Bold,
        Roboto_700Bold_Italic,
        Roboto_900Black,
        Roboto_900Black_Italic,
    });

    return (
        <NativeBaseProvider theme={theme}>
            <AuthUserProvider>
                <NewOrderProvider>
                   <Layout fontsLoaded={fontsLoaded}/>
                </NewOrderProvider>
            </AuthUserProvider>
        </NativeBaseProvider>
    );
}
