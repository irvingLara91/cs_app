import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";
import {TouchableOpacity, StyleSheet, Text, View, Platform} from "react-native";
import {Divider, Image} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import moment from "moment";

const ContainerOrdersList = ({data = null, ...props}) => {
    const renderItem = (item, index) => (<View key={index} style={styles.containerCard}>
        <View style={{flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 10}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{
                    color: 'black', fontSize: textSizeRender(4), fontFamily: 'Roboto_400Regular'
                }}>No.<Text style={{color: 'black', fontSize: textSizeRender(4), fontFamily: 'Roboto_700Bold'}}
                >{item.numberOrder ? item.numberOrder : ""}
                </Text>
                </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign name="calendar" size={24} color="black"/>
                <Text style={styles.textDate}>{moment(item.date, "", "es").format('DD/MM/YYYY')}</Text>
            </View>
        </View>
        <Divider/>
        <View style={{alignItems: 'center'}}>
            {
                !item.img ?
                    <Image
                        size={100} resizeMode={"contain"}
                        source={{
                            uri: item.img
                        }}/>
                    :
                    <Image
                        size={100} resizeMode={"contain"}
                        source={require("../../assets/image.png")}/>
            }

            <TouchableOpacity>
                <Text style={{
                    textDecorationLine: 'underline'
                }}>View order</Text>
            </TouchableOpacity>


        </View>
    </View>);


    return (<View>
        <Text style={{
            marginBottom: 15,
            color: 'black', fontSize: textSizeRender(5), fontFamily: 'Roboto_700Bold'
        }}>Latest orders</Text>
        {data && data.length > 0 ? data.map((item, index) => renderItem(item, index)) :
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={styles.emptyMessageStyle}>Empty notification list
                </Text>
            </View>}

    </View>);
};
const styles = StyleSheet.create({
    containerCard: {
        marginBottom: 20,
        height: SCREEN_WIDTH / (Platform.OS == "ios" ? 2 : 2.5),
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