import React from 'react';
import {View, Dimensions, Modal,Text,ActivityIndicator} from 'react-native';

const {height, width} = Dimensions.get('window');

const Loading = ({loading, text= 'Por favor espere un momento...',color}) => {
    return (
        loading &&
        <Modal
            animationType="slide"
            transparent={true}
            visible={loading}
        >
            <View style={{
                flex: 1,
            }}>
                <View style={{
                    flex:1,
                    backgroundColor: "rgba(1,1,1,0.7)",
                    alignItems: "center",
                    justifyContent:'center'
                }}>
                    <ActivityIndicator style={{width: 100, height: 100, zIndex: 1}} size="large" color={color}/>
                        {
                        text !== ''&&
                        <Text style={{
                            marginTop:10,color:'white', textAlign:'center', width:'70%',
                            fontSize: 20
                        }}>{text}</Text>
                    }
                </View>
            </View>
        </Modal>
    )
}
export default Loading;
