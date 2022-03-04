import React from "react";
import {View, StyleSheet, Text} from "react-native";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";
import moment from "moment";

const OrderInfo = (props) => {

    return (
        <View>
            <Text style={styles.title}>Order Information</Text>
            <View style={styles.card}>
                <View style={{paddingVertical:5}}>
                    <Text style={{fontFamily: "Roboto_500Medium", fontSize: textSizeRender(3.5)}}>Text
                        gravestone</Text>
                </View>
                <View>
                    <Text style={{fontFamily: "Roboto_400Regular", fontSize: textSizeRender(3)}}>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. "}</Text>
                </View>
            </View>
            <View style={styles.card}>
                <View style={{paddingVertical:5}}>
                    <Text style={{fontFamily: "Roboto_500Medium", fontSize: textSizeRender(3.5)}}>
                        Additional Instructions</Text>
                </View>
                <View>
                    <Text style={{fontFamily: "Roboto_400Regular", fontSize: textSizeRender(3)}}>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n" +
                        "In platea duis tellus, eget tellus at. Vestibulum amet, "}</Text>
                </View>
            </View>
        </View>

    )
};
const styles = StyleSheet.create({
    card: {
        paddingHorizontal:20,
        paddingVertical:20,
        flex: 1,
        backgroundColor: 'white',
        borderColor: 'black',
        borderRadius: 10,
        justifyContent: 'center',
        height: "auto",
        borderWidth: 1,
        marginBottom: 15,
    },
    title: {
        marginTop: 10,
        fontFamily: "Roboto_700Bold",
        fontSize: textSizeRender(5),
        marginBottom: 20
    },
});
export default OrderInfo;