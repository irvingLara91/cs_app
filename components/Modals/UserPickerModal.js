import React, {useEffect, useState} from "react";
import {View, Modal, Text,Image, StyleSheet, TouchableOpacity} from "react-native";
import {SCREEN_HEIGHT, SCREEN_WIDTH, textSizeRender} from "~/utils/utils";
import {AntDesign} from "@expo/vector-icons";
import { ScrollView} from "native-base";

const UserPickerModal = ({
                             visible,
                             selected,
                             assigned,
                             setVisible,
                             setSelected,
                             title = '',
                             options,
                         }) => {
    const [valSelect, setValSelect] = useState(false)

    const [assigned_, setAssigned_] = useState(null)
    useEffect(()=>{
        if (assigned && !selected){
            setAssigned_(assigned)
            setSelected(assigned)
        }else if (selected) {
            setAssigned_(selected)
        }else {
            setAssigned_(null)
        }
    },[assigned, selected])

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
                        alignContent: 'center',
                        borderRadius: 20,
                        alignItems: 'flex-end',
                    }}>
                        <TouchableOpacity
                            style={{
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                                width: '50%',
                                height: 40,
                                paddingRight: 10,

                            }}

                            onPress={() => {
                                setVisible(false)
                            }
                            }>
                            <AntDesign name="close" size={24} color="black"/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 0}}>
                        <Text style={[styles.modalTitle, {marginTop: 10}]}>{title}</Text>
                    </View>

                    <View style={{flex: 1}}>
                        <ScrollView>
                            {
                                options.map((opt, index) => {
                                    return (
                                        <View key={index}>
                                            <TouchableOpacity style={{padding: 5}}
                                            onPress={()=>{
                                                setSelected(opt)
                                                setValSelect(false)
                                            }}
                                            >
                                                <View style={{
                                                    flexDirection: 'row', alignItems: 'center',
                                                    borderWidth: 1, borderColor: assigned_  ?  assigned_.userId === opt.userId ? "red": 'black': 'black' , borderRadius: 10,
                                                    padding: 10,
                                                }}>
                                                    <View style={{flex:0}}>
                                                        { opt && opt.photoURL.trim() ?
                                                            <Image
                                                                style={{
                                                                    height:SCREEN_WIDTH *.15,
                                                                    width:SCREEN_WIDTH *.15
                                                                }}
                                                                borderRadius={100}
                                                                 resizeMode={"cover"}
                                                                source={{
                                                                    uri: opt.photoURL
                                                                }}/>
                                                            :
                                                            <Image
                                                                style={{
                                                                    height:SCREEN_WIDTH *.15,
                                                                    width:SCREEN_WIDTH *.15
                                                                }}
                                                                borderRadius={100}
                                                                resizeMode={"cover"}
                                                                source={require("../../assets/image.png")}/>
                                                        }
                                                    </View>
                                                    <View style={{flex:1,flexDirection:'row',paddingLeft:10}}>
                                                    <Text style={{fontFamily:"Roboto_500Medium",fontSize: textSizeRender(3)}}> {opt.firstName} </Text>
                                                    <Text style={{fontFamily:"Roboto_500Medium",fontSize: textSizeRender(3)}}>{opt.lastName}</Text>
                                                    </View>
                                                    {
                                                        assigned_  ?  assigned_.userId === opt.userId ?
                                                            <View style={{flex:.4,alignItems: 'flex-end'}}>
                                                                <AntDesign name="check" size={24} color="black" />
                                                            </View>
                                                            :
                                                            null
                                                            :
                                                            null
                                                    }
                                                </View>
                                            </TouchableOpacity>

                                        </View>
                                    )
                                })
                            }
                        </ScrollView>

                    </View>
                    {
                        valSelect === false ?
                            null
                            :
                            <View style={{alignItems: 'center'}}>
                                <Text style={{color: 'red'}}>Select a user </Text>
                            </View>
                    }

                    <TouchableOpacity
                        onPress={() => {
                            if (selected !== null) {
                                setValSelect(false)
                                setVisible(false)
                            } else {
                                setValSelect(true)
                            }
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

                        <Text style={{color: 'white'}}>Accept</Text>

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
        height: SCREEN_HEIGHT / 1.5,
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
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 10,
        //padding: 10,
        //elevation: 2
    },
    textStyle: {
        fontSize: 12,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        //fontFamily: 'LinotteLight',
        //color: Colors.purple

    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontFamily: 'Roboto_700Bold',
        fontSize: 20,
        color: 'black'

    }
});
export default UserPickerModal;
