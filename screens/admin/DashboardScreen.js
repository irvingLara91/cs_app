import React, {useEffect, useRef, useState} from "react";
import ContainerAdmin from "~/components/common/ContainerAdmin";
import DashboardAdmin from "~/components/DashboardAdmin/DashboardAdmin";
import {useAuthUserContext} from "~/context/authUser";
import {useIsFocused} from "@react-navigation/native";
import ApiApp from "~/api/ApiApp";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import {Platform} from "react-native";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});
const DashboardScreen = (props) => {
    const notificationListener = useRef();
    const responseListener = useRef();
    const {user, setPushNotification} = useAuthUserContext()
    const isFocused = useIsFocused();
    const [orders, setOrders] = useState([])
    const getOrderAxios=()=>{
        ApiApp.getOrders(5).then(response=>{
            let result = [];
            if (user.userDoc.role === 2){
                ///console.log(response.data.data.length)
                result=response.data.data
            }else {
                response.data.data.forEach((order) => {
                    const { orderId } = order;
                    if (user.userDoc.orders.includes(orderId)) {
                        result.push(order);
                    }
                });
            }
            setOrders(result)
        }).catch(e=>{
            console.error("ERROR:::>",e)
        })
    }

    useEffect(async () => {
        if (isFocused) {
            await getOrderAxios();
        }
    }, [isFocused])



    const registerDevice = (token) => {
        let params = {
            "token": token
        };
        ApiApp.registerPushNotification(params)
            .then(response=>{
                if (response.data.success){
                    console.log("Token:",token);
                    setPushNotification()
                }
            })
            .catch(e => {
                console.log(e);
            })
    }


    useEffect(() => {
        //Aqui se valida si el  usuario ya regitro un token push
       // cuando entra por primera vez a la app.
        if (user && !user.pushRegister) {
            registerForPushNotificationsAsync().then(token => {
                if (token) {

                    registerDevice(token);
                }else {
                   /// alert("Emulador")
                }
            });
        }

        notificationListener.current = Notifications.addNotificationReceivedListener(noti => {
            console.log("<----Notification--->",noti.request)

        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log("----Notification-----",response.notification.request.content.data);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);



    return (
        <ContainerAdmin isDashboard={true} isList={true} callApi={getOrderAxios} title={"Dashboard Cornerstone"}>
            <DashboardAdmin data={orders}/>
        </ContainerAdmin>
    )
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            /// alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        /// alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

export default DashboardScreen;
