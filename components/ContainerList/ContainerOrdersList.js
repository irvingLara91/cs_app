import {Platform, StyleSheet, Text,Image, TouchableOpacity, View} from "react-native";
import {SCREEN_WIDTH, statusCode, textSizeRender} from "~/utils/utils";
import {AntDesign, Feather} from "@expo/vector-icons";
import moment from "moment";
import {Divider,} from "native-base";
import {useNavigation} from "@react-navigation/native";
import screens from "~/constants/screens";

const ContainerOrdersList = ({data = null, onDelete, ...props}) => {
    const navigation = useNavigation()

    console.log(data)
    const renderItem = (item, index) => (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate(screens.ASSIGN_ORDER_TO, {order: item});
            }}
            key={index} style={styles.containerCard}>
            <View style={{flexDirection: 'row', paddingVertical: 9, paddingHorizontal: 10}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{
                        color: 'black', fontSize: textSizeRender(4), fontFamily: 'Roboto_700Bold'
                    }}>Order: <Text style={{color: 'black', fontSize: textSizeRender(4), fontFamily: 'Roboto_700Bold'}}
                    >{item.orderId ? item.orderId : ""}
                    </Text>
                    </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                    <AntDesign name="calendar" size={textSizeRender(4)} color={"#FF0000"}/>
                    <Text style={styles.textDate}>
                        {
                            item.createdAt ? moment(item.createdAt.seconds * 1000, "", "en").format('MM/DD/YYYY')
                                :
                                item.timestamp ? moment(item.timestamp.seconds * 1000, "", "en").format('MM/DD/YYYY')
                                    :
                                    "No date"
                        }
                    </Text>
                </View>
            </View>
            <Divider bg={"primary_black.900"}/>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20}}>
                <View style={{flex: .8}}>
                    <Text style={{
                        fontFamily: 'Roboto_700Bold',
                        fontSize: textSizeRender(4)
                    }}>{item.client.firstName && item.client.firstName}</Text>
                    <Text style={{
                        fontFamily: 'Roboto_700Bold',
                        fontSize: textSizeRender(4)
                    }}>{item.client.lastName && item.client.lastName}</Text>
                </View>

                <View style={{flex: 1, alignItems: 'center'}}>
                    <View style={{
                        width: '70%',
                        backgroundColor: '#00A811',
                        alignItems: 'center',
                        padding: 5,
                        borderRadius: 5
                    }}>
                        <Text
                            style={{
                                fontFamily: 'Roboto_700Bold',
                                color: 'white', fontSize: textSizeRender(2.6)
                            }}>{statusCode(item.statusCode)}
                        </Text>
                    </View>

                </View>

                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, alignItems: 'center'}}>
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
                            {item?.client?.photoURL?
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
                                        uri: item?.client?.photoURL
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
                    <View style={{flex: 0}}>
                        <TouchableOpacity onPress={() => onDelete(item.orderId)}>
                            <Feather name="trash-2" size={24} color="black"/>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </TouchableOpacity>);

    return (<View>
        <Text style={{
            marginBottom: 15,
            color: 'black', fontSize: textSizeRender(5), fontFamily: 'Roboto_700Bold'
        }}>Latest orders</Text>
        {data && data.length > 0 ? data.map((item, index) => renderItem(item, index)) :
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={styles.emptyMessageStyle}>Empty orders list
                </Text>
            </View>}

    </View>)
};

const styles = StyleSheet.create({
    containerCard: {
        borderColor: "#C4C4C4",
        borderWidth: 1,
        marginBottom: 20,
        height: SCREEN_WIDTH / 3,
        borderRadius: 15,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0, height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    }, textDate: {
        marginLeft: 10, fontSize: textSizeRender(3), fontFamily: 'Roboto_400Regular'
    }, emptyMessageStyle: {
        textAlign: 'center', fontSize: textSizeRender(4), fontFamily: 'Roboto_700Bold'
    }

});
export default ContainerOrdersList;