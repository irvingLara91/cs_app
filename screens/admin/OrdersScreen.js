import React, {useCallback, useState, useEffect} from "react";
import {View, TouchableOpacity, Text, TextInput} from "react-native";
import {FontAwesome, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import ContainerAdmin from "~/components/common/ContainerAdmin";
import {SCREEN_WIDTH, statusCode, textSizeRender} from "~/utils/utils";
import OrdersAdmin from "~/components/OrdersAdmin/OrdersAdmin";
import _ from "lodash";
import {useAuthUserContext} from "~/context/authUser";
import TotalOrdersComponent from "~/components/TotalOrdersComponent/TotalOrdersComponent";
import {LinearGradient} from "expo-linear-gradient";
import {useIsFocused} from "@react-navigation/native";
import ApiApp from "~/api/ApiApp";
import ChangeStatusComponent from "~/components/ChangeStatusComponent";

const options = [
    {id: 0, name: "Cancelled"},
    {id: 1, name: "Created"},
    {id: 2, name: "In progress"},
    {id: 3, name: "Completed"},
    {id: 4, name: "Finished"},
    {id: 5, name: "Paused"},
    {id: 6, name: "Activated"},
    {id: 7, name: "Rejected"}
];
const OrdersScreen = (props) => {
    const {user} = useAuthUserContext();
    const isFocused = useIsFocused();

    const [orders, setOrders] = useState([])
    const [ordersOrigin, setOrdersOrigin] = useState([])


    const [openStatus, setOpenStatus] = useState(false);
    const [status, setStatus] = useState(null);

    const onClose = () => {
        setOpenStatus(false)
    };

    const handleStatus = (StatusCode) => {
        onClose();
        setStatus(StatusCode.id)
    }


    const getOrderAxios = () => {
        ApiApp.getOrders().then(response => {
            let result = [];
            if (user.userDoc.role === 2) {
                result = response.data.data
            } else {
                response.data.data.forEach((order) => {
                    const {orderId} = order;
                    if (user.userDoc.orders.includes(orderId)) {
                        result.push(order);
                    }
                });
            }
            setOrders(result)
            setOrdersOrigin(result)

        }).catch(e => {
            console.error("ERROR:::>", e)
        })
    }


    useEffect(async () => {
        if (isFocused) {
            await getOrderAxios();
        }
    }, [isFocused])

    const [short, setShort] = useState(null)
    const [textSearch, setTextSearch] = useState("")

    const handleChange = async (event) => {
        await setTextSearch(event)
        await debounce(event);
    };

    const debounce = useCallback(
        _.debounce((_searchVal) => {
            filterSearch(_searchVal);
            // send the server request here
        }, 1000),
        []
    );

    const filterSearch = async (text) => {
        try {
            if (text) {

                let results = _.filter(ordersOrigin, function (item) {
                    return (
                        item.client.firstName.toLowerCase().indexOf(text.toLowerCase()) > -1
                    )
                });
                await setOrders(results)
            } else {
                await setOrders(ordersOrigin)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const actions = (<View style={{flex: 1, alignItems: 'flex-end'}}>
        <View style={{flexDirection: 'row', width: "100%", justifyContent: 'flex-end'}}>
            <TouchableOpacity
                onPress={() => {
                }}
                style={{
                    width: "50%",
                    height: SCREEN_WIDTH * .09,
                }}>
                <LinearGradient colors={["#858C93", "#5E6268"]} style={{
                    width: "100%",
                    height: '100%',
                    justifyContent: 'center',
                    marginRight: 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    borderRadius: 17
                }}>
                    <View style={{flex: 1}}>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: "Roboto_700Bold", fontSize: textSizeRender(2.2), color: 'white'
                        }}>Short</Text>
                    </View>
                    <View style={{flex: 0}}>
                        <MaterialIcons name="arrow-right" size={textSizeRender(4)} color="white"/>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    setOpenStatus(true);
                }}
                style={{
                    marginLeft: 4,
                    width: "50%",
                    height: SCREEN_WIDTH * .09,

                }}>
                <LinearGradient colors={["#555555", "#171717"]} style={{
                    width: "100%",
                    height: '100%',
                    justifyContent: 'center',
                    marginRight: 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    borderRadius: 17
                }}>
                    <View style={{flex: 1}}>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: "Roboto_700Bold", fontSize: textSizeRender(2.2), color: 'white'
                        }}>{statusCode(status)}</Text>
                    </View>
                    <View style={{flex: 0}}>
                        <MaterialIcons name="arrow-right" size={textSizeRender(4)} color="white"/>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    </View>)

    return (
        <ContainerAdmin
            isList={true}
            callApi={() => {
                setStatus(-1)
                getOrderAxios()
            }}
            title={"Orders"}
            icon={<MaterialCommunityIcons name="clipboard-text-multiple" size={30} color={"black"}/>}
            actions={actions}
            componentTitle={<View style={{
                marginHorizontal: SCREEN_WIDTH * .05,
                flexDirection: "column",
                borderRadius: 5
            }}>
                <View style={{
                    borderWidth: 1,
                    borderColor: '#BFBDBD',
                    flexDirection: "row",
                    backgroundColor: 'white',
                    padding: 15,
                    borderRadius: 50
                }}>
                    <FontAwesome name="search" size={24} color="#BFBDBD"/>
                    <TextInput
                        placeholder={"Search Order"}
                        value={textSearch}
                        onChangeText={handleChange}
                        style={{
                            marginHorizontal: 15,
                        }}/>
                </View>

                <TotalOrdersComponent total={orders && orders.length > 0 ? orders.length : 0}/>
            </View>}
        >

            <OrdersAdmin
                removeOrder={(orderId) => {
                    const newOrders = orders.filter((order) => order.orderId !== orderId);
                    setOrders(newOrders)
                    setOrdersOrigin(newOrders)
                }}
                data={orders.filter((order)=> status !== -1  ?  order.statusCode ===status : order  )}
            />

            {
                openStatus &&
                <ChangeStatusComponent
                    isOpen={openStatus}
                    selected={status}
                    title={"Order status change"}
                    send={handleStatus} onClose={onClose}
                    options={options}/>
            }
        </ContainerAdmin>
    )
}
export default OrdersScreen;
