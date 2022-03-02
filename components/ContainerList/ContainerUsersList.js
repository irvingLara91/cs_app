import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {roleType, textSizeRender} from "~/utils/utils";
import {Image} from "native-base";
import moment from "moment";
import {Feather} from "@expo/vector-icons";
import screens from "~/constants/screens";
import {useNavigation} from "@react-navigation/native";

const ContainerUsersList = ({data = [], action = null}) => {
    const navigation = useNavigation();

    const renderItem = (item, index) => (
        <TouchableOpacity
            onPress={()=>{
                navigation.navigate(screens.UPDATE_USER)
            }}
            key={index} style={styles.containerRender}>
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
                        {item.firstName &&  item.firstName.length >10 ? item.firstName.substr(0,8) + "...\n" : item.firstName + "\n"}
                        {item.lastName &&  item.lastName.length >10 ? item.lastName.substr(0,8)+ "...": item.lastName}
                    </Text>
                </View>
                <View style={[styles.containerUser,{justifyContent:"center"}]}>
                    <Text style={styles.textDate}>
                        {item.timestamp && moment(item.timestamp, "", "es").format('DD/MM/YYYY')}
                    </Text>
                </View>
                <View style={[styles.containerUser,{justifyContent:"center"}]}>
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


        </TouchableOpacity>
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
        paddingHorizontal:6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0, height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
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