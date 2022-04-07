import React from "react";

import {
    createDrawerNavigator,
    DrawerContentScrollView,
} from "@react-navigation/drawer";
import {Feather, FontAwesome, Ionicons, MaterialIcons} from "@expo/vector-icons";
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
import {longName, SCREEN_HEIGHT, statusBarHeight, textSizeRender} from "~/utils/utils";
import {LinearGradient} from "expo-linear-gradient";
import gravestoneMedia from "~/assets/gravestone-media.png";

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
                                    user && user.userDoc && user.userDoc.photoURL ?
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
                                }} pt={0}>
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
                <LinearGradient colors={["#555555", "#171717"]} style={{flex: 0, justifyContent: 'flex-end'}}>
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

const HeaderClient = ({navigation, title = null, ...props}) => {
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
                        {
                            title ?
                                <Text style={{
                                    fontSize: textSizeRender(5.5),
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
                            }}>
                            <FontAwesome name="question" size={SCREEN_WIDTH * 0.09} color="black"/>
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
                    header: (props) => <HeaderClient title={"Your orders"} {...props} />,
                }}
            />
            <Screen
                name="Profile"
                component={Profile}
                options={{
                    header: (props) => <HeaderClient title={"My Profile"} {...props} />,
                }}
            />
            <Screen
                name="Help"
                component={Help}
                options={{
                    header: (props) => <HeaderClient title={"Help"} {...props} />,
                }}

            />
        </Navigator>
    );
};

export default DrawerNavigator;
