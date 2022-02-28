import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {roleType, textSizeRender} from "~/utils/utils";
import {Image} from "native-base";
import moment from "moment";
import {Feather} from "@expo/vector-icons";

const ContainerUsersList = ({data = [], action = null}) => {


    const renderItem = (item, index) => (
        <View key={index} style={styles.containerRender}>
            <View style={styles.rowUser}>
                <View style={styles.containerUser}>
                    {item.img ?
                        <Image
                            size={8} mr={2} resizeMode={"contain"} borderRadius={100}
                            source={{
                                uri: item.img
                            }}/>
                        :
                        <View style={{
                            marginRight: 5,
                            width: 40,
                            justifyContent: 'center',
                            backgroundColor: "#C4C4C4",
                            borderRadius: 100,
                            padding: 10
                        }}>
                            <Image
                                size={5} resizeMode={"contain"}
                                source={require("../../assets/image.png")}/>
                        </View>
                    }
                    <Text style={styles.textName}>
                        {item.firstName && item.firstName + "\n"}
                        {item.lastName && item.lastName}
                    </Text>
                </View>
                <View style={styles.containerUser}>
                    <Text style={styles.textDate}>
                        {item.timestamp && moment(item.timestamp, "", "es").format('DD/MM/YYYY')}
                    </Text>
                </View>
                <View style={styles.containerUser}>
                    <View style={styles.containerRol}>
                        <Text style={styles.textRol}>
                            {roleType(item.assignedRole)}
                        </Text>
                    </View>

                </View>
                <View style={{flex:1,flexDirection:'row',alignItems: 'center'}}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={styles.textName}>
                            {item.orders}
                        </Text>
                    </View>
                    <View style={{flex: 0, alignItems: 'center'}}>
                        <TouchableOpacity onPress={()=>{
                        }}>
                            <Feather name="trash-2" size={24} color="black"/>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>


        </View>
    );
    return (
        <View>
            {
                data && data.length > 0 ?
                    data.map((item, index) => renderItem(item, index))
                    :
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={styles.emptyMessageStyle}>Empty users list
                        </Text>
                    </View>
            }
        </View>
    )

};
const styles = StyleSheet.create({
    containerUser: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1.5,
        margin:1,
        justifyContent:'center',
    },
    textName: {
        fontSize: textSizeRender(3),
        fontFamily: 'Roboto_700Bold'
    },
    textNumOrders: {
        fontSize: textSizeRender(3),
        fontFamily: 'Roboto_700Bold'
    },
    containerRender: {
        borderRadius: 10,
        backgroundColor: 'white',
        marginVertical: 5,
        paddingVertical:20,
        paddingHorizontal:6
    },
    containerRol: {
        padding: 5,
        borderRadius: 10,
        backgroundColor: 'black'
    },
    textRol: {
        color: 'white',
        fontSize: textSizeRender(3),
        fontFamily: 'Roboto_400Regular'
    },
    rowUser: {
        flexDirection: 'row',
    },
    listStyle: {
        justifyContent: 'center'
    },
    textDate: {
        fontSize: textSizeRender(3),
        fontFamily: 'Roboto_400Regular'
    },
    emptyMessageStyle: {
        textAlign: 'center',
        fontSize: textSizeRender(4),
        fontFamily: 'Roboto_700Bold'
    }

});
export default ContainerUsersList;