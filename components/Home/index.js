import React, {useEffect, useState} from "react";
import {Box, Button, Center, Stack, ScrollView} from "native-base";
import {RefreshControl, View, Text, Platform} from "react-native";
import Welcome from "./Welcome";
import OrdersCommon from "~/components/common/Orders";
import NoOrders from "~/components/common/NoOrders";


import ordersService from "~/services/orders";
import screens from "~/constants/screens";
import {Dimensions} from "react-native";
import {useAuthUserContext} from "~/context/authUser";
import {useIsFocused} from "@react-navigation/native";
import Loading from "~/components/Loading/Loading";
import ContainerBase from "~/components/common/ContainerBase";
import CarouselFull from "~/components/common/CarouselFull";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";
import CustomButton from "~/components/CustomButton/CustomButton";
import ApiApp from "~/api/ApiApp";

const ITEM_WIDTH = Math.round(SCREEN_WIDTH / 1.3);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH / 1.1);
export default function Home({navigation, route}) {
    const {user} = useAuthUserContext()
    const isFocused = useIsFocused();
    const {navigate} = navigation;
    const {height, width} = Dimensions.get("window");
    const {params} = route;
    //const { isFirstTime } = params;
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false)
    const _onRefresh = () => {
        setLoading(true)
        setRefreshing(true)
        try {
            getOrders();
        } catch (e) {
        }
        setTimeout(() => {
            setRefreshing(false)
        }, 300);
    };

    const getOrders = () => {
        try {
            ApiApp.getAssigned(user.uid? user.uid : user.userId)
                .then(response=>{
                    if (response.data.success) {
                        setOrders(response.data.data)
                        setTimeout(() => {
                            setLoading(false)
                        }, 500);
                    } else {
                        setOrders([])
                        setTimeout(() => {
                            setLoading(false)
                        }, 500);
                    }
                }).catch(e=>{
                setOrders([])
                setTimeout(() => {
                    setLoading(false)
                }, 500);
            });
        } catch (e) {
            setLoading(false)
        }
    };

    useEffect(async () => {
        if (isFocused) {
            await setLoading(true)
            await getOrders();
        }
    }, [isFocused])

    if (user && user.isFirstTime) return <Welcome/>;

    const limit = (array) => {
        let orderArray = []
        array.map((order) => {
            orderArray.push(order)
        });
        const sortedActivities = orderArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        sortedActivities.length = Math.min(sortedActivities.length,3)
        return sortedActivities
    }

    const data = [
        {
            img: "https://previews.123rf.com/images/quasargal/quasargal1507/quasargal150700847/42183591-monumentos-y-l%C3%A1pidas-en-el-cementerio-de-arlington-nacional-en-virginia-ee-uu-.jpg",
            title: "WELCOME \n" + "TO THE\nCORNERSTONE\nAPP",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
        },
        {
            img: "https://previews.123rf.com/images/arinahabich/arinahabich1206/arinahabich120601603/14142672-endless-fila-di-lapidi-in-marmo-bianco-continua-collina-sopra-al-logan-fort-national-cemetery-a-denv.jpg",
            title: "WELCOME \n" + "TO THE\nCORNERSTONE\nAPP",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
        },
        {
            img: "https://www.dignitymemorial.com/dfsmedia/042808e1630c49a48950d5077d6556eb/36387-50034/upright-monuments-collage",
            title: "WELCOME \n" + "TO THE\nCORNERSTONE\nAPP",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
        },
    ];

    return (
        <View style={{flex: 1, backgroundColor: 'white', marginTop: -ITEM_HEIGHT * .20}}>
            <View style={{flex: 1}}>
                <Stack w="100%" top={ITEM_HEIGHT * .20}>
                    <CarouselFull
                        data={data}
                    />
                </Stack>
                <View style={{marginHorizontal: SCREEN_WIDTH * .09, paddingBottom: 5}}>
                    <Text style={{fontSize: textSizeRender(6), fontFamily: "Roboto_700Bold"}}>Your orders</Text>
                </View>
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
                            (Array.isArray(orders) && orders.length > 0) ? <OrdersCommon orders={limit(orders)}/> :
                                <NoOrders/>
                        }
                    </Center>
                </ScrollView>
            </View>
            <View style={{flex: 0, paddingVertical: Platform.OS === "ios" ? 22 : 15}}>
                <Center>
                    <Box w="full" maxW="300">
                        <CustomButton onPress={() => navigate({name: screens.NEW_ORDER})}
                                      title={"New Order"}
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
}
