import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "~/components/Register";
import LoginScreen from "~/components/Login";
import PasswordRecovery from "~/components/Login/PasswordRecovery";
import PostSplash from "~/components/PostSplash";
import PendingRegisterValidation from "~/components/Register/PendingRegisterValidation";
import NewOrder from "~/components/NewOrder";
import OrderDetails from "~/components/OrderDetails";
import DrawerNavigator from "~/components/Navigation/DrawerNavigator";
import Faq from "./components/Help/Faq";
import PasswordUpdate from "~/components/Profile/PasswordUpdate";
import CardStep from "~/components/NewOrder/CardStep";
import GravestoneStep from "~/components/NewOrder/GravestoneStep";
import DetailsStep from "~/components/NewOrder/DetailsStep";
import MapLocation from "~/components/NewOrder/MapLocation";
import ConfirmStep from "~/components/NewOrder/ConfirmStep";
import OrderPlaced from "~/components/NewOrder/OrderPlaced";

import screens from "~/constants/screens";

const Navigation = () => {
	const Stack = createNativeStackNavigator();
	const { Navigator, Screen } = Stack;
	return (
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
				<Screen
					name={screens.FAQ}
					component={Faq}
					options={{ headerShown: false }}
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
				<Screen
					name={screens.PASSWORD_UPDATE}
					component={PasswordUpdate}
				/>
				<Screen
					name={screens.NEW_ORDER_STEP_1}
					component={CardStep}
				/>
				<Screen
					name={screens.NEW_ORDER_STEP_2}
					component={GravestoneStep}
				/>
				<Screen
					name={screens.NEW_ORDER_STEP_3}
					component={DetailsStep}
				/>
				<Screen
					name={screens.NEW_ORDER_STEP_3_MAP}
					component={MapLocation}
				/>
				<Screen
					name={screens.NEW_ORDER_STEP_4}
					component={ConfirmStep}
				/>
				<Screen
					name={screens.NEW_ORDER_PLACED}
					component={OrderPlaced}
				/>
			</Navigator>
		</NavigationContainer>
	);
};

export default Navigation;
