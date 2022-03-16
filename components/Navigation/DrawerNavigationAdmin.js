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
import ProfileScreen from "~/screens/admin/ProfileScreen";
import OrdersScreen from "~/screens/admin/OrdersScreen";
import UsersScreen from "~/screens/admin/UsersScreen";
import NotificationsScreen from "~/screens/admin/NotificationsScreen";
import HelpScreen from "~/screens/admin/HelpScreen";
import {statusBarHeight, textSizeRender} from "~/utils/utils";
import {LinearGradient} from "expo-linear-gradient";

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
                <View style={{flex: 1}}>
                    <Box my="2" mx="1" px="4">
                        {
                            user && user.userDoc ?
                                <Avatar
                                    bg="indigo.500"
                                    size="xl"
                                    source={{
                                        uri: user.userDoc.photoURL
                                    }}
                                />
                                :
                            <Avatar
                                bg="indigo.500"
                                size="xl"
                                source={{
                                    uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                                }}
                            />
                        }
                        <IconButton
                            w={"40px"}
                            top={"60px"}
                            left={"70px"}
                            position={"absolute"}
                            icon={<Icon as={MaterialCommunityIcons} name="pencil"/>}
                            borderRadius="full"
                            onPress={() => props.navigation.navigate("Profile")}
                            _icon={{
                                color: "red.500",
                                size: "sm",
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
                                        size: "sm",
                                    },
                                },
                            }}
                            _ios={{
                                _icon: {
                                    size: "sm",
                                },
                            }}
                        />

                        <Text bold color="primary_black.700" style={{fontSize:textSizeRender(5),fontFamily:"Roboto_500Medium"}} pt={5}>
                            {user && user.userDoc&& user.userDoc.firstName+" "}
                            {user && user.userDoc&& user.userDoc.lastName}
                        </Text>
                    </Box>
                    <Divider mb={4}/>
                    <VStack divider={<Divider/>} space="4">
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

                <View style={{flex: 0, backgroundColor: '#F5F5F5', justifyContent: 'flex-end'}}>
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
                                    "primary_black.400"
                                }
                                size="7"
                                as={<MaterialCommunityIcons name={getIcon("LogOut")}/>}
                            />
                            <Text
                                fontWeight="500"
                                color={"primary_black.400"}>
                                Log out
                            </Text>
                        </HStack>
                    </Pressable>
                </View>
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
