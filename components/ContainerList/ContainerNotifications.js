import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import moment from "moment";
import {AntDesign, Feather} from "@expo/vector-icons";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";

const ContainerNotifications = ({data = [], action = null}) => {

    const renderItem = (item, index) => (
        <View key={index} style={{
            shadowColor: "#000",
            shadowOffset: {
                width: 0, height: 4,
            },
            shadowOpacity: 0.30,
            shadowRadius: 4.65,
            elevation: 8,
            borderRadius: 10, backgroundColor: 'white', marginVertical: 5, padding: 20
        }}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: SCREEN_WIDTH * .05}}>
                <AntDesign name="calendar" size={24} color="red"/>
                <Text style={styles.textDate}>{moment(item.date, "", "es").format('DD/MM/YYYY')}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: .9}}>
                    <Text style={styles.textMessage}>{item.message}</Text>
                </View>
                <View style={{flex: .1, alignItems: 'center'}}>
                    <TouchableOpacity onPress={()=>{
                        action(item)
                    }}>
                        <Feather name="trash-2" size={24} color="black"/>
                    </TouchableOpacity>

                </View>
            </View>
        </View>)

    return (
        <View style={{marginBottom:SCREEN_WIDTH/3.5,paddingHorizontal: SCREEN_WIDTH * .05}}>
            {
                data && data.length > 0 ?
                    data.map((item, index) => renderItem(item, index))
                    :
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={styles.emptyMessageStyle}>Empty notification list
                        </Text>
                    </View>
            }

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listStyle: {
        justifyContent: 'center'
    },
    textDate: {
        marginLeft:10,
        fontSize: textSizeRender(3.5),
        fontFamily: 'Roboto_400Regular'
    },
    textMessage: {
        fontSize: textSizeRender(3.8),
        fontFamily: 'Roboto_400Regular'
    },
    emptyMessageStyle: {
        textAlign: 'center',
        fontSize: textSizeRender(4),
        fontFamily: 'Roboto_700Bold'
    }

});
export default ContainerNotifications;