import React from "react";
import {MaterialIcons} from "@expo/vector-icons";
import ContainerAdmin from "~/components/common/ContainerAdmin";
import DashboardAdmin from "~/components/DashboardAdmin/DashboardAdmin";

const listOrders = [
    {d:1,date:new Date(),numberOrder:"1234",img:"https://random.imagecdn.app/250/150"}
    ,{d:2,date:new Date(),numberOrder:"3242",img:"https://random.imagecdn.app/250/150"}

]
const DashboardScreen = (props) => {

    return (
        <ContainerAdmin title={"Dashboard Cornerstone"}>
            <DashboardAdmin data={listOrders}/>
        </ContainerAdmin>
    )
}
export default DashboardScreen;
