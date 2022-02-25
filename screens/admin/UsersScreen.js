import React from "react";
import {TouchableOpacity, View} from "react-native";
import {Text} from "native-base";
import ContainerAdmin from "~/components/common/ContainerAdmin";
import {Feather, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {textSizeRender} from "~/utils/utils";

const UsersScreen = (props) => {
    const actions = (<View style={{flex: 1, alignItems: 'flex-end'}}>
        <View style={{flexDirection: 'row', width: "100%", justifyContent: 'flex-end'}}>
            <TouchableOpacity style={{
                width: "45%",
                flexDirection: 'row',
                marginRight: 2,
                alignItems: 'center',
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 10
            }}>
                <View style={{flex: 1}}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: "Roboto_700Bold", fontSize: textSizeRender(2.5), color: 'black'
                    }}>Create user</Text>
                </View>

            </TouchableOpacity>
        </View>
    </View>)
    return (
        <ContainerAdmin title={"Users"}
                        icon={<Feather name="users" size={30} color={"black"}/>}
                        actions={actions}>


        </ContainerAdmin>
    )
}
export default UsersScreen;
