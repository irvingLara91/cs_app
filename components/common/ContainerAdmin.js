import React, {useState} from "react";
import {Dimensions, View, Text, ScrollView, RefreshControl} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Center, Divider} from "native-base";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";


const ContainerAdmin = ({backgroundColor="#F4F4F4",isList = false, callApi, title = "", icon = null, actions = null,componentTitle=null, ...props}) => {
    const [refreshing, setRefreshing] = useState(false)

    const _onRefresh = () => {
        setRefreshing(true)
        try {
            callApi();
        } catch (e) {
        }
        setTimeout(() => {
            setRefreshing(false)
        }, 300);
    }


    return (
        <View
            style={{
                flex: 1,
                width: SCREEN_WIDTH,
                backgroundColor:backgroundColor
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
                        <View style={{flexDirection: 'row', flex: 1}}>
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

                {
                    componentTitle &&
                    componentTitle
                }
                {
                    isList ?
                        <ScrollView
                            style={{flex: 1}}
                            scrollEventThrottle={16}
                            refreshControl={
                                <RefreshControl
                                    tintColor={ 'rgba(0,0,0,.4)'}

                                    refreshing={refreshing}
                                    onRefresh={_onRefresh.bind(this)}
                                />
                            }
                        >
                            {props.children}
                        </ScrollView>
                        :
                        <KeyboardAwareScrollView
                            extraScrollHeight={80}
                            enableOnAndroid={true}
                            keyboardShouldPersistTaps="handled">

                            {props.children}
                        </KeyboardAwareScrollView>
                }


            </View>
        </View>
    );
};
export default ContainerAdmin;