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
import {Dimensions, Image, Platform, Text, StatusBar, TouchableOpacity} from "react-native";
import {Feather, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {View} from "native-base";
import {useAuthUserContext} from "~/context/authUser";
import LoginClientScreen from "./screens/client/LoginAuth/index"
import PasswordRecoveryClient from "./screens/client/LoginAuth/PasswordRecovery";
import LoginAdminScreen from "~/screens/admin/LoginAuth";
import PasswordRecoveryAdmin from "./screens/admin/LoginAuth/PasswordRecovery";
import DrawerNavigationAdmin from "~/components/Navigation/DrawerNavigationAdmin";
import CreateUserScreen from "~/screens/admin/CreateUserScreen";
import UpdateUserScreen from "~/screens/admin/UpdateUserScreen";
import AssignOrderScreen from "~/screens/admin/AssignOrderScreen";
import {LinearGradient} from "expo-linear-gradient";
import {removeData, statusBarHeight, textSizeRender} from "~/utils/utils";

const SCREEN_WIDTH = Dimensions.get("window").width;
const Stack = createNativeStackNavigator();
const {Navigator, Screen} = Stack;

export const noBackButton = (props) => {
    return {
        headerTitleAlign: "center",
        headerLeft: () => (
            <TouchableOpacity style={{
                marginLeft: 15,
            }}>
            </TouchableOpacity>
        ),
    };
};


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


const HeaderClient = ({noBack=false,navigation, title, ...props}) => {
    return (
        <LinearGradient colors={["#555555", "#171717"]} style={{
            width: SCREEN_WIDTH,
            paddingTop: Platform.OS === "ios" ? statusBarHeight - 5 : statusBarHeight - (SCREEN_WIDTH * 10)
        }}>
            <StatusBar
                animated={true}
                backgroundColor="#555555"
                barStyle={"light-content"}
                showHideTransition={"slide"}
                hidden={false}/>
            <View style={{height: SCREEN_WIDTH * .15, flexDirection: 'row', marginBottom: 8, marginTop: 8}}>
                <View style={{
                    flex: .3, justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {
                        !noBack &&
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{
                                width: SCREEN_WIDTH * .1,
                                height: SCREEN_WIDTH * .1,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignSelf: 'center',
                                backgroundColor: 'white',
                                marginLeft: 15,
                            }}>
                            <MaterialIcons name="keyboard-arrow-left" size={textSizeRender(10)} color="black"/>
                        </TouchableOpacity>
                    }

                </View>

                <View style={{flex: 1, justifyContent: 'center'}}>
                    <View style={{width: SCREEN_WIDTH / 2, alignSelf: 'center'}}>
                        {
                            title ?
                                <Text style={{
                                    fontSize: textSizeRender(Platform.OS === "ios" ?5.5:4.4),
                                    textAlign: "center",
                                    color: "white",
                                    fontFamily: "Roboto_500Medium"
                                }}>
                                    {title}
                                </Text>
                                :
                                <Image
                                    resizeMode={"cover"}
                                    style={{width: '100%', tintColor: 'white'}}
                                    source={require("~/assets/cornerstone-logo-300px.png")}
                                />
                        }
                    </View>
                </View>
                <View style={{
                    flex: .3,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("Help")
                            }
                            style={{
                                marginRight: 15,
                                alignItems: 'center',
                                backgroundColor: 'white',
                                width: SCREEN_WIDTH * 0.09,
                                borderRadius: SCREEN_WIDTH * 0.09
                            }}
                        >
                            <FontAwesome name="question" size={SCREEN_WIDTH * 0.09} color="black"/>
                        </TouchableOpacity>

                    </View>

                </View>
            </View>
        </LinearGradient>
    )
};

const HeaderAdmin = ({noBack=false,navigation, title, ...props}) => {
    return (
        <LinearGradient colors={["#555555", "#171717"]} style={{
            width: SCREEN_WIDTH,
            paddingTop: Platform.OS === "ios" ? statusBarHeight - 5 : statusBarHeight - (SCREEN_WIDTH * 10)
        }}>
            <StatusBar
                animated={true}
                backgroundColor="#555555"
                barStyle={"light-content"}
                showHideTransition={"slide"}
                hidden={false}/>
            <View style={{height: SCREEN_WIDTH * .15, flexDirection: 'row', marginBottom: 8, marginTop: 8}}>
                <View style={{
                    flex: .3, justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {
                        !noBack &&
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{
                                width: SCREEN_WIDTH * .1,
                                height: SCREEN_WIDTH * .1,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignSelf: 'center',
                                backgroundColor: 'white',
                                marginLeft: 15,
                            }}>
                            <MaterialIcons name="keyboard-arrow-left" size={textSizeRender(10)} color="black"/>
                        </TouchableOpacity>
                    }

                </View>

                <View style={{flex: 1, justifyContent: 'center'}}>
                    <View style={{width: SCREEN_WIDTH / 2, alignSelf: 'center'}}>
                        {
                            title ?
                                <Text style={{
                                    fontSize: textSizeRender(Platform.OS === "ios" ?5.5:4.4),
                                    textAlign: "center",
                                    color: "white",
                                    fontFamily: "Roboto_500Medium"
                                }}>
                                    {title}
                                </Text>
                                :
                                <Image
                                    resizeMode={"cover"}
                                    style={{width: '100%', tintColor: 'white'}}
                                    source={require("~/assets/cornerstone-logo-300px.png")}
                                />
                        }
                    </View>
                </View>
                <View style={{flex: .3,
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <View style={{flexDirection: 'row',alignItems:'center',justifyContent:'center'}}>
                        <TouchableOpacity
                            onPress={() => {
                                alert("notifications")
                            }}
                            style={{
                                marginRight: 5,
                            }}
                        >
                            <View style={{alignItems: 'flex-end'}}>
                                <MaterialIcons name="notifications-none" size={SCREEN_WIDTH * 0.07} color="white"/>
                                <View style={{
                                    width: SCREEN_WIDTH * 0.04,
                                    height:SCREEN_WIDTH * 0.04,
                                    top: -5,
                                    left: 15,
                                    position: 'absolute',
                                    borderRadius: 10,
                                    backgroundColor: 'red'

                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        color: 'white', fontSize: 10
                                    }}>1</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("Profile")
                            }
                            style={{
                                marginRight: 15,
                                alignItems:'center'
                            }}
                        >
                            <Ionicons name="ios-person-circle-outline" size={SCREEN_WIDTH * 0.07} color="white"/>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </LinearGradient>
    )
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
            <Navigator


            >
                <Screen
                    name={screens.HOME}
                    component={DrawerNavigator}
                    options={{headerShown: false}}
                />
                <Screen
                    name={screens.FAQ}
                    component={Faq}
                    options={{
                        header: (props) => <HeaderClient title={"Help"} {...props} />,
                    }}
                />
                <Screen
                    name={screens.NEW_ORDER}
                    component={NewOrder}
                    options={{
                        header: (props) => <HeaderClient {...props} />,
                    }}
                />
                <Screen
                    name={screens.ORDER_DETAILS}
                    component={OrderDetails}
                    options={{
                        header: (props) => <HeaderClient title={"My order"} {...props} />,
                    }}
                    getId={({params}) => params.orderId}
                />
                <Screen
                    name={screens.PASSWORD_UPDATE}
                    component={PasswordUpdate}
                    options={{
                        header: (props) => <HeaderClient title={"Change password"} {...props} />,
                    }}
                />
                <Screen
                    name={screens.NEW_ORDER_STEP_1}
                    component={CardStep}
                    options={{
                        header: (props) => <HeaderClient title={"Picture credit card"} {...props} />,
                    }}

                />
                <Screen
                    name={screens.NEW_ORDER_STEP_2}
                    component={GravestoneStep}
                    options={{
                        header: (props) => <HeaderClient title={"Take photo the gravestone"} {...props} />,
                    }}
                />
                <Screen
                    name={screens.NEW_ORDER_STEP_3}
                    component={DetailsStep}
                    options={{
                        header: (props) => <HeaderClient title={"Gravestone text"} {...props} />,
                    }}
                />
                <Screen
                    name={screens.NEW_ORDER_STEP_3_MAP}
                    component={MapLocation}
                    options={{
                        header: (props) => <HeaderClient title={"Locate in the map"} {...props} />,
                    }}
                />
                <Screen
                    name={screens.NEW_ORDER_STEP_4}
                    component={ConfirmStep}
                    options={{
                        header: (props) => <HeaderClient title={"Confirm order"} {...props} />,
                    }}
                />
                <Screen
                    name={screens.NEW_ORDER_PLACED}
                    component={OrderPlaced}
                    options={{
                        header: (props) => <HeaderClient noBack={true} title={"Confirm order"} {...props} />,
                    }}
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
                />
                <Screen
                    name={screens.PASSWORD_UPDATE}
                    component={PasswordUpdate}
                    options={{
                        header: (props) => <HeaderAdmin {...props} />,
                    }}
                />

                <Screen
                    name={screens.CREATE_USER}
                    component={CreateUserScreen}
                    options={{
                        header: (props) => <HeaderAdmin {...props} />,
                    }}
                />
                <Screen
                    name={screens.UPDATE_USER}
                    component={UpdateUserScreen}
                    options={{
                        header: (props) => <HeaderAdmin {...props} />,
                    }}
                />

                <Screen
                    name={screens.ASSIGN_ORDER_TO}
                    component={AssignOrderScreen}
                    options={{
                        header: (props) => <HeaderAdmin {...props} />,
                    }}
                />

            </Navigator>
        </NavigationContainer>
    )
}


const Navigation = () => {
    const {user} = useAuthUserContext()
    if (user && user.userDoc.role === 1) {
        return (
            <Navigation_/>
        )
    } else if (user && user.userDoc.role !== 1) {
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

