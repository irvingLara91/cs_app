import React, {useEffect, useState} from "react";
import {RefreshControl, Text, View} from "react-native"
import {Center, Box, ScrollView, Button} from "native-base";
import OrdersCommon from "~/components/common/Orders";
import NoOrders from "~/components/common/NoOrders";

import screens from "~/constants/screens";
import ordersService from "~/services/orders";
import {useAuthUserContext} from "~/context/authUser";
import Loading from "~/components/Loading/Loading";
import {useIsFocused} from "@react-navigation/native";
import CustomButton from "~/components/CustomButton/CustomButton";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";
import ApiApp from "~/api/ApiApp";

const Orders = ({navigation}) => {
    const isFocused = useIsFocused();
    const {user} = useAuthUserContext();
    const {navigate} = navigation;
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false)

    const _onRefresh = () => {
        setLoading(true)
        setRefreshing(true)
        try {
            getOrders().then(r => {
            });
        } catch (e) {
        }
        setTimeout(() => {
            setRefreshing(false)
        }, 300);
    }

    const getOrders = () => {
        ApiApp.getAssigned(user.userId).then(response => {
            if (response.data.success) {
                setOrders(response.data.data)
                setTimeout(() => {
                    setLoading(false)
                }, 500);
            } else {
                setTimeout(() => {
                    setOrders([])
                    setLoading(false)
                }, 500);
            }
        }).catch(e => {
            setTimeout(() => {
                setOrders([])
                setLoading(false)
            }, 500);
        });
    };

    useEffect(async () => {
        if (isFocused) {
            await setLoading(true)
            await getOrders();
        }
    }, [isFocused])

    const orderBy = (array) => {
        console.log(array)
        //  const sortedActivities = array.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        return array
    }

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{marginHorizontal: SCREEN_WIDTH * .09, paddingVertical: 20}}>
                <Text style={{fontSize: textSizeRender(6), fontFamily: "Roboto_700Bold"}}>Your orders</Text>
            </View>
            <View style={{flex: 1}}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            tintColor={'rgba(0,0,0,.4)'}
                            refreshing={refreshing}
                            onRefresh={_onRefresh.bind(this)}
                        />
                    }
                >
                    <Center>
                        {
                            (Array.isArray(orders) && orders.length > 0) ? <OrdersCommon orders={orders}/> :
                                <NoOrders/>
                        }
                    </Center>
                </ScrollView>
            </View>
            <View style={{flex: 0, paddingVertical: 25}}>
                <Center>
                    <Box w="full" maxW="300">

                        <CustomButton onPress={() => navigate({name: screens.NEW_ORDER})}
                                      title={" New Order"}
                                      textColor={"#fff"}
                                      gradient={["#555555", "#171717"]}
                                      borderRadius={10}/>
                    </Box>
                </Center>
            </View>
            {
                loading &&
                <Loading loading={loading} color={"white"} text={"Loading..."}/>
            }
        </View>
    );
};

export default Orders;
