import React from "react";
import {View, StyleSheet,Image, Text, Dimensions} from "react-native";
import {textSizeRender} from "~/utils/utils";

const CustomerData = ({user=null,props}) => {


    return(<View>
        <View style={styles.container}>
            <Text style={styles.title}>Customer data</Text>
            <View style={{marginTop:10}}>
                <Text style={styles.textTitle}>Name</Text>
                <View style={styles.inputImage}>
                    {user && user.photoURL?
                        <Image
                            style={{
                                marginRight:10,
                                height:30,
                                width:30,
                            }}
                             resizeMode={"cover"} borderRadius={100}
                            source={{
                                uri: user.photoURL
                            }}/>
                        :
                        <View style={{
                            marginRight: 5,
                            alignSelf: "center",
                            backgroundColor: "#C4C4C4",
                            borderRadius: 50,
                            height:30,
                            width:30,
                            justifyContent: 'center',
                            padding:4
                        }}>
                            <Image
                                style={{
                                    marginRight:10,
                                    height:20,
                                    width:20,
                                }}
                                resizeMode={"cover"} borderRadius={50}
                                source={require("../../assets/image.png")}/>
                        </View>
                    }

                    <Text style={styles.text}>{user && user.firstName && user.firstName} </Text>
                    <Text style={styles.text}>{user && user.lastName && user.lastName}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.textTitle}>Email</Text>
                <View style={styles.input}>
                    <Text style={styles.text}>{user && user.email && user.email}</Text>
                </View>
            </View>

            <View>
                <Text style={styles.textTitle}>Phone Number</Text>
                <View style={styles.input}>
                    <Text style={styles.text}>{user && user.phoneNumber && user.phoneNumber}</Text>
                </View>
            </View>


        </View>
    </View>)
};
const styles=StyleSheet.create({
    container:{
        paddingHorizontal:5,
        marginTop:10,
    },
    title:{
        fontFamily: "Roboto_700Bold",
        fontSize: textSizeRender(5)
    },
    textTitle: {
        paddingHorizontal: 10,
        fontSize: textSizeRender(4),
        fontFamily: 'Roboto_500Medium'
    },
    text: {
        color: '#797878',
        fontSize: textSizeRender(3.5),
        fontFamily: 'Roboto_400Regular'
    },
    inputImage: {
        flexDirection:'row',
        height: Dimensions.get("window").height * .055,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 10,
        borderColor:"#C4C4C4",
        borderWidth:1,
        borderRadius: Dimensions.get("window").height * .01,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0, height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 3.65,
        elevation: 8,
    },
    input: {
        height: Dimensions.get("window").height * .055,
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: 10,
        borderColor:"#C4C4C4",
        borderWidth:1,
        borderRadius: Dimensions.get("window").height * .01,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0, height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 3.65,
        elevation: 8,
    },
});
export default CustomerData;