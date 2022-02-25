import React from "react";
import {View, TouchableOpacity, Text} from "react-native";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import ContainerAdmin from "~/components/common/ContainerAdmin";
import {textSizeRender} from "~/utils/utils";

const OrdersScreen = (props) => {

    const actions = (<View style={{flex: 1, alignItems: 'flex-end'}}>
        <View style={{flexDirection: 'row', width: "100%", justifyContent: 'flex-end'}}>
            <TouchableOpacity style={{
                width: "40%",
                flexDirection: 'row',
                marginRight: 2,
                alignItems: 'center',
                backgroundColor: 'gray',
                padding: 10,
                borderRadius: 10
            }}>
                <View style={{flex: 1}}>
                    <Text style={{fontSize: textSizeRender(2.5), color: 'white'}}>Short</Text>
                </View>
                <View style={{flex: 0}}>
                    <MaterialIcons name="arrow-right" size={textSizeRender(4)} color="white"/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={{
                width: "40%",
                flexDirection: 'row',
                marginLeft: 2,
                alignItems: 'center',
                backgroundColor: 'gray',
                padding: 10,
                borderRadius: 10
            }}>
                <View style={{flex: 1}}>
                    <Text style={{fontSize: textSizeRender(2.5), color: 'white'}}>Status</Text>
                </View>
                <View style={{flex: 0}}>
                    <MaterialIcons name="arrow-right" size={textSizeRender(4)} color="white"/>
                </View>
            </TouchableOpacity>
        </View>
    </View>)

    return (
        <ContainerAdmin title={"Orders"}
                        icon={<MaterialCommunityIcons name="clipboard-text-multiple" size={30} color={"black"}/>}
                        actions={actions}>


        </ContainerAdmin>
    )
}
export default OrdersScreen;
