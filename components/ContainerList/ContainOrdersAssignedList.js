import React, {useState} from "react";
import {Platform, StyleSheet, TouchableOpacity, View} from "react-native";
import {Text} from "native-base";
import {SCREEN_WIDTH, statusCode, textSizeRender} from "~/utils/utils";
import {AntDesign, Feather} from "@expo/vector-icons";
import moment from "moment";

const TitleComponent = (props) => {
    return (
        <View style={{
            flexDirection: "row", flex: 1,
            backgroundColor: '#EAEAEA',
            padding: 15,
            borderRadius: 5
        }}>
            <View style={{flex: 1}}>
                <Text style={styles.titleComponent}>#Order</Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={styles.titleComponent}>Date</Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={styles.titleComponent}> status</Text>
            </View>
        </View>
    )
}


const array = [{id: 1, numberOrder: "1223", date: new Date(), status: 5}];
const ContainOrdersAssignedList = ({data = null, orders = [], ...props}) => {
    const [user, setUser] = useState(data)


    const renderItem = (item, index) => (<View key={index} style={styles.containerCard}>
            <View style={{flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 10}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={styles.textOrder}>No. <Text
                        style={styles.textNumber}
                    >{item.orderId ? item.orderId : ""}
                    </Text>
                    </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <AntDesign name="calendar" size={textSizeRender(4)} color="black"/>
                    <Text style={styles.textDate}>{moment(item.date, "", "es").format('DD/MM/YYYY')}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, paddingHorizontal: 10}}>
                        <View style={{backgroundColor: 'black', borderRadius: 10, alignItems: 'center'}}>
                            <Text style={styles.textStatus}>{statusCode(item.statusCode)}</Text>
                        </View>

                    </View>
                    <TouchableOpacity>
                        <Feather name="trash-2" size={textSizeRender(5)} color="black"/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )


    return (
        <View style={{flex: 1}}>
            <View>
                <View style={{flex: 1, marginBottom: 10}}>
                    <Text style={styles.title}>Orders assigned</Text>
                </View>
                <TitleComponent/>
            </View>
            <View>
                {
                    orders && orders.length > 0 ?
                        orders.map((item, index) => renderItem(item, index))
                        :
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Text style={styles.emptyMessageStyle}>
                                Empty list
                            </Text>
                        </View>
                }
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    containerCard: {
        marginTop: 5,
        marginBottom: 10,
        justifyContent: 'center',
        height: SCREEN_WIDTH / (Platform.OS === "ios" ? 6 : 6),
        borderRadius: 5,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0, height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    title: {
        fontSize: textSizeRender(5),
        fontFamily: "Roboto_700Bold"
    },
    textOrder: {
        color: 'black',
        fontSize: textSizeRender(3),
        fontFamily: 'Roboto_400Regular'
    },

    textNumber: {
        color: 'black',
        fontSize: textSizeRender(3),
        fontFamily: 'Roboto_700Bold'
    },

    textStatus: {
        color: 'white',
        fontSize: textSizeRender(3),
        fontFamily: 'Roboto_400Regular'
    }
    , textDate: {
        marginLeft: 10,
        fontSize: textSizeRender(3),
        fontFamily: 'Roboto_400Regular'
    },
    titleComponent: {
        fontSize: textSizeRender(3),
        fontFamily: "Roboto_700Bold"
    },
    emptyMessageStyle: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: textSizeRender(4),
        fontFamily: 'Roboto_700Bold'
    }

});
export default ContainOrdersAssignedList;