import React from "react";

import {
    createDrawerNavigator,
    DrawerContentScrollView,
} from "@react-navigation/drawer";
import {Feather, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {MaterialCommunityIcons} from "@expo/vector-icons";
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

import Orders from "~/components/Orders";
import Profile from "~/components/Profile";
import {Dimensions, Image, Platform, StatusBar, TouchableOpacity} from "react-native";
import Home from "~/components/Home";
import Help from "~/components/Help";
import {useAuthUserContext} from "~/context/authUser";
import {SCREEN_HEIGHT, statusBarHeight, textSizeRender} from "~/utils/utils";
import {LinearGradient} from "expo-linear-gradient";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Drawer = createDrawerNavigator();

const getIcon = (screenName) => {
    switch (screenName) {
        case "Home":
            return "home-variant-outline";
        case "Orders":
            return "clipboard-check-outline";
        case "Profile":
            return "face-profile";
        case "Help":
            return "help-circle-outline";
        case "LogOut":
            return "logout";
        default:
            return undefined;
    }
};

function CustomDrawerContent(props) {
    const {LogOut, user} = useAuthUserContext()

    return (
        <DrawerContentScrollView {...props} safeArea>
            <View style={{height: Platform.OS === "ios" ? (SCREEN_HEIGHT - 51) : SCREEN_HEIGHT}}>
                <View style={{flex: 1}}>
                    <Box my="2" px="4">
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

                        <Text bold color="primary_black.700"
                              style={{fontSize: textSizeRender(5), fontFamily: "Roboto_500Medium"}} pt={5}>
                            {user && user.userDoc && user.userDoc.firstName + " "}
                            {user && user.userDoc && user.userDoc.lastName}
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
                                                as={<MaterialCommunityIcons name={getIcon(name)}/>}
                                            />
                                            <Text
                                                fontWeight="500"
                                                color={
                                                    index === props.state.index ? "primary_black.900" : "primary_black.400"
                                                }>
                                                {name}
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
        <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={{width: SCREEN_WIDTH / 2}}>
                <Image
                    resizeMode={"contain"}
                    style={{width: '100%'}}
                    source={require("~/assets/cornerstone-logo-300px.png")}
                />
            </View>

        </View>
    );
}

const HeaderClient = ({navigation, ...props}) => {
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
                                alignItems: 'center'
                            }}
                        >
                            <MaterialCommunityIcons name={"help-circle-outline"}size={SCREEN_WIDTH * 0.09} color="white"/>
                        </TouchableOpacity>

                    </View>

                </View>
            </View>
        </LinearGradient>
    )
};


const DrawerNavigator = () => {
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
            })}*/
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Screen
                name="Home"
                component={Home}
                options={{
                    header: (props) => <HeaderClient {...props} />,
                }}
            />
            <Screen
                name="Orders"
                component={Orders}
                options={{
                    header: (props) => <HeaderClient {...props} />,
                }}
            />
            <Screen
                name="Profile"
                component={Profile}
                options={{
                    header: (props) => <HeaderClient {...props} />,
                }}
            />
            <Screen
                name="Help"
                component={Help}
                options={{
                    header: (props) => <HeaderClient {...props} />,
                }}

            />
        </Navigator>
    );
};

export default DrawerNavigator;
