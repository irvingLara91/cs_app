import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";
import {TouchableOpacity, StyleSheet, Text, View, Platform} from "react-native";
import {Divider, Image} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import moment from "moment";
import screens from "~/constants/screens";
import {useNavigation} from "@react-navigation/native";
import CustomButton from "~/components/CustomButton/CustomButton";
import React from "react";

const ContainerDashboardOrdersList = ({data = null, ...props}) => {
    const navigation = useNavigation()

    const renderItem = (item, index) => (
        <View key={index} style={styles.containerCard}>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex:0, alignItems:'center', paddingHorizontal:10}}>
                    {
                        item.card ?
                            <Image
                                borderRadius={10}
                                alt="Dashboard admin"
                                size={SCREEN_WIDTH*.25} resizeMode={"cover"}
                                source={{
                                    uri: item.card
                                }}/>
                            :
                            <Image
                                alt="Dashboard admin"
                                size={"xl"} resizeMode={"contain"}
                                source={require("../../assets/image.png")}/>
                    }
                </View>
                <View style={{flex: 1, paddingHorizontal:10}}>
                    <View style={{flexDirection: 'row',flex:.2, alignItems: 'center'}}>
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
                    <View style={{flexDirection: 'row',flex:0, alignItems: 'center'}}>
                        <Text style={{
                            color: 'black', fontSize: textSizeRender(4), fontFamily: 'Roboto_700Bold'
                        }}>Order: <Text
                            style={{color: 'black', fontSize: textSizeRender(4), fontFamily: 'Roboto_700Bold'}}
                        >{item.orderId ? item.orderId : ""}
                        </Text>
                        </Text>
                    </View>
                    <View style={{width:'100%'}}>
                        <CustomButton onPress={() => {navigation.navigate(screens.ASSIGN_ORDER_TO, {order: item})}}
                                      title={"View order"}
                                      heightButton={30}
                                      textColor={"#fff"}
                                      gradient={["#838B95", "#4A4E54"]}
                                      borderRadius={10}/>
                    </View>

                </View>
                </View>
        </View>);


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

    </View>);
};
const styles = StyleSheet.create({
    containerCard: {
        paddingVertical:20,
        marginBottom: 20,
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
        marginLeft: 10, fontSize: textSizeRender(3), fontFamily: 'Roboto_300Light'
    }, emptyMessageStyle: {
        textAlign: 'center', fontSize: textSizeRender(4), fontFamily: 'Roboto_700Bold'
    }

});
export default ContainerDashboardOrdersList;