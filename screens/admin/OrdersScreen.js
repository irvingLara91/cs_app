import React, {useState} from "react";
import {View, TouchableOpacity, Text} from "react-native";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import ContainerAdmin from "~/components/common/ContainerAdmin";
import {textSizeRender} from "~/utils/utils";
import OrdersAdmin from "~/components/OrdersAdmin/OrdersAdmin";

const listOrders = [
    {id:1,date:new Date(),statusOrder:1,numberOrder:"1234",firstName:"Irving",lastName:"Lara",img:"https://random.imagecdn.app/250/150"}
    ,{id:2,date:new Date(),statusOrder:0,numberOrder:"3242",firstName:"Carlos",lastName:"Perez",img:"https://random.imagecdn.app/250/150"}
    ,{id:3,date:new Date(),statusOrder:0,numberOrder:"3242",firstName:"Carlos",lastName:"Perez",img:"https://random.imagecdn.app/250/150"}
    ,{id:4,date:new Date(),statusOrder:0,numberOrder:"3242",firstName:"Carlos",lastName:"Perez",img:"https://random.imagecdn.app/250/150"}
    ,{id:5,date:new Date(),statusOrder:0,numberOrder:"3242",firstName:"Carlos",lastName:"Perez",img:"https://random.imagecdn.app/250/150"}
    ,{id:6,date:new Date(),statusOrder:0,numberOrder:"3242",firstName:"Carlos",lastName:"Perez",img:"https://random.imagecdn.app/250/150"}
    ,{id:7,date:new Date(),statusOrder:0,numberOrder:"3242",firstName:"Carlos",lastName:"Perez",img:"https://random.imagecdn.app/250/150"}
    ,{id:8,date:new Date(),statusOrder:0,numberOrder:"3242",firstName:"Carlos",lastName:"Perez",img:"https://random.imagecdn.app/250/150"}

]
const OrdersScreen = (props) => {
    const [status,setStatus]=useState(null)
    const [short,setShort]=useState(null)
    const [textSearch,setTextSearch]=useState("")


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
        <ContainerAdmin title={"Orders"}
                        icon={<MaterialCommunityIcons name="clipboard-text-multiple" size={30} color={"black"}/>}
                        actions={actions}>
            <OrdersAdmin
                data={listOrders}
                setTextSearch={setTextSearch}
                textSearch={textSearch}
                status={status}
                setStatus={setStatus}
                short={short}
                setShort={setShort}
                        />
        </ContainerAdmin>
    )
}
export default OrdersScreen;
