import React, {useEffect, useState} from "react";
import {View, StyleSheet, Image} from "react-native";
import {Stack, Center, Divider, Text, Box, Heading, Flex, ScrollView} from "native-base";
import Status from "./Status";
import moment from "moment";
import {LinearGradient} from "expo-linear-gradient";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";
import ApiApp from "~/api/ApiApp";
import CancelOrderModal from "~/components/Modals/CancelOrderModal";
import CustomButton from "~/components/CustomButton/CustomButton";
import Loading from "~/components/Loading/Loading";
import CustomModal from "~/components/Modals/CustomModal";

const MessageCancel =(props)=>{

    return(
        <View
            style={{
                marginTop: SCREEN_WIDTH * .04,
                alignItems: "center",
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
            }}
        >
            <View style={{width: '100%', alignItems: 'center'}}>
                <Text style={{
                    paddingTop: SCREEN_WIDTH * .03,
                    marginBottom: 0,
                    textAlign: 'center',
                    fontFamily: "Roboto_700Bold", fontSize: SCREEN_WIDTH * .06
                }}>
                    {
                        props.status.code === 7 ? "Reason for rejection" : "Reason for cancellation"
                    }
                </Text>
                <Divider mt="2"/>
            </View>

            <Text style={{
                paddingVertical: textSizeRender(6),
                textAlign: 'center',
                fontFamily: "Roboto_400Regular", fontSize: textSizeRender(4)
            }}>
                {
                    props.status.message
                }
            </Text>
        </View>
    )
}
const OrderDetails = ({route}) => {

    const [details, setDetails] = useState({});
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    /***
     * States de CustomModal
     * **/
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("")
    const [isError, setIsError] = useState(false)

    const [status, setStatus] = useState(null);

    useEffect(() => {
        setStatus(details?.status ? details.status : details.statusCode)
    }, [details])

    /***
     * End States de CustomModal
     * **/

    useEffect(async () => {
        const getOrderDetails = async () => {
            const result = await ApiApp.getOrder(route.params.orderId);
            if (result.data.success) {
                setDetails(result.data.data)
            }
        };
        await getOrderDetails();
    }, []);


    const sendOrderCancellation = (text) => {
        setVisible(false);
        setLoading(true)
        let params = {status:
        {
            "code": status.code === 3 ? 7 : 0,
            "message": text
        }}
        ApiApp.cancelOrder(route.params.orderId, params).then(result => {

            if (result.data.success) {
                setTimeout(() => {
                    setStatus(params.status)
                    setLoading(false)
                    setMessage(status.code === 3 ? "Request successfully rejected": "Order successfully canceled")
                    setModalVisible(true)
                    setIsError(false)
                }, 1000);
            } else {
                setTimeout(() => {
                    setLoading(false)
                    setMessage(result.data.message)
                    setModalVisible(true)
                    setIsError(true)
                }, 1000);
            }
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        }).catch(e => {
            console.log(e)
            setTimeout(() => {
                setLoading(false)
            }, 1000);

            setTimeout(() => {
                setLoading(false)
                setMessage("An error has occurred, please try again later.")
                setModalVisible(true)
                setIsError(true)
            }, 1000);


        });
    }

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
                              fontSize={textSizeRender(4)}>{moment(details?.createdAt, "", "en").format('MM-DD-YYYY')}</Text>
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
                                details && details.gravestone && details.gravestone.address &&
                                `${details?.gravestone?.address.address.trim() ? details.gravestone.address.address + "," : ""}${details?.gravestone?.address.address2 ? details?.gravestone?.address.address2 + ", " : ""}${details?.gravestone?.address.city}, ${details?.gravestone?.address.zipCode}`
                            }</Text>
                        </View>
                    </View>
                </Flex>
                <View style={{
                    width: '100%',
                    marginTop: SCREEN_WIDTH * .001,
                    marginBottom: 50
                }}>
                    <Status code={status?.code}/>

                    {
                        status &&
                            status.code === 0 &&
                            <MessageCancel status={status}/>
                    }

                    {
                        status &&
                        status.code === 7 &&
                        <MessageCancel status={status}/>
                    }
                </View>


                <View style={{
                    width: '100%',
                    marginTop: SCREEN_WIDTH * .001,
                    marginBottom: 50
                }}>

                    {
                        status ?
                            status?.code !== 0 &&
                            status?.code !== 7 &&
                            <CustomButton onPress={() => {
                                setVisible(true)
                            }}
                                          title={status?.code === 3 ? 'Reject order' : 'Cancel order'}
                                          textColor={"#fff"}
                                          gradient={["red", "red"]}
                                          borderRadius={10}/>

                            :
                            null
                    }

                </View>


                <CancelOrderModal
                    status={status?.code}
                    orderId={route.params.orderId}
                    send={sendOrderCancellation}
                    visible={visible} setVisible={(v) => {
                    setVisible(v)
                }}/>

            </Stack>

            {
                modalVisible &&
                <CustomModal message={message} visible={modalVisible} setVisible={setModalVisible} isError={isError}/>

            }
            {
                loading &&
                <Loading loading={loading} color={"white"} text={"Loading..."}/>
            }


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
