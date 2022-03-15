import React from "react";
import {TouchableOpacity, View, Image, Platform, StatusBar} from "react-native";
import {Feather, MaterialIcons, SimpleLineIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";
import {SCREEN_WIDTH, statusBarHeight, textSizeRender} from "~/utils/utils";


const Header = (screen) => {
    const navigation = useNavigation();
    return (
        <LinearGradient colors={["#555555", "#171717"]} style={{
            width: SCREEN_WIDTH,
            //zIndex: 2, position: 'absolute',
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
                        onPress={() => navigation.navigate({name: screen.screenName})}
                        style={{
                            width: SCREEN_WIDTH * .1,
                            height: SCREEN_WIDTH * .1,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            marginLeft: 15,
                        }}>
                        <MaterialIcons name="keyboard-arrow-left" size={textSizeRender(10)} color="black"/>
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
                <View style={{flex: .3}}>
                </View>
            </View>
        </LinearGradient>
    );
};

export default Header;
