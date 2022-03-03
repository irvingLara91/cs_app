import React from "react";
import {View, TextInput} from "react-native";
import {SCREEN_WIDTH} from "~/utils/utils";
import {FontAwesome} from '@expo/vector-icons';
import TotalOrdersComponent from "~/components/TotalOrdersComponent/TotalOrdersComponent";
import ContainerOrdersList from "~/components/ContainerList/ContainerOrdersList";

const OrdersAdmin = (props) => {

    return (
        <View style={{
            paddingHorizontal: SCREEN_WIDTH * .05,
            marginBottom: SCREEN_WIDTH / 3.5
        }}>
            <View style={{
                flexDirection: "row", flex: 1,
                backgroundColor: 'white',
                padding: 15,
                borderRadius: 50
            }}>
                <FontAwesome name="search" size={24} color="#BFBDBD"/>
                <TextInput
                    placeholder={"Search Order"}
                    value={props.textSearch}
                    onChangeText={props.setTextSearch}
                    style={{
                        marginHorizontal: 15,
                        flex: 1,
                    }}/>
            </View>

            <TotalOrdersComponent total={22}/>

            <ContainerOrdersList data={props.data} />


        </View>
    )
}
export default OrdersAdmin;