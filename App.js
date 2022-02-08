import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, extendTheme } from "native-base";
import AppLoading from "expo-app-loading";
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

import Register from "~/components/Register";
import LoginScreen from "~/components/Login";
import PasswordRecovery from "~/components/Login/PasswordRecovery";
import PostSplash from "~/components/PostSplash";
import PendingRegisterValidation from "~/components/Register/PendingRegisterValidation";
import NewOrder from "~/components/NewOrder";
import OrderDetails from "./components/OrderDetails";
import DrawerNavigator from "./components/Navigation/DrawerNavigator";
import PasswordUpdate from "./components/Profile/PasswordUpdate";

import screens from "~/constants/screens";

export default function App() {
	const Stack = createNativeStackNavigator();
	const { Navigator, Screen } = Stack;

	let [fontsLoaded] = useFonts({
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

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	const theme = extendTheme({
		colors: {
			// Add new color
			primary: {
				50: "#E3F2F9",
				100: "#C5E4F3",
				200: "#A2D4EC",
				300: "#7AC1E4",
				400: "#47A9DA",
				500: "#0088CC",
				600: "#007AB8",
				700: "#006BA1",
				800: "#005885",
				900: "#003F5E",
			},
			// Redefinig only one shade, rest of the color will remain same.
			amber: {
				400: "#d97706",
			},
		},
		fontConfig: {
			Roboto: {
				100: {
					normal: "Roboto_100Thin",
					italic: "Roboto_100Thin_Italic",
				},
				200: {
					normal: "Roboto_200Thin",
					italic: "Roboto_200Thin_Italic",
				},
				300: {
					normal: "Roboto_300Thin",
					italic: "Roboto_300Light_Italic",
				},
				400: {
					normal: "Roboto_400Regular",
					italic: "Roboto_400Regular_Italic",
				},
				500: {
					normal: "Roboto_500Medium",
				},
				700: {
					normal: "Roboto_700Bold",
					italic: "Roboto_700Bold_Italic",
				},
				900: {
					normal: "Roboto_900Black",
					italic: "Roboto_900Black_Italic",
				},
			},
		},

		// Make sure values below matches any of the keys in `fontConfig`
		fonts: {
			heading: "Roboto_400Regular",
			body: "Roboto_400Regular",
			mono: "Roboto_500Regular",
		},

		config: {
			// Changing initialColorMode to 'dark'
			initialColorMode: "light",
		},
	});

	return (
		<NativeBaseProvider theme={theme}>
			<NavigationContainer>
				<Navigator>
					<Screen
						name={screens.POST_SPLASH}
						component={PostSplash}
						options={{ headerShown: false }}
					/>
					<Screen
						name={screens.REGISTER}
						component={Register}
						options={{ headerShown: false }}
					/>
					<Screen
						name={screens.LOGIN}
						component={LoginScreen}
						options={{ headerShown: false }}
					/>
					<Screen
						name={screens.PASSWORD_RECOVERY}
						component={PasswordRecovery}
						options={{ headerShown: false }}
					/>
					<Screen
						name={screens.PENDING_REGISTER_VALIDATION}
						component={PendingRegisterValidation}
						options={{ headerShown: false }}
					/>
					<Screen
						name={screens.HOME}
						component={DrawerNavigator}
						options={{ headerShown: false }}
					/>
					<Screen name={screens.NEW_ORDER} component={NewOrder} />
					<Screen
						name={screens.ORDER_DETAILS}
						component={OrderDetails}
						getId={({ params }) => params.orderId}
					/>
					<Screen name={screens.PASSWORD_UPDATE} component={PasswordUpdate} />
				</Navigator>
			</NavigationContainer>
		</NativeBaseProvider>
	);
}
