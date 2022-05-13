import React, {useState,useEffect} from "react";
import {Modal, Platform, StyleSheet, Text, View, TextInput} from "react-native";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";
import CustomButton from "~/components/CustomButton/CustomButton";
import {AntDesign} from "@expo/vector-icons";

const CancelOrderModal = ({ isAdmin  = false, send,orderId,visible, setVisible, ...props}) => {

    const [text,setText] = useState('');
    const [textError,setTextError] = useState(false);

    const textValidate=()=>{
        let error = false;

        if (text.length <= 0){
            setTextError(true)
            error = true
        }
         if (text.length <= 5){
             setTextError(true)
             error = true
         }

         return error;
    }

    const sendCancel =()=>{
        if (textValidate()){
            return
        }

        send(text)
        setText("")
    }


    return (<Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {

            }}
        >
            <View style={{backgroundColor: '#3b3b3b', height: '100%', width: '100%',}}>
                <View
                    style={{
                        top: Platform.OS === 'ios' ? 50 : 30,
                        left: 16,
                        padding: 4,
                        backgroundColor: '',
                        zIndex: 123
                    }}

                >
                    <AntDesign name="close"
                               size={17}
                               onPress={() => {
                                   setVisible(false)
                               }}
                               color={'white'}
                    />

                </View>


                <View style={{marginHorizontal: 16, marginVertical: 8}}>
                    <Text
                        style={{
                            fontSize: 25,
                            textAlign: 'center',
                            marginTop: 50,
                            color: 'white',
                            marginBottom: 6
                        }}>{ isAdmin ?
                        props.status === 7  ? "What is the reason for rejecting the order?": "What is the reason for order cancellation?"
                        :
                        props.status === 3? "What is the reason for rejecting the order?": "What is the reason for order cancellation?"}</Text>

                    <Text style={{
                        color: "white",
                        fontSize: 15,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginTop: 18,
                    }}>{""}</Text>

                </View>


                <View style={{
                    flex:0,
                    height: '50%',
                    backgroundColor: '',
                    marginHorizontal: 16,
                    justifyContent: 'center'
                }}>
                    <TextInput
                        textAlignVertical={'top'}
                        multiline={true}
                        numberOfLines={10}
                        onChangeText={(text) => setText(text)}
                        value={text}
                        style={{
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            width: "100%",
                            height: SCREEN_WIDTH * .4,
                            fontSize: 20,
                            borderColor: "white",
                            borderWidth: 1,
                            backgroundColor: "rgba(255,255,255,1)",
                            borderRadius: 7,
                            color: 'black'
                        }}
                        cna
                        placeholder="Enter the reason..."
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholderTextColor="gray"
                        underlineColorAndroid={'transparent'}
                    />
                    {
                        textError &&
                        <Text style={{
                            marginTop:5,
                            fontSize:textSizeRender(4),
                            color:'#fa0000', fontWeight:'bold'
                        }}>A reason is required</Text>

                    }

                    <View>
                        <CustomButton onPress={() => {
                            sendCancel()
                        }}
                                      title={props.status ===3 ? "Reject": "Cancel"}
                                      textColor={"#fff"}
                                      gradient={["red", "red"]}
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

    },
    textInput: {
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#C4C4C4',
        borderWidth: .5,
        height: 150,
        padding: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0, height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 2.65,
        elevation: 8,
    }
});

export default CancelOrderModal;
