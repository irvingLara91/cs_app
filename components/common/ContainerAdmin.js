import React from "react";
import {Dimensions, View, Text} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Center, Divider} from "native-base";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";


const ContainerAdmin = ({title = "", icon = null, actions = null, ...props}) => {

    return (
        <View
            style={{
                flex: 1,
                width: SCREEN_WIDTH
            }}
        >
            <View
                style={{
                    width: "100%",
                    height: Dimensions.get("window").height,
                    zIndex: 20
                }}
            >
                <Center style={{marginTop: 10, paddingHorizontal: SCREEN_WIDTH * .05}}>
                    <View style={{width: '100%', flexDirection: 'row'}}>
                        <View style={{flexDirection: 'row',flex:1}}>
                            <View style={{justifyContent: 'center', marginLeft: 2}}>{icon}
                            </View>
                            <View style={{justifyContent: 'center', marginLeft: 5}}>
                                <Text style={{
                                    width: '100%',
                                    fontFamily: 'Roboto_700Bold',
                                    fontSize: textSizeRender(7)
                                }}>{title}</Text>
                            </View>
                        </View>
                        {
                            actions &&
                            actions
                        }
                    </View>
                    <Divider mb={3} mt={2} bg={"primary_black.900"}/>
                </Center>

                <KeyboardAwareScrollView
                    extraScrollHeight={80}
                    enableOnAndroid={true}
                    keyboardShouldPersistTaps="handled">
                    {props.children}
                </KeyboardAwareScrollView>
            </View>
        </View>
    );
};
export default ContainerAdmin;