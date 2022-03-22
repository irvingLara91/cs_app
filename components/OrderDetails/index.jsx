import React, {useEffect, useState} from "react";
import {View, StyleSheet, Image} from "react-native";
import {Stack, Center, Divider, Text, Box, Heading, Flex, ScrollView} from "native-base";
import Status from "./Status";
import ordersService from "~/services/orders";
import moment from "moment";
import {LinearGradient} from "expo-linear-gradient";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";

const OrderDetails = ({route}) => {

    const [details, setDetails] = useState({});

    useEffect(async () => {
        const getOrderDetails = async () => {
            const result = await ordersService.getOrder(route.params.orderId);
            setDetails(result.message);
        };
        await getOrderDetails();
    }, []);

    return (
        <ScrollView style={{backgroundColor: "white"}}>
            <Stack p="5">
                <LinearGradient colors={["#555555", "#171717"]} style={{padding: 10, borderRadius: 10}}>
                    <Center>
                        <Text color={"white"} fontFamily={"Roboto_500Medium"}
                              fontSize={textSizeRender(4.5)}>Order:</Text>
                        <Text color={"white"} fontFamily={"Roboto_700Bold"}
                              fontSize={textSizeRender(6.5)}>{route.params.orderId}</Text>
                        <Text color={"white"} fontFamily={"Roboto_400Regular"}
                              fontSize={textSizeRender(4)}>{moment(details?.createdAt?.seconds * 1000, "", "en").format('MM-DD-YYYY')}</Text>
                    </Center>
                </LinearGradient>
                <Divider mt={5}/>
                <Flex direction="column">
                    <Heading mt="5" fontSize={textSizeRender(6.5)} fontFamily={"Roboto_700Bold"} mb="5">Order
                        Specifications</Heading>

                    <View style={styles.cardImage}>
                        <View style={{flex: 1}}>
                            <Text fontSize={textSizeRender(4)} fontFamily="Roboto_700Bold">Gravestone Picture</Text>
                        </View>

                        <View style={{flex: 0}}>
                            <Image
                                style={{
                                    height: SCREEN_WIDTH * .28,
                                    width: SCREEN_WIDTH * .4,
                                    borderRadius: SCREEN_WIDTH * .03,
                                    resizeMode: "cover"
                                }}
                                source={{uri: details?.gravestone?.image}}/>
                        </View>
                    </View>

                    <View style={styles.CardInfo}>
                        <View style={{
                            width: '100%',
                            marginTop: 10
                        }}>
                            <Text fontSize={textSizeRender(4.2)} fontFamily="Roboto_700Bold">Gravestone text</Text>
                            <Text
                                fontSize={textSizeRender(3.2)}
                                fontFamily={"Roboto_400Regular"}>{details?.gravestone?.text}</Text>
                        </View>
                        <View style={{
                            width: '100%',
                            marginTop: 10
                        }}>
                            <Text fontSize={textSizeRender(4.2)} fontFamily="Roboto_700Bold">Additional
                                instructions</Text>
                            <Text
                                fontSize={textSizeRender(3.2)}
                                fontFamily={"Roboto_400Regular"}>{details?.gravestone?.additionalInformation}</Text>
                        </View>

                        <View style={{
                            width: '100%',
                            marginTop: 10,
                        }}>
                            <Text fontSize={textSizeRender(4.2)} fontFamily="Roboto_700Bold">Gravestone address</Text>
                            <Text
                                fontSize={textSizeRender(3.2)}
                                fontFamily={"Roboto_400Regular"}>{
                                details && details.gravestone &&  details.gravestone.address &&
                                `${details?.gravestone?.address.address}${details?.gravestone?.address.address2 ? details?.gravestone?.address.address2 : ""}, ${details?.gravestone?.address.city}, ${details?.gravestone?.address.zipCode}`
                            }</Text>
                        </View>
                    </View>
                </Flex>
                <View style={{
                    width: '100%',
                    marginTop: SCREEN_WIDTH * .001,
                    marginBottom:50
                }}>

                    <Status code={details?.statusCode}/>
                </View>

            </Stack>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    cardImage: {
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderColor: "#C4C4C4",
        borderWidth: 1,
        justifyContent: 'space-between',
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: {
            width: 0, height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        borderRadius: 10,
        backgroundColor: 'white',
        marginVertical: 5
    },
    CardInfo: {
        marginTop: SCREEN_WIDTH * .04,
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderColor: "#C4C4C4",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0, height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        borderRadius: 10,
        backgroundColor: 'white',
        marginVertical: 5
    }
})

export default OrderDetails;