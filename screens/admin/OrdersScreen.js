import React, {useCallback, useState, useEffect} from "react";
import {View, TouchableOpacity, Text, TextInput} from "react-native";
import {FontAwesome, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import ContainerAdmin from "~/components/common/ContainerAdmin";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";
import OrdersAdmin from "~/components/OrdersAdmin/OrdersAdmin";
import _ from "lodash";
import ordersService from "~/services/orders";
import {useAuthUserContext} from "~/context/authUser";
import TotalOrdersComponent from "~/components/TotalOrdersComponent/TotalOrdersComponent";

const OrdersScreen = (props) => {
    const {user} = useAuthUserContext();
    const [orders, setOrders] = useState([])
    const [ordersOrigin, setOrdersOrigin] = useState([])


    const getOrders = async () => {
        let result;
        setTextSearch("")
        if (user.userDoc.role === 2) {
            result = await ordersService.getAllOrders()
        } else {
            result = await ordersService.getOrdersAssigned(user.userDoc.orders)
        }
        if (result && result.length > 0) {
            setOrders(result)
            setOrdersOrigin(result)
        }
    }

    useEffect(async () => {
        await getOrders();
    }, [])

    const [status, setStatus] = useState(null)
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
                var results = _.filter(ordersOrigin, function (item) {
                    return item.client.firstName.indexOf(text) > -1;
                });
                await setOrders(results)
            } else {
                setOrders(ordersOrigin)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const actions = (<View style={{flex: 1, alignItems: 'flex-end'}}>
        <View style={{flexDirection: 'row', width: "100%", justifyContent: 'flex-end'}}>
            <TouchableOpacity style={{
                width: "40%",
                flexDirection: 'row',
                marginRight: 2,
                alignItems: 'center',
                backgroundColor: 'gray',
                padding: 10,
                borderRadius: 10
            }}>
                <View style={{flex: 1}}>
                    <Text style={{fontSize: textSizeRender(2.5), color: 'white'}}>Short</Text>
                </View>
                <View style={{flex: 0}}>
                    <MaterialIcons name="arrow-right" size={textSizeRender(4)} color="white"/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={{
                width: "40%",
                flexDirection: 'row',
                marginLeft: 2,
                alignItems: 'center',
                backgroundColor: 'gray',
                padding: 10,
                borderRadius: 10
            }}>
                <View style={{flex: 1}}>
                    <Text style={{fontSize: textSizeRender(2.5), color: 'white'}}>Status</Text>
                </View>
                <View style={{flex: 0}}>
                    <MaterialIcons name="arrow-right" size={textSizeRender(4)} color="white"/>
                </View>
            </TouchableOpacity>
        </View>
    </View>)

    return (
        <ContainerAdmin
            isList={true}
            callApi={() => {
                getOrders()
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
                data={orders}
            />
        </ContainerAdmin>
    )
}
export default OrdersScreen;
