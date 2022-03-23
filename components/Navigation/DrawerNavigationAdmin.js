import React from "react";

import {
    createDrawerNavigator,
    DrawerContentScrollView,
} from "@react-navigation/drawer";
import {Feather, MaterialIcons, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {
    Box,
    Pressable,
    VStack,
    Text,
    HStack,
    Divider,
    Icon,
    Avatar,
    IconButton,
    View,
} from "native-base";

import {Dimensions, Image, Platform, StatusBar, TouchableOpacity} from "react-native";
import Dashboard from "../../screens/admin/DashboardScreen";
import {useAuthUserContext} from "~/context/authUser";
//import ProfileScreen from "~/screens/admin/ProfileScreen";
import ProfileScreen from "~/components/Profile";

import OrdersScreen from "~/screens/admin/OrdersScreen";
import UsersScreen from "~/screens/admin/UsersScreen";
import NotificationsScreen from "~/screens/admin/NotificationsScreen";
import HelpScreen from "~/screens/admin/HelpScreen";
import {longName, statusBarHeight, textSizeRender} from "~/utils/utils";
import {LinearGradient} from "expo-linear-gradient";
import gravestoneMedia from "~/assets/gravestone-media.png";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const Drawer = createDrawerNavigator();

const getIcon = (screenName) => {
    switch (screenName) {
        case "Dashboard":
            return "dashboard";
        case "Profile":
            return "face-profile";
        case "Orders":
            return "clipboard-text-multiple";
        case "Users":
            return "users";
        case "Notifications":
            return "message-reply-text";
        case "Help":
            return "help-circle-outline";
        case "LogOut":
            return "logout";
        default:
            return undefined;
    }
};

const getName = (screenName) => {
    switch (screenName) {
        case "Dashboard":
            return "Dashboard";
        case "Profile":
            return "My profile";
        case "Orders":
            return "Orders";
        case "Users":
            return "Users";
        case "Notifications":
            return "Notifications";
        case "Help":
            return "Help";
        case "LogOut":
            return "logout";
        default:
            return undefined;
    }
};

function CustomDrawerContent(props) {
    const {LogOut,user} = useAuthUserContext()

    return (
        <DrawerContentScrollView {...props} safeArea>
            <View style={{height: Platform.OS === "ios" ? (SCREEN_HEIGHT - 51) : SCREEN_HEIGHT}}>
                <View style={{flex: 1,width:'100%'}}>
                    <LinearGradient colors={["#858C93", "#5E6268"]} style={{
                        top: -SCREEN_WIDTH * .15,
                        height: SCREEN_WIDTH * .5,
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            width:'100%',
                            marginTop: SCREEN_WIDTH * .09,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: "center"
                        }}>
                            <View style={{flex:0,marginLeft:20}}>
                                {
                                    user && user.userDoc && user.userDoc?.photoURL ?
                                        <Avatar
                                            style={{borderColor: "white", borderWidth: 1.5}}
                                            bg="indigo.500"
                                            size={SCREEN_WIDTH * .18}
                                            source={{
                                                uri: user.userDoc.photoURL
                                            }}
                                        />
                                        :
                                        <View style={{
                                            backgroundColor:'white',
                                            justifyContent:'center',
                                            alignItems:'center',
                                            height:SCREEN_WIDTH * .18,
                                            width:SCREEN_WIDTH * .18,
                                            borderRadius:100,
                                            borderColor: "white", borderWidth: 1.5
                                        }}>
                                            <Avatar
                                                bg="primary_white.50"
                                                size={"90%"}
                                                source={gravestoneMedia}
                                            />
                                        </View>
                                }
                                <IconButton
                                    bg={"primary_white.50"}
                                    w={"34px"}
                                    style={{borderColor: 'white', borderWidth: 1}}
                                    top={"-10px"}
                                    left={"40px"}
                                    position={"absolute"}
                                    icon={<Icon as={MaterialCommunityIcons} name="pencil"/>}
                                    borderRadius="full"
                                    onPress={() => props.navigation.navigate("Profile")}
                                    _icon={{
                                        color: "primary_black.500",
                                        size: "xs",
                                    }}
                                    _hover={{
                                        bg: "red.500:alpha.30",
                                    }}
                                    _pressed={{
                                        bg: "primary_black.100:alpha.30",
                                        _icon: {
                                            name: "pencil-outline",
                                        },
                                        _ios: {
                                            _icon: {
                                                size: "xs",
                                            },
                                        },
                                    }}
                                    _ios={{
                                        _icon: {
                                            size: "xs",
                                        },
                                    }}
                                />
                            </View>
                            <View style={{flex:1,width:'100%'}}>
                                <Text bold color="primary_black.700" style={{
                                    color: "white",
                                    marginLeft: 10,
                                    fontSize: textSizeRender(4.5), fontFamily: "Roboto_700Bold"
                                }} pt={5}>
                                    {user && user.userDoc &&
                                        longName(user.userDoc.firstName, user.userDoc.lastName)
                                    }
                                </Text>
                            </View>
                        </View>
                    </LinearGradient>
                    <VStack  top={-SCREEN_WIDTH * .15} divider={<Divider/>} space="4">
                        <VStack space="3">
                            {props.state.routeNames.map((name, index) => (
                                <View key={index}>
                                    <Pressable
                                        px="5"
                                        py="3"
                                        rounded="md"
                                        bg={
                                            index === props.state.index
                                                ? "rgba(9,0,0,0.1)"
                                                : "transparent"
                                        }
                                        onPress={() => {
                                            props.navigation.navigate(name);
                                        }}>
                                        <HStack space="7" alignItems="center">
                                            <Icon
                                                color={
                                                    index === props.state.index ? "primary_black.900" : "primary_black.400"
                                                }
                                                size="7"
                                                as={name === "Dashboard" ?
                                                    <MaterialIcons name={getIcon(name)}/>
                                                    :
                                                    name === "Users" ? <Feather name={getIcon(name)}/>
                                                        :
                                                        <MaterialCommunityIcons name={getIcon(name)}/>}
                                            />
                                            <Text
                                                fontWeight="500"
                                                color={
                                                    index === props.state.index ? "primary_black.900" : "primary_black.400"
                                                }>
                                                {getName(name)}
                                            </Text>
                                        </HStack>
                                    </Pressable>
                                    {name === "Help" && <Divider/>}
                                </View>
                            ))}
                        </VStack>
                    </VStack>
                </View>
                <LinearGradient colors={["#555555","#171717"]} style={{flex: 0, justifyContent: 'flex-end'}}>
                    <Pressable
                        px="5"
                        py="3"
                        rounded="md"
                        onPress={() => {
                            LogOut()
                        }}>
                        <HStack space="7" alignItems="center">
                            <Icon
                                color={
                                    "primary_white.50"
                                }
                                size="7"
                                as={<MaterialCommunityIcons name={getIcon("LogOut")}/>}
                            />
                            <Text
                                fontWeight="500"
                                color={"primary_white.50"}>
                                Log out
                            </Text>
                        </HStack>
                    </Pressable>
                </LinearGradient>
            </View>
        </DrawerContentScrollView>
    );
}

function LogoTitle() {
    return (
        <View style={{flex: 1,justifyContent:'center'}}>
            <View style={{width: SCREEN_WIDTH / 2, alignSelf: 'center'}}>
                <Image
                    resizeMode={"contain"}
                    style={{width: '100%'}}
                    source={require("~/assets/cornerstone-logo-300px.png")}
                />
            </View>

        </View>
    );
}

const HeaderAdmin =({navigation,...props})=>{
    return(
        <LinearGradient colors={["#555555", "#171717"]} style={{
            width: SCREEN_WIDTH,
            paddingTop: Platform.OS ==="ios" ?  statusBarHeight-5 :  statusBarHeight - (SCREEN_WIDTH*10)
        }}>
            <StatusBar
                animated={true}
                backgroundColor="#555555"
                barStyle={"light-content"}
                showHideTransition={"slide"}
                hidden={false} />
            <View style={{height: SCREEN_WIDTH * .15, flexDirection: 'row', marginBottom: 8, marginTop: 8}}>
                <View style={{
                    flex: .3, justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.toggleDrawer()}
                        style={{
                            width: SCREEN_WIDTH * .1,
                            height: SCREEN_WIDTH * .1,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            marginLeft: 15,
                        }}>
                        <Feather name="menu" size={SCREEN_WIDTH * 0.07} color="black"/>
                    </TouchableOpacity>
                </View>

                <View style={{flex: 1, justifyContent: 'center'}}>
                    <View style={{width: SCREEN_WIDTH / 2, alignSelf: 'center'}}>
                        <Image
                            resizeMode={"cover"}
                            style={{width: '100%', tintColor: 'white'}}
                            source={require("~/assets/cornerstone-logo-300px.png")}
                        />
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
                                    backgroundColor: 'white'

                                }}>
                                    <Text style={{
                                        top: -3,
                                        textAlign: 'center',
                                        color: 'black', fontSize: 10
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


const DrawerNavigator = () => {
    const {user} = useAuthUserContext()
    const {Navigator, Screen} = Drawer;

    return (
        <Navigator

            /*screenOptions={({navigation}) => ({
                headerTitleAlign: "center",
                headerStyle: {
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 0.6,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 0.1,
                    elevation: 3,
                    backgroundColor: "white",
                    height:
                        Platform.OS === "android"
                            ? SCREEN_WIDTH * 0.19
                            : SCREEN_WIDTH * 0.24,
                },
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.toggleDrawer()}
                        style={{
                            marginLeft: 15,
                        }}
                    >
                        <Feather name="menu" size={SCREEN_WIDTH * 0.07} color="black"/>
                    </TouchableOpacity>
                ),
                headerTitle: (props) => <LogoTitle {...props} />,
                headerRight: () => (
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            onPress={() => {
                                alert("notifications")
                            }}
                            style={{
                                marginRight: 5,
                            }}
                        >
                            <View style={{alignItems: 'flex-end'}}>
                                <MaterialIcons name="notifications-none" size={SCREEN_WIDTH * 0.07} color="black"/>
                                <View style={{
                                    width: SCREEN_WIDTH * 0.04,
                                    height:SCREEN_WIDTH * 0.04,
                                    top: -5,
                                    left: 15,
                                    position: 'absolute',
                                    borderRadius: 10,
                                    backgroundColor: 'black'

                                }}>
                                    <Text style={{
                                        top: -3,
                                        textAlign: 'center',
                                        color: 'white', fontSize: 10
                                    }}>1</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Profile");
                            }}
                            style={{
                                marginRight: 15,
                            }}
                        >
                            <Ionicons name="ios-person-circle-outline" size={SCREEN_WIDTH * 0.07} color="black"/>
                        </TouchableOpacity>

                    </View>
                )
            })}*/
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    header: (props) => <HeaderAdmin {...props} />,
                }}
            />
            <Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    header: (props) => <HeaderAdmin {...props} />,
                }}
            />
            <Screen
                name="Orders"
                component={OrdersScreen}
                options={{
                    header: (props) => <HeaderAdmin {...props} />,
                }}
            />
            {
                user.role !== 3 &&
                <Screen
                    name="Users"
                    component={UsersScreen}
                    options={{
                        header: (props) => <HeaderAdmin {...props} />,
                    }}
                />
            }
            <Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{
                    header: (props) => <HeaderAdmin {...props} />,
                }}
            />
            <Screen
                name="Help"
                component={HelpScreen}
                options={{
                    header: (props) => <HeaderAdmin {...props} />,
                }}
            />
        </Navigator>
    );
};

export default DrawerNavigator;
