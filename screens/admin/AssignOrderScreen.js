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
import {LinearGradient} from "expo-linear-gradient";

const users_fake = [
    {
        id: 1,
        firstName: "Irving",
        lastName: "Lara",
        phoneNumber: 9991501069,
        email: "irvinglara9115@gmail.com",
        photoURL: "https://random.imagecdn.app/250/150"
    }
    , {
        id: 2,
        firstName: "Victor",
        lastName: "Lopez",
        phoneNumber: 555555555,
        email: "victor@gmail.com",
        photoURL: "https://random.imagecdn.app/150/150"
    }
    , {
        id: 3,
        firstName: "Carlos",
        lastName: " Jiménez",
        phoneNumber: 9999999999,
        email: "carlos@gmail.com",
        photoURL: "https://random.imagecdn.app/150/150"
    }
]
const AssignOrderScreen = (props) => {
    const {order} = useRoute().params ?? {};



    const {user} = useAuthUserContext()
    const [visibleUserPicker, setVisibleUserPicker] = useState(false)
    const [selected, setSelected] = useState(order  ? order.client ? order.client :{}: {})

    const actions = (<View style={{flex: 1, alignItems: 'flex-end'}}>
        <View style={{flexDirection: 'row', width: "100%", justifyContent: 'flex-end'}}>
            <TouchableOpacity
                onPress={()=>{
                }}
                style={{
                    width: "50%",
                    height: SCREEN_WIDTH*.09,
                }}>
                <LinearGradient colors={["#858C93","#5E6268"]} style={{
                    width: "100%",
                    height: '100%',
                    justifyContent: 'center',
                    marginRight: 2,
                    alignItems: 'center',
                    padding: 10,
                    borderRadius: 17
                }}>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: "Roboto_700Bold", fontSize: textSizeRender(2.2), color: 'white'
                        }}>Save changes</Text>
                </LinearGradient>
            </TouchableOpacity>
            {
                user.role === 2 &&
                <TouchableOpacity
                    onPress={()=>{
                    }}
                    style={{
                        marginLeft:4,
                        width: "50%",
                        height: SCREEN_WIDTH*.09,

                    }}>
                    <LinearGradient colors={["#555555","#171717"]} style={{
                        width: "100%",
                        height: '100%',
                        justifyContent: 'center',
                        marginRight: 2,
                        alignItems: 'center',
                        padding: 10,
                        borderRadius: 17
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: "Roboto_700Bold", fontSize: textSizeRender(2.2), color: 'white'
                        }}>Delete order</Text>
                    </LinearGradient>
                </TouchableOpacity>
            }



        </View>
    </View>)




    return (
            <ContainerAdmin
                title={"Order"}
                actions={actions}
                icon={<MaterialCommunityIcons name="clipboard-text-multiple" size={30} color={"black"}/>}
            >
                <View style={{
                    paddingHorizontal: SCREEN_WIDTH * .05,
                    marginBottom: SCREEN_WIDTH / 2.5
                }}>
                    <LinearGradient colors={["#555555","#171717"]} style={styles.card}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color:"white",fontFamily: "Roboto_700Bold", fontSize: textSizeRender(4)}}>Order: </Text>
                            <Text style={{color:"white",fontFamily: "Roboto_900Black", fontSize: textSizeRender(6)}}>{order && order.orderId}</Text>
                        </View>
                        <View style={{flex: 1, alignItems: "flex-end", justifyContent: 'center'}}>
                            <Text style={{
                                color: "#F4FCC2",
                                fontFamily: "Roboto_500Medium",
                                fontSize: textSizeRender(3.5)
                            }}>

                                {
                                    order.createdAt ? moment(order.createdAt.seconds * 1000, "", "en").format('MM/DD/YYYY')
                                        :
                                        order.timestamp ? moment(order.timestamp.seconds * 1000, "", "en").format('MM/DD/YYYY')
                                            :
                                            "No date"
                                }
                            </Text>
                        </View>
                    </LinearGradient>
                    {
                        user.role === 2 &&
                        <AssignOrderTo selected={selected} setVisibleUserPicker={setVisibleUserPicker}/>
                    }

                    <CustomerData user={selected}/>
                    <OrderInfo gravestone={order && order.gravestone && order.gravestone} />
                </View>
                {
                    visibleUserPicker &&
                    <UserPickerModal visible={visibleUserPicker}
                                     options={users_fake}
                                     selected={selected}
                                     setSelected={setSelected}
                                     setVisible={setVisibleUserPicker}
                                     title={"Select user"}/>
                }

            </ContainerAdmin>

    )
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        height: SCREEN_WIDTH / 5,
        flexDirection: 'row',
        marginBottom: 10,
    }
});
export default AssignOrderScreen;