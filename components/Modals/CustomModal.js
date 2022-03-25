import React from "react";
import {Modal, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SCREEN_HEIGHT, textSizeRender} from "~/utils/utils";
import {AntDesign, Feather} from "@expo/vector-icons";
import CustomButton from "~/components/CustomButton/CustomButton";

const CustomModal = ({isError = false, message = "Mensaje de hoy", setVisible, visible}) => {


    return (
        <Modal
            animationType={'slide'}
            transparent={true}
            visible={visible}
        >
            <View style={[styles.centeredView, {backgroundColor: 'rgba(0,0,0,0.5)'}]}>
                <View style={styles.modalView}>
                    <View style={{flex:1,
                        paddingHorizontal: 20
                    }}>
                        <View style={{
                            flex: 0,
                            width: '100%',
                            paddingTop: 25,
                            alignItems: 'center'
                        }}>
                            {
                                isError ?
                                    <AntDesign name="closecircleo" size={textSizeRender(20)} color={"#dc0b0b"}/>
                                    :
                                    <Feather name="check-circle" size={textSizeRender(20)} color={"#068509"}/>
                            }

                        </View>
                        <View style={{flex: 1,
                            height:'100%',
                            alignItems:'center',
                            justifyContent: 'center'}}>
                            <Text style={[styles.modalTitle, {marginTop: 10}]}>{message}

                            </Text>
                        </View>
                    </View>




                    <View
                        style={{
                            flex: 0,
                            padding: 20,
                        }}>
                        <CustomButton onPress={() => {
                            setVisible(false)
                        }}
                                      title={"Close"}
                                      textColor={"#fff"}
                                      gradient={["#555555", "#171717"]}
                                      borderRadius={10}/>

                    </View>
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
        height: SCREEN_HEIGHT / (Platform.OS==="ios" ? 2.5:2.5),
        backgroundColor: "white",
        borderRadius: 20,
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
        fontSize: textSizeRender(4.5),
        color: 'black'

    }
})
export default CustomModal;