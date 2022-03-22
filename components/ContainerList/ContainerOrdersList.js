import {Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SCREEN_WIDTH, statusCode, textSizeRender} from "~/utils/utils";
import {AntDesign, Feather} from "@expo/vector-icons";
import moment from "moment";
import {Divider, Image} from "native-base";
import {useNavigation} from "@react-navigation/native";
import screens from "~/constants/screens";

const ContainerOrdersList = ({data = null, onDelete, ...props}) => {
    const navigation = useNavigation()
    const renderItem = (item, index) => (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate(screens.ASSIGN_ORDER_TO,{order:item});
            }}
            key={index} style={styles.containerCard}>
            <View style={{flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 10}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{
                        color: 'black', fontSize: textSizeRender(4), fontFamily: 'Roboto_400Regular'
                    }}>No.<Text style={{color: 'black', fontSize: textSizeRender(4), fontFamily: 'Roboto_700Bold'}}
                    >{item.orderId ? item.orderId : ""}
                    </Text>
                    </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <AntDesign name="calendar" size={24} color="black"/>

                    <Text style={styles.textDate}>
                        {
                            item.timestamp ? moment(item.timestamp.seconds * 1000, "", "en").format('MM/DD/YYYY')
                                :
                                "No date"
                        }
                    </Text>
                </View>
            </View>
            <Divider/>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20}}>
                <View style={{flex: .8}}>
                    <Text style={{fontSize: textSizeRender(4)}}>{item.client.firstName && item.client.firstName}</Text>
                    <Text style={{fontSize: textSizeRender(4)}}>{item.client.lastName && item.client.lastName}</Text>
                </View>

                <View style={{flex: 1, alignItems: 'center'}}>
                    <View style={{
                        width: '70%',
                        backgroundColor: 'black',
                        alignItems: 'center',
                        padding: 5,
                        borderRadius: 10
                    }}>
                        <Text
                            style={{color: 'white', fontSize: textSizeRender(2.6)}}>{statusCode(item.statusCode)}</Text>
                    </View>

                </View>

                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        {item.card ?
                            <Image
                                alt="Order list"
                                size={10} resizeMode={"cover"}
                                borderRadius={100}
                                source={{
                                    uri: item.card
                                }}/>
                            :
                            <View style={{
                                width: 38,
                                justifyContent: 'center',
                                backgroundColor: "#C4C4C4",
                                borderRadius: 100,
                                padding: 4
                            }}>
                                <Image
                                    alt="Order list"
                                    size={8} resizeMode={"contain"}
                                    source={require("../../assets/image.png")}/>
                            </View>
                        }
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
        marginBottom: 20,
        height: SCREEN_WIDTH / (Platform.OS === "ios" ? 3 : 3.5),
        borderRadius: 5,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0, height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    }, textDate: {
        marginLeft: 10, fontSize: textSizeRender(3.5), fontFamily: 'Roboto_400Regular'
    }, emptyMessageStyle: {
        textAlign: 'center', fontSize: textSizeRender(4), fontFamily: 'Roboto_700Bold'
    }

});
export default ContainerOrdersList;