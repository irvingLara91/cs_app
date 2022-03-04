import React from "react";
import {View, StyleSheet, Text, Dimensions} from "react-native";
import {textSizeRender} from "~/utils/utils";
import {Image} from "native-base";

const CustomerData = ({user=null,props}) => {


    return(<View>
        <View style={styles.container}>
            <Text style={styles.title}>Customer data</Text>
            <View style={{marginTop:10}}>
                <Text style={styles.textTitle}>Name</Text>
                <View style={styles.inputImage}>
                    {user && user.image?
                        <Image
                            alt="User list"
                            size={8} mr={2} resizeMode={"cover"} borderRadius={100}
                            source={{
                                uri: user.image
                            }}/>
                        :
                        <View style={{
                            marginRight: 5,
                            alignItems: "center",
                            backgroundColor: "#C4C4C4",
                            borderRadius: 100,
                            padding:8
                        }}>
                            <Image
                                alt="User list"
                                size={5} resizeMode={"contain"}
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
                    <Text style={styles.text}>{user && user.phone && user.phone}</Text>
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
        borderRadius: Dimensions.get("window").height * .055,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },
    input: {
        height: Dimensions.get("window").height * .055,
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: 10,
        borderRadius: Dimensions.get("window").height * .055,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },
});
export default CustomerData;