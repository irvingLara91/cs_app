import React from "react";
import {TouchableOpacity,View, StyleSheet} from "react-native";
import {Image, Box, Text} from "native-base";
import {useNavigation} from "@react-navigation/native";

import screens from "~/constants/screens";
import {SCREEN_WIDTH, statusCode, textSizeRender} from "~/utils/utils";
import moment from "moment";
import {MaterialIcons} from "@expo/vector-icons";


const styles = StyleSheet.create({
    orderContainer: {
        borderWidth:1,
        marginBottom:15,
        padding:8,
        borderRadius:10,
        borderColor:"#C4C4C4",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0, height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
});

const Order = ({status, orderId, card, ...props}) => {
    const navigation = useNavigation();
    const {navigate} = navigation;
    return (
        <TouchableOpacity
            style={styles.orderContainer}
            onPress={() => navigate({name: screens.ORDER_DETAILS, params: {orderId}})}>
                <Image
                    flex={0}
                    size={SCREEN_WIDTH*.15} source={{uri: card}}  borderRadius={10} alt="order thumbnail"/>
                <View style={{flex:1.5,marginLeft:8}}>
                    <Text fontSize={textSizeRender(3.2)} fontFamily={"Roboto_700Bold"}>Order: {orderId}</Text>
                    <Text fontSize={textSizeRender(3.2)} fontFamily={"Roboto_400Regular"}>
                        {
                            props.createdAt ? moment(props.createdAt.seconds * 1000, "", "en").format('MM/DD/YYYY')
                                :

                                props.timestamp ? moment(props.timestamp.seconds * 1000, "", "en").format('MM/DD/YYYY')
                                    :
                                    "No date"
                        }
                    </Text>
                </View>
                <View style={{
                    flex:1,
                    width:SCREEN_WIDTH*.2,backgroundColor: 'black',padding: 5,borderRadius: 20}}>
                    <Text fontSize={12} color="white" textAlign="center">{statusCode(props.statusCode)}</Text>
                </View>
            <View style={{
                justifyContent: "center",
                alignItems: "center",
                flex:.3}}>
                <MaterialIcons name="arrow-forward-ios" size={24} color="black" />

            </View>
        </TouchableOpacity>
    );
};

export default Order;