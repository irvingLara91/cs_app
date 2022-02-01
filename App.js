import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";

import Register from "~/components/Register";
import LoginScreen from "~/components/Login";
import HomeScreen from "~/components/Home";
import PasswordRecovery from "~/components/Login/PasswordRecovery";
import PostSplash from "~/components/PostSplash";
import PendingRegisterValidation from "~/components/Register/PendingRegisterValidation";
import NewOrder from "~/components/NewOrder";
import OrderDetails from "./components/OrderDetails";

import screens from "~/constants/screens";

export default function App() {
	const Stack = createNativeStackNavigator();
	const { Navigator, Screen } = Stack;
	return (
		<NativeBaseProvider>
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
					/>
					<Screen
						name={screens.LOGIN}
						component={LoginScreen}
					/>
					<Screen
						name={screens.PASSWORD_RECOVERY}
						component={PasswordRecovery}
					/>
					<Screen
						name={screens.PENDING_REGISTER_VALIDATION}
						component={PendingRegisterValidation}
						options={{detachPreviousScreen: true}}
					/>
					<Screen
						name={screens.HOME}
						component={HomeScreen}
					/>
					<Screen
						name={screens.NEW_ORDER}
						component={NewOrder}
					/>
					<Screen
						name={screens.ORDER_DETAILS}
						component={OrderDetails}
						getId={({ params }) => params.orderId}
					/>
				</Navigator>
			</NavigationContainer>
		</NativeBaseProvider>
	);
}
