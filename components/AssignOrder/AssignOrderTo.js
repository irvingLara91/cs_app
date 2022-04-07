import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";

const AssignOrderTo=({assigned=null,setVisibleUserPicker,selected})=>{

    const [assigned_, setAssigned_] = useState(null)
    useEffect(()=>{
        if (assigned && !selected){
            setAssigned_(assigned)
        }else if (selected) {
            setAssigned_(selected)
        }else {
            setAssigned_(null)
        }
    },[assigned, selected])

    return(
        <View style={styles.card}>
            <View style={{flex: 1}}>
                <Text style={{fontFamily: "Roboto_500Medium", fontSize: textSizeRender(3)}}>
                    Assign order to
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        setVisibleUserPicker(true)
                    }}
                    style={styles.containerText}>
                    <Text style={styles.text}>
                        {assigned_ ? assigned_.firstName +" "+ assigned_.lastName : "Not assigned"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    card: {
        flex: 1, backgroundColor: 'white',
        borderColor: '#BFBFBF',
        borderRadius: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        height: SCREEN_WIDTH / 5,
        flexDirection: 'row',
        borderWidth: 1,
        marginBottom: 10,
    },
    containerText:{
        marginTop: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        borderColor: '#DBDBDB',
        borderWidth: 1,
        height: 40,
        justifyContent: 'center'
    },
    text:{
        paddingLeft: 10,
        backgroundColor: '#EEEEEE',
        width: '50%',
        marginVertical: 0,
        padding: 5,
        color: "#544E4E",
        fontFamily: "Roboto_400Regular",
        fontSize: textSizeRender(3.2)
    },
});
export default AssignOrderTo;