import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Register from "~/components/Register";
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
import {Dimensions, Platform, TouchableOpacity} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {View} from "native-base";
import {useAuthUserContext} from "~/context/authUser";
import LoginClientScreen from "./screens/client/LoginAuth/index"
import PasswordRecoveryClient from "./screens/client/LoginAuth/PasswordRecovery";
import LoginAdminScreen from "~/screens/admin/LoginAuth";
import PasswordRecoveryAdmin from "./screens/admin/LoginAuth/PasswordRecovery";
import DrawerNavigationAdmin from "~/components/Navigation/DrawerNavigationAdmin";

const SCREEN_WIDTH = Dimensions.get("window").width;
const Stack = createNativeStackNavigator();
const {Navigator, Screen} = Stack;

export const backButton = (props) => {
    return {
        headerTitleAlign: "center",
        headerLeft: () => (
            <TouchableOpacity onPress={() => {
                props.navigation.goBack()
            }} style={{
                marginLeft: 15,
            }}>
                <MaterialIcons name="arrow-back-ios" size={SCREEN_WIDTH * .07} color="black"/>
            </TouchableOpacity>
        ),
    };
};


const NavigationAuth = () => {
    return (
        <NavigationContainer>
            <Navigator>
                <Screen
                    name={screens.POST_SPLASH}
                    component={PostSplash}
                    options={{headerShown: false}}
                />
                <Screen
                    name={screens.REGISTER}
                    component={Register}
                    options={{headerShown: false}}
                />
                <Screen
                    name={screens.LOGIN}
                    component={LoginClientScreen}
                    options={{headerShown: false}}
                />
                <Screen
                    name={screens.PASSWORD_RECOVERY}
                    component={PasswordRecoveryClient}
                    options={{headerShown: false}}
                />
                <Screen
                    name={screens.LOGIN_ADMIN}
                    component={LoginAdminScreen}
                    options={{headerShown: false}}
                />
                <Screen
                    name={screens.PASSWORD_RECOVERY_ADMIN}
                    component={PasswordRecoveryAdmin}
                    options={{headerShown: false}}
                />

                <Screen
                    name={screens.PENDING_REGISTER_VALIDATION}
                    component={PendingRegisterValidation}
                    options={{headerShown: false}}
                />
            </Navigator>
        </NavigationContainer>
    )
};


const Navigation_ = () => {
    return (
        <NavigationContainer>
            <Navigator>
                <Screen
                    name={screens.HOME}
                    component={DrawerNavigator}
                    options={{headerShown: false}}
                    initialParams={{isFirstTime: false}}
                />
                <Screen
                    name={screens.FAQ}
                    component={Faq}
                    options={{headerShown: false}}
                />
                <Screen
                    name={screens.NEW_ORDER}
                    component={NewOrder}
                    options={backButton}
                />
                <Screen
                    name={screens.ORDER_DETAILS}
                    component={OrderDetails}
                    options={backButton}
                    getId={({params}) => params.orderId}
                />
                <Screen
                    name={screens.PASSWORD_UPDATE}
                    component={PasswordUpdate}
                    options={backButton}
                />
                <Screen
                    name={screens.NEW_ORDER_STEP_1}
                    component={CardStep}
                    options={backButton}

                />
                <Screen
                    name={screens.NEW_ORDER_STEP_2}
                    component={GravestoneStep}
                    options={backButton}
                />
                <Screen
                    name={screens.NEW_ORDER_STEP_3}
                    component={DetailsStep}
                    options={backButton}
                />
                <Screen
                    name={screens.NEW_ORDER_STEP_3_MAP}
                    component={MapLocation}
                    options={({navigation}) => ({
                        headerTitleAlign: "center",
                        headerLeft: () => (
                            <View style={{
                                marginLeft: 15,
                            }}>
                            </View>
                        ),
                    })}
                />
                <Screen
                    name={screens.NEW_ORDER_STEP_4}
                    component={ConfirmStep}
                    options={backButton}
                />
                <Screen
                    name={screens.NEW_ORDER_PLACED}
                    component={OrderPlaced}
                    options={backButton}
                />
            </Navigator>
        </NavigationContainer>
    );
};


const NavigationAdmin = () => {
    return (
        <NavigationContainer>
            <Navigator>
                <Screen
                    name={screens.HOME_ADMIN}
                    component={DrawerNavigationAdmin}
                    options={{headerShown: false}}
                    initialParams={{isFirstTime: false}}
                />
                <Screen
                    name={screens.PASSWORD_UPDATE}
                    component={PasswordUpdate}
                    options={backButton}
                />
            </Navigator>
        </NavigationContainer>
    )
}


const Navigation = () => {
    const {user} = useAuthUserContext()
    if (user && user.LoggedIn && user.userType === 1) {
        return (
            <Navigation_/>
        )
    } else if (user && user.LoggedIn && user.userType !== 1) {
        return (
            <NavigationAdmin/>
        )
    } else {
        return (
            <NavigationAuth/>
        )
    }
}

export default Navigation

