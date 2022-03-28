import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {roleType, textSizeRender} from "~/utils/utils";
import moment from "moment";
import {Feather} from "@expo/vector-icons";
import screens from "~/constants/screens";
import {useNavigation} from "@react-navigation/native";
import {rgx} from "~/utils/utils";
import {useConfirmationContext} from "~/context/Confirmation";
import userService from "~/services/user"

const ContainerUsersList = ({data = [], loading = false, action = null,...props}) => {
    const navigation = useNavigation();
    const confirm = useConfirmationContext();
    const handleDelete = (user) => {
        confirm({description: `You are about to delete user: ${user.firstName} ${user.lastName}`, title: "This action can not be undone"})
            .then(async() => {
                const deleteResult = await userService.deleteUser(user.userId)
                if (deleteResult.success) {
                    props.removeUser(user.userId)
                }
            })
            .catch((error) => {
                return console.log(error);
            })
    }

    const renderItem = (item, index) => (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate(screens.UPDATE_USER, {user: item})
            }}
            key={index} style={styles.containerRender}>
            <View style={styles.rowUser}>
                <View style={[styles.containerUser,{flex:1.1}]}>
                    <View style={{flex: 0, alignItems: 'center'}}>
                        <View style={{
                            height:51,
                            width:51,
                            justifyContent:'center',
                            alignItems:'center',
                            borderColor: "#ffffff",
                            borderWidth: 1,
                            borderRadius: 50,
                            backgroundColor: 'white',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0, height: 4,
                            },
                            shadowOpacity: 0.30,
                            shadowRadius: 2.65,
                            elevation: 8,
                        }}>
                            {item.photoURL && rgx.url.test(item.photoURL) ?
                                <Image
                                    style={{
                                        justifyContent:'center',
                                        alignItems:'center',
                                        height:48,
                                        width:48,
                                    }}
                                    resizeMode={"cover"}
                                    borderRadius={100}
                                    source={{
                                        uri: item.photoURL
                                    }}/>
                                :
                                <View style={{
                                    height:51,
                                    width:51,
                                    justifyContent: 'center',
                                    backgroundColor: "#C4C4C4",
                                    borderRadius: 100,
                                    padding: 4
                                }}>
                                    <Image
                                        style={{
                                            justifyContent:'center',
                                            alignSelf:'center',
                                            height:40,
                                            width:40,
                                        }}
                                        resizeMode={"cover"}
                                        borderRadius={100}
                                        source={require("../../assets/image.png")}/>
                                </View>
                            }
                        </View>
                    </View>
                    <Text style={[styles.textName,{flex:1,marginLeft:5}]}>
                        {item.firstName && item.firstName.length > 10 ? item.firstName.substr(0, 8) + "...\n" : item.firstName + "\n"}
                        {item.lastName && item.lastName.length > 10 ? item.lastName.substr(0, 8) + "..." : item.lastName}
                    </Text>
                </View>
                <View style={[styles.containerUser, {justifyContent: "center",flex:.7}]}>
                    <Text style={styles.textDate}>
                        {item.createdAt ?
                            moment(item.createdAt.seconds * 1000, "", "en").format('MM/DD/YYYY')
                            :
                            item.timestamp ? moment(item.timestamp.seconds * 1000, "", "en").format('MM/DD/YYYY')
                            : "    No date    "
                        }
                    </Text>
                </View>
                <View style={[styles.containerUser, {justifyContent: "center",flex:.8}]}>
                    <View style={styles.containerRol}>
                        <Text style={styles.textRol}>
                            {roleType(item.role)}
                        </Text>
                    </View>
                </View>
                <View style={{flex: .5, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={styles.textName}>
                            {item.orders && item.orders.length}
                        </Text>
                    </View>
                    <View style={{flex: 0, alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => {
                            if (item.userId){
                                handleDelete(item)
                            }
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
        margin: 1,
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
        paddingVertical: 20,
        paddingHorizontal: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0, height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    containerRol: {
        width: '90%',
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#F04747'
    },
    textRol: {
        color: 'white',
        fontSize: textSizeRender(2.5),
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