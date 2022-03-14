import React, {useEffect, useState} from "react";
import {Box, Button, Center, Image, Heading, Stack, ScrollView} from "native-base";
import {RefreshControl, View} from "react-native";
import Welcome from "./Welcome";
import Carousel from "~/components/common/Carousel";
import OrdersCommon from "~/components/common/Orders";
import NoOrders from "~/components/common/NoOrders";


import ordersService from "~/services/orders";
import screens from "~/constants/screens";
import {Dimensions} from "react-native";
import {useAuthUserContext} from "~/context/authUser";
import {useIsFocused} from "@react-navigation/native";
import Loading from "~/components/Loading/Loading";

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
			getOrders().then(r => {});
		} catch (e) {
		}
		setTimeout(() => {
			setRefreshing(false)
		}, 300);
	};

	const getOrders = async () => {
		try {
			let result = await ordersService.getOrdersAssigned(user.userDoc.orders)
			if (result && result.length > 0) {
				setOrders(result)
				setTimeout(() => {
					setLoading(false)
				}, 500);
			} else {
				setTimeout(() => {
					setLoading(false)
				}, 500);
			}
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

    const data = [
        {
            img: (
                <Image
                    alt="image"
                    source={require("~/assets/image.png")}
                    height={40}
                />
            ),
            title: "How does it work 1",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
        },
        {
            img: <Image alt="image" source={require("~/assets/image.png")} height={40}/>,
            title: "How does it work 2",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
        },
        {
            img: <Image alt="image" source={require("~/assets/image.png")} height={40}/>,
            title: "How does it work 3",
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum consectetur amet tellus lobortis diam sed.",
        },
    ];

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1}}>
				<Center pb="5">
					<Stack mt={0} space={4} w="75%" maxW="300px">
						<Carousel
							data={data}
						/>
					</Stack>
					<Heading>Your orders</Heading>
				</Center>
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
                            (Array.isArray(orders) && orders.length > 0) ? <OrdersCommon orders={orders}/> : <NoOrders/>
                        }
                    </Center>
                </ScrollView>
            </View>
			<View style={{flex: 0, paddingVertical: 20}}>
				<Center>
					<Box w="full" maxW="300">
						<Button bgColor="dark.50"
								borderRadius="none"
								onPress={() => navigate({name: screens.NEW_ORDER})}>
							New Order
						</Button>
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
