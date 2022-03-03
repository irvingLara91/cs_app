import React, {useEffect} from "react";
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
    useEffect(() => {

        console.log('user',user)


    }, []);

    return (
        <ContainerAdmin title={"Dashboard Cornerstone"}>
            <DashboardAdmin data={listOrders}/>
        </ContainerAdmin>
    )
}
export default DashboardScreen;
