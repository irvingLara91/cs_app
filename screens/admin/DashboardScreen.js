import React, {useEffect, useState} from "react";
import {MaterialIcons} from "@expo/vector-icons";
import ContainerAdmin from "~/components/common/ContainerAdmin";
import DashboardAdmin from "~/components/DashboardAdmin/DashboardAdmin";
import {useAuthUserContext} from "~/context/authUser";
import ordersService from "~/services/orders";

const listOrders = [
    {d:1,date:new Date(),numberOrder:"1234",img:"https://random.imagecdn.app/250/150"}
    ,{d:2,date:new Date(),numberOrder:"3242",img:"https://random.imagecdn.app/250/150"}

]
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
        }
    }

    useEffect(async () => {
        await getOrders();
    }, [])

    return (
        <ContainerAdmin isList={true} callApi={getOrders} title={"Dashboard Cornerstone"}>
            <DashboardAdmin data={orders}/>
        </ContainerAdmin>
    )
}
export default DashboardScreen;
