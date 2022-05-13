import React from "react";
import {Box, Center, Heading, Link, Stack, Button, Image} from "native-base";
import {useNavigation} from "@react-navigation/native";
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import welcomeImage from "~/assets/icon_welcome.png";
import screens from "~/constants/screens";
import {useAuthUserContext} from "~/context/authUser";
import {LinearGradient} from "expo-linear-gradient";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";

const Welcome = () => {
    const navigation = useNavigation();
    const {FirstTime} = useAuthUserContext()

    return (
        <View style={{backgroundColor: 'transparent', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <LinearGradient colors={["#838B95", "#4A4E54"]} style={styles.itemContainer}>
                <View style={{flex: .7, justifyContent: 'center'}}>
                    <Image source={welcomeImage} alt="welcome"/>
                </View>
                <View style={{flex: 1, paddingHorizontal: 5}}>
                    <Text style={{
                        flex: .5,
                        textAlign: 'center',
                        fontFamily: 'Roboto_700Bold',
                        fontSize: textSizeRender(8),
                        color: 'white'
                    }}>
                        Welcome to the
                        cornerstone app</Text>
                    <Text style={{
                        flex: .7,
                        textAlign: 'center',
                        fontFamily: 'Roboto_400Regular',
                        fontSize: textSizeRender(4.5),
                        color: 'white'
                    }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus
                        lobortis diam sed.
                    </Text>
                </View>
                <View style={{flex: .5, width: '90%', alignItems: 'center'}}>
                    <TouchableOpacity
                        onPress={() => {
                            FirstTime()
                            navigation.navigate({name: screens.NEW_ORDER})
                        }}
                        style={{
                            backgroundColor: 'white',
                            width: '100%',
                            alignItems: 'center',
                            padding: 14,
                            borderRadius: 10,
                            marginBottom: 20
                        }}>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: 'Roboto_500Medium',
                            fontSize: textSizeRender(4.5),
                            color: 'black',

                        }}>
                            New order
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        FirstTime()
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: 'Roboto_500Medium',
                            fontSize: textSizeRender(3.5),
                            color: 'white',
                            textDecorationLine: 'underline',

                        }}>
                            Maybe later
                        </Text>
                    </TouchableOpacity>
                </View>

            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        width: SCREEN_WIDTH / 1.2,
        height: SCREEN_WIDTH * 1.3,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#C4C4C4",
        borderRadius: SCREEN_WIDTH * .15,
        padding: 10,
    },
});

export default Welcome;
