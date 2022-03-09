import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import ContainerAdmin from "~/components/common/ContainerAdmin";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";
import moment from "moment";
import {useAuthUserContext} from "~/context/authUser";
import UserPickerModal from "~/components/Modals/UserPickerModal";
import AssignOrderTo from "~/components/AssignOrder/AssignOrderTo";
import CustomerData from "~/components/AssignOrder/CustomerData";
import OrderInfo from "~/components/AssignOrder/OrderInfo";
import Screens from "~/constants/screens";
import {useRoute} from "@react-navigation/native";

const users_fake = [
    {
        id: 1,
        firstName: "Irving",
        lastName: "Lara",
        phoneNumber: 9991501069,
        email: "irvinglara9115@gmail.com",
        image: "https://random.imagecdn.app/250/150"
    }
    , {
        id: 2,
        firstName: "Victor",
        lastName: "Lopez",
        phoneNumber: 555555555,
        email: "victor@gmail.com",
        image: "https://random.imagecdn.app/150/150"
    }
    , {
        id: 3,
        firstName: "Carlos",
        lastName: " Jiménez",
        phoneNumber: 9999999999,
        email: "carlos@gmail.com",
        image: "https://random.imagecdn.app/150/150"
    }
]
const AssignOrderScreen = (props) => {
    const {order} = useRoute().params ?? {};


    console.log(order)

    const {user} = useAuthUserContext()
    const [visibleUserPicker, setVisibleUserPicker] = useState(false)
    const [selected, setSelected] = useState(order  ? order.client ? order.client :{}: {})

    const actions = (<View style={{flex: 1, alignItems: 'flex-end'}}>
        <View style={{flexDirection: 'row', width: "100%", justifyContent: 'flex-end'}}>
            <TouchableOpacity
                onPress={()=>{

                }}
                style={{
                    width: "45%",
                    flexDirection: 'row',
                    marginRight: 2,
                    alignItems: 'center',
                    backgroundColor: 'white',
                    padding: 10,
                    borderRadius: 20
                }}>
                <View style={{flex: 1}}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: "Roboto_700Bold", fontSize: textSizeRender(2.2), color: 'black'
                    }}>Save changes</Text>
                </View>
            </TouchableOpacity>

            {
                user.role === 2 &&
                <TouchableOpacity
                    onPress={()=>{

                    }}
                    style={{
                        width: "45%",
                        flexDirection: 'row',
                        marginRight: 2,
                        alignItems: 'center',
                        backgroundColor: 'black',
                        padding: 10,
                        borderRadius: 20
                    }}>
                    <View style={{flex: 1}}>
                        <Text style={{
                            color:"white",
                            textAlign: 'center',
                            fontFamily: "Roboto_700Bold", fontSize: textSizeRender(2.2)
                        }}>Delete order</Text>
                    </View>
                </TouchableOpacity>
            }



        </View>
    </View>)




    return (
        <View>
            <ContainerAdmin
                title={"Order"}
                actions={actions}
                icon={<MaterialCommunityIcons name="clipboard-text-multiple" size={30} color={"black"}/>}
            >
                <View style={{
                    paddingHorizontal: SCREEN_WIDTH * .05,
                    marginBottom: SCREEN_WIDTH / 3.5
                }}>
                    <View style={styles.card}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontFamily: "Roboto_500Medium", fontSize: textSizeRender(3)}}>Order: </Text>
                            <Text style={{fontFamily: "Roboto_700Bold", fontSize: textSizeRender(5)}}>{order && order.orderId}</Text>
                        </View>
                        <View style={{flex: 1, alignItems: "flex-end", justifyContent: 'center'}}>
                            <Text style={{
                                color: "#646464",
                                fontFamily: "Roboto_500Medium",
                                fontSize: textSizeRender(3.5)
                            }}>
                                {order.timestamp && moment(order.timestamp.seconds * 1000, "", "en").format('MM/DD/YYYY')}
                            </Text>
                        </View>
                    </View>
                    {
                        user.role === 2 &&
                        <AssignOrderTo selected={selected} setVisibleUserPicker={setVisibleUserPicker}/>
                    }

                    <CustomerData user={selected}/>
                    <OrderInfo gravestone={order && order.gravestone && order.gravestone} />
                </View>
            </ContainerAdmin>
            {
                visibleUserPicker &&
                <UserPickerModal visible={visibleUserPicker}
                                 options={users_fake}
                                 selected={selected}
                                 setSelected={setSelected}
                                 setVisible={setVisibleUserPicker}
                                 title={"Select user"}/>
            }
        </View>

    )
};

const styles = StyleSheet.create({
    card: {
        flex: 1, backgroundColor: 'white',
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        height: SCREEN_WIDTH / 5,
        flexDirection: 'row',
        borderWidth: 1,
        marginBottom: 10,
    }
});
export default AssignOrderScreen;