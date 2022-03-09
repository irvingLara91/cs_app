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
            <ContainerOrdersList data={props.data} />
        </View>
    )
}
export default OrdersAdmin;