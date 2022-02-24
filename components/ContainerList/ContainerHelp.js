import React, {useState} from "react";
import {View, FlatList, Text, TouchableOpacity, StyleSheet} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import { SCREEN_WIDTH, textSizeRender} from "~/utils/utils";

const ContainerHelp = ({data = [], action = null}) => {
    const [activeSections, setActiveSections] = useState([])
    const renderItem = (item, index) => (
        <TouchableOpacity key={index}
                          onPress={() => {
                              setActiveSections(item)
                          }}
                          style={{
                              borderRadius: 10,
                              backgroundColor: activeSections.id === item.id ? "#E6E6E6" : "white",
                              marginVertical: 5,
                              padding: 20
                          }}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <View style={{flex: activeSections.id === item.id ? 1 : .9}}>
                    <Text>{activeSections.id === item.id ? item.content : item.content.substr(0, 100)}</Text>
                </View>
                {
                    activeSections.id !== item.id &&
                    <View style={{flex: .1, justifyContent: 'center'}}>
                        <View>
                            <MaterialIcons name="arrow-right" size={textSizeRender(10)} color="black"/>
                        </View>
                    </View>
                }

            </View>
        </TouchableOpacity>)


    return (
        <View style={{marginBottom: SCREEN_WIDTH / 3.5}}>
            {
                data && data.length > 0 ?
                    data.map((item, index) => renderItem(item, index))
                    :
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={styles.emptyMessageStyle}>Empty notification list
                        </Text>
                    </View>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listStyle: {
        justifyContent: 'center'
    },
    textDate: {
        fontSize: textSizeRender(4),
        fontFamily: 'Roboto_500Medium'
    },
    emptyMessageStyle: {
        textAlign: 'center',
        fontSize: textSizeRender(4),
        fontFamily: 'Roboto_700Bold'
    }

});
export default ContainerHelp;