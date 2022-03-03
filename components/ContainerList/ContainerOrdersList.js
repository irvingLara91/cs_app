import {Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";
import {AntDesign, Feather} from "@expo/vector-icons";
import moment from "moment";
import {Divider, Image} from "native-base";

const ContainerOrdersList = ({data = null, ...props}) => {
    const renderItem = (item, index) => (
        <TouchableOpacity
            onPress={()=>{
                alert("Detail")
            }}
            key={index} style={styles.containerCard}>
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
        <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20}}>
            <View style={{flex: .8}}>
                <Text style={{fontSize: textSizeRender(4)}}>{item.firstName && item.firstName}</Text>
                <Text style={{fontSize: textSizeRender(4)}}>{item.lastName && item.lastName}</Text>
            </View>

            <View style={{flex: 1, alignItems: 'center'}}>
                <View style={{
                    width: '60%',
                    backgroundColor: 'black',
                    alignItems: 'center',
                    padding: 5,
                    borderRadius: 10
                }}>
                    <Text style={{color: 'white', fontSize: textSizeRender(2.6)}}>{"Assigned"}</Text>
                </View>

            </View>

            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1,alignItems:'center'}}>
                    <View style={{width:50,justifyContent:'center',backgroundColor: "#C4C4C4", borderRadius: 100, padding: 10}}>
                        {item.img ?
                            <Image
                                alt="Order list"
                                size={8} resizeMode={"contain"}
                                source={{
                                    uri: item.img
                                }}/>
                            :
                            <Image
                                alt="Order list"
                                size={8} resizeMode={"contain"}
                                source={require("../../assets/image.png")}/>
                        }
                    </View>
                </View>
                <View style={{flex: 0}}>
                    <TouchableOpacity>
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