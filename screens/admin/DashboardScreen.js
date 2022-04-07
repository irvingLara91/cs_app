import React, {useEffect, useState} from "react";
import ContainerAdmin from "~/components/common/ContainerAdmin";
import DashboardAdmin from "~/components/DashboardAdmin/DashboardAdmin";
import {useAuthUserContext} from "~/context/authUser";
import ordersService from "~/services/orders";
import {useIsFocused} from "@react-navigation/native";
import ApiApp from "~/api/ApiApp";

const DashboardScreen = (props) => {
    const {user} = useAuthUserContext()
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

    const getOrders = async () => {
        let result;
        if (user.userDoc.role === 2) {
            result = await ordersService.getAllOrders()
        } else {
            result = await ordersService.getOrdersAssigned(user.userDoc.orders)
        }
        if (result && result.length > 0) {
            setOrders(result)
        }else {
            setOrders([])
        }
    }



    useEffect(async () => {
        if (isFocused) {
            await getOrderAxios();
        }
    }, [isFocused])


    return (
        <ContainerAdmin isDashboard={true} isList={true} callApi={getOrderAxios} title={"Dashboard Cornerstone"}>
            <DashboardAdmin data={orders}/>
        </ContainerAdmin>
    )
}
export default DashboardScreen;
