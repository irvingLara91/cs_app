import React from "react";
import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SCREEN_HEIGHT, textSizeRender} from "~/utils/utils";
import {AntDesign, Feather} from "@expo/vector-icons";

const CustomModal = ({isError = false, message = "Mensaje de hoy", setVisible, visible}) => {


    return (
        <Modal
            animationType={'slide'}
            transparent={true}
            visible={visible}
        >
            <View style={[styles.centeredView, {backgroundColor: 'rgba(0,0,0,0.5)'}]}>
                <View style={styles.modalView}>
                    <View style={{
                        width: '100%',
                        paddingVertical: 30,
                        alignItems: 'center'
                    }}>
                        {
                            isError ?
                                <AntDesign name="closecircleo" size={textSizeRender(25)} color={"#dc0b0b"}/>
                                :
                                <Feather name="check-circle" size={textSizeRender(25)} color={"#068509"}/>
                        }

                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-start'}}>
                        <Text style={[styles.modalTitle, {marginTop: 10}]}>{message}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            setVisible(false)
                        }}
                        style={{
                            flex: 0,
                            marginBottom: 20,
                            marginTop: 20,
                            width: '50%',
                            backgroundColor: "black",
                            alignSelf: 'center',
                            alignItems: 'center',
                            padding: 10,
                            borderRadius: 5
                        }}>

                        <Text style={{color: 'white'}}>Close</Text>

                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

    );
};
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: '90%',
        paddingHorizontal: 10,
        height: SCREEN_HEIGHT / 2.6,
        backgroundColor: "white",
        borderRadius: 20,
        //padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontFamily: 'Roboto_700Bold',
        fontSize: textSizeRender(5),
        color: 'black'

    }
})
export default CustomModal;