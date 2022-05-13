import React from "react";
import {View} from "react-native";
import {SCREEN_WIDTH} from "~/utils/utils";
import ContainerOrdersList from "~/components/ContainerList/ContainerOrdersList";
import { useConfirmationContext } from "~/context/Confirmation";
import ordersService from "~/services/orders";
import ApiApp from "~/api/ApiApp";

const OrdersAdmin = (props) => {
    const confirm = useConfirmationContext();

    const handleDelete = (orderId) => {
        confirm({description: `You are about to delete order: ${orderId}`, title: "This action can not be undone"})
            .then(async() => {
                const deleteResult = await ApiApp.deleteOrder(orderId)
                if (deleteResult.data.success) {
                    props.removeOrder(orderId)
                }
            })
            .catch((error) => {
                return console.log(JSON.stringify(error));
            });
    }

    return (
        <View style={{
            paddingHorizontal: SCREEN_WIDTH * .05,
            marginBottom: SCREEN_WIDTH / 3.5
        }}>
            <ContainerOrdersList data={props.data} onDelete={handleDelete} />
        </View>
    )
}
export default OrdersAdmin;
