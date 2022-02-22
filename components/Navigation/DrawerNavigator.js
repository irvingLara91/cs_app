import React from "react";

import {
    createDrawerNavigator,
    DrawerContentScrollView,
} from "@react-navigation/drawer";
import {Feather} from "@expo/vector-icons";
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
import {Dimensions, Platform, TouchableOpacity} from "react-native";
import Home from "~/components/Home";
import Help from "~/components/Help";
import {useAuthUserContext} from "~/context/authUser";

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
    const {LogOut} = useAuthUserContext()

    return (
        <DrawerContentScrollView {...props} safeArea>
            <VStack space="6" my="2" mx="1">
                <Box px="4">
                    <Avatar
                        bg="indigo.500"
                        size="xl"
                        source={{
                            uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                        }}
                    />
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
                            bg: "red.600:alpha.30",
                        }}
                        _pressed={{
                            bg: "red.600:alpha.30",
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

                    <Text bold color="primary.700" pt={5}>
                        Jonh Appleseed
                    </Text>
                </Box>
                <Divider/>
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
                                            ? "rgba(6, 182, 212, 0.1)"
                                            : "transparent"
                                    }
                                    onPress={() => {
                                        props.navigation.navigate(name);
                                    }}>
                                    <HStack space="7" alignItems="center">
                                        <Icon
                                            color={
                                                index === props.state.index ? "primary.500" : "gray.500"
                                            }
                                            size="7"
                                            as={<MaterialCommunityIcons name={getIcon(name)}/>}
                                        />
                                        <Text
                                            fontWeight="500"
                                            color={
                                                index === props.state.index ? "primary.500" : "gray.700"
										}>
                                            {name}
                                        </Text>
                                    </HStack>
                                </Pressable>
                                {name === "Help" && <Divider/>}
                            </View>
                        ))}
                        <View>
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
                                            "gray.500"
                                        }
                                        size="7"
                                        as={<MaterialCommunityIcons name={getIcon("LogOut")}/>}
                                    />
                                    <Text
                                        fontWeight="500"
                                        color={"gray.700"}>
                                        LogOut
                                    </Text>
                                </HStack>
                            </Pressable>
                        </View>
                    </VStack>
                </VStack>
            </VStack>
        </DrawerContentScrollView>
    );
}

const DrawerNavigator = () => {
    const {Navigator, Screen} = Drawer;
    return (
        <Navigator
            screenOptions={({navigation}) => ({
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
            })}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Screen
                name="Home"
                component={Home}
                initialParams={{isFirstTime: false}}
            />
            <Screen
                name="Orders"
                component={Orders}
                options={{
                    drawerLabel: "My Orders",
                    title: "My Orders",
                }}
            />
            <Screen
                name="Profile"
                component={Profile}
                options={{
                    drawerLabel: "My Profile",
                    title: "My Profile",
                }}
            />
            <Screen
                name="Help"
                component={Help}
                options={{
                    drawerLabel: "Help",
                    title: "Help",
                }}
            />
        </Navigator>
    );
};

export default DrawerNavigator;
