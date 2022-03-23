import React, {useEffect, useState} from "react";
import ContainerAdmin from "~/components/common/ContainerAdmin";
import DashboardAdmin from "~/components/DashboardAdmin/DashboardAdmin";
import {useAuthUserContext} from "~/context/authUser";
import ordersService from "~/services/orders";

const DashboardScreen = (props) => {
    const {user} = useAuthUserContext()
    const [orders, setOrders] = useState([])
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
        await getOrders();
    }, [])

    return (
        <ContainerAdmin isDashboard={true} isList={true} callApi={getOrders} title={"Dashboard Cornerstone"}>
            <DashboardAdmin data={orders}/>
        </ContainerAdmin>
    )
}
export default DashboardScreen;
