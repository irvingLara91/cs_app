import React from "react";
import {View, StyleSheet, TouchableOpacity} from "react-native";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";
import {Button, Divider, Text} from "native-base";
import ContainerDashboardOrdersList from "~/components/ContainerList/ContainerDashboardOrdersList";
import TotalOrdersComponent from "~/components/TotalOrdersComponent/TotalOrdersComponent";

const DashboardAdmin = ({data=null,...pos}) => {

    return (<View style={{
        paddingHorizontal: SCREEN_WIDTH * .05,
        marginBottom:SCREEN_WIDTH/3.5}}>
        <View style={{
            width: '100%',
            padding: 20,
            height: SCREEN_WIDTH / 1.9, backgroundColor: 'black', borderRadius: 20
        }}>
            <Text
                style={{flex: 1}}
                color={"white"}
                letterSpacing={"md"}
                lineHeight={'sm'}
                fontFamily={'Roboto_700Bold'}
                fontSize={textSizeRender(7)}>
                {"Welcome to\nthe cornerstone\ndashboard"}
            </Text>
            <Button bgColor="primary_white.50" borderRadius={100} size="lg" color={"primary_black.500"} size="lg"
                    style={{width: "40%"}}>
                <Text style={styles.textButton}>
                    {"Need Help? "}
                </Text>
            </Button>
        </View>
        <Divider mt={4} bg={"primary_black.900"}/>
        <View style={styles.ContainerOrderTotal}>
            <View style={styles.viewTitleOrders}>
                <View style={styles.viewTitleFix}>
                    <Text style={styles.titleOrder}>
                        Total orders
                    </Text>
                </View>
                <View style={[styles.viewTitleFix, {
                    alignItems: "flex-end"
                }]}>
                    <TouchableOpacity>
                        <Text underline>View all orders</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TotalOrdersComponent total={80}/>
        </View>
        <View style={styles.ContainerOrderTotal}>
            <ContainerDashboardOrdersList data={data}/>
        </View>


    </View>)
}
const styles = StyleSheet.create({
    textButton: {
        color: 'black',
        fontSize: textSizeRender(3.4),
        fontFamily: 'Roboto_700Bold'
    },
    ContainerOrderTotal: {
        marginTop: 15,

    },
    viewTitleOrders: {
        flexDirection: 'row',
    },
    viewTitleFix: {
        flex: 1,
        justifyContent: 'center',
    },
    titleOrder: {
        color: 'black',
        fontSize: textSizeRender(5),
        fontFamily: 'Roboto_700Bold'
    }
});
export default DashboardAdmin;