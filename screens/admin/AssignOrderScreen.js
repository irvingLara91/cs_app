import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import ContainerAdmin from "~/components/common/ContainerAdmin";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {SCREEN_WIDTH, statusCode, textSizeRender} from "~/utils/utils";
import moment from "moment";
import {useAuthUserContext} from "~/context/authUser";
import UserPickerModal from "~/components/Modals/UserPickerModal";
import AssignOrderTo from "~/components/AssignOrder/AssignOrderTo";
import CustomerData from "~/components/AssignOrder/CustomerData";
import OrderInfo from "~/components/AssignOrder/OrderInfo";
import {useNavigation, useRoute} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";
import {useConfirmationContext} from "~/context/Confirmation";
import ApiApp from "~/api/ApiApp";
import apiApp from "~/api/ApiApp";
import CustomModal from "~/components/Modals/CustomModal";
import Loading from "~/components/Loading/Loading";
import ChangeStatusComponent from "~/components/ChangeStatusComponent";

const options = [
    {id: 0, name: "Cancelled"},
    {id: 1, name: "Created"},
    {id: 2, name: "In progress"},
    {id: 3, name: "Completed"},
    {id: 4, name: "Finished"},
    {id: 5, name: "Paused"},
    {id: 6, name: "Activated"},
    {id: 7, name: "Rejected"}
];

const AssignOrderScreen = (props) => {
    const {order} = useRoute().params ?? {};
    const confirm = useConfirmationContext();
    const navigation = useNavigation();
    const {user} = useAuthUserContext()
    const [visibleUserPicker, setVisibleUserPicker] = useState(false)
    const [assigned, setAssigned] = useState(null)
    const [selected, setSelected] = useState(null)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);
    const [status, setStatus] = useState(order.status ? order.status.code : order.statusCode);

    const onClose = () => {
        setOpenStatus(false)
    };

    /***
     * States de CustomModal
     * **/
    const [modalVisible, setModalVisible] = useState(false)
    const [message, setMessage] = useState("")
    const [isError, setIsError] = useState(false)

    /***
     * End States de CustomModal
     * **/

    useEffect(() => {
    }, [selected])


    const getAssignedToUser = (id) => {
        apiApp.getUser(id).then(response => {
            if (response.data.success) {
                ///alert(JSON.stringify(response.data.data))
                setAssigned(response.data.data)
            } else {
                setAssigned(null)
            }
        }).catch(e => {
            setAssigned(null)
        })

    }

    const getUserDocs = () => {
        try {
            apiApp.getUsers().then(response => {
                if (response.data.success) {
                    setUsers(response.data.data.filter(user => user.role !== 1))
                }
            });
        } catch (e) {
            setUsers([])
        }
    };
    useEffect(() => {
        if (order && order.assigned) {
            getAssignedToUser(order.assigned)
        }
        getUserDocs()
    }, [order])


    const changeStatusOrder = (code) => {
        setLoading(true)
        ApiApp.changeStatusOrder(order.orderId, {
            status: {
                "code": code,
                "message": ""
            }
        }).then(result => {
            if (result.data.success){
                setTimeout(() => {
                    setLoading(false)
                    setStatus(code);
                    setMessage("Status change successful.")
                    setModalVisible(true)
                    setIsError(false)
                }, 500);
            }else {
                setTimeout(() => {
                    setLoading(false)
                    setStatus(code);
                    setMessage(result.data.message)
                    setModalVisible(true)
                    setIsError(true)
                }, 500);
            }

        }).catch(e => {
            setTimeout(() => {
                setLoading(false)
                setMessage("An error has occurred, please try again later.")
                setModalVisible(true)
                setIsError(true)
            }, 500);
            console.log(order.orderId, e);
        });
    }


    const handleStatus = (StatusCode) => {
        onClose();
        changeStatusOrder(StatusCode.id)
    }


    const handleDelete = (orderId) => {
        confirm({description: `You are about to delete order: ${orderId}`, title: "This action can not be undone"})
            .then(async () => {
                const deleteResult = await ApiApp.deleteOrder(orderId)
                if (deleteResult.data.success) {
                    navigation.goBack();
                }
            })
            .catch((error) => {
                return console.log(error);
            });
    }

    const assignedToUser = () => {
        if (assigned && selected) {
            apiApp.putReassign(order.orderId, {
                "prevUserId": assigned.userId,
                "newUserId": selected.userId
            }).then(response => {
                console.log("putReassign", response.data)
                if (response.data.success) {
                    setMessage(response.data.message)
                    setModalVisible(true)
                    setIsError(false)
                } else {
                    setMessage(response.data.message)
                    setModalVisible(true)
                    setIsError(true)
                }
            }).catch(e => {
                console.log(e)
                setMessage("Error")
                setModalVisible(true)
                setIsError(true)
            })

        } else if (!assigned && selected) {
            apiApp.putAssign(order.orderId, {
                "newUserId": selected.userId
            }).then(response => {
                if (response.data.success) {
                    setMessage(response.data.message)
                    setModalVisible(true)
                    setIsError(false)
                } else {
                    setMessage(response.data.message)
                    setModalVisible(true)
                    setIsError(true)
                }

            }).catch(e => {
                console.log(e)
                setMessage("Error")
                setModalVisible(true)
                setIsError(true)
            })
        } else {
            alert("seleccione  un  asmin o tecnico")
        }

    }

    const actions = (<View style={{flex: 1, alignItems: 'flex-end'}}>
        <View style={{flexDirection: 'row', width: "100%", justifyContent: 'flex-end'}}>
            {
                user.userDoc.role === 2 &&
                <TouchableOpacity
                    onPress={() => {
                        assignedToUser()
                    }}
                    style={{
                        width: "50%",
                        height: SCREEN_WIDTH * .09,
                    }}>
                    <LinearGradient colors={["#858C93", "#5E6268"]} style={{
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
            }
            {
                user.userDoc.role === 2 &&
                <TouchableOpacity
                    onPress={() => {
                        if (order && order.orderId) {
                            handleDelete(order.orderId)
                        }
                    }}
                    style={{
                        marginLeft: 4,
                        width: "50%",
                        height: SCREEN_WIDTH * .09,

                    }}>
                    <LinearGradient colors={["#555555", "#171717"]} style={{
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
            title={"My order"}
            actions={actions}
            icon={<MaterialCommunityIcons name="clipboard-text-multiple" size={30} color={"black"}/>}
        >
            <View style={{
                paddingHorizontal: SCREEN_WIDTH * .05,
                marginBottom: SCREEN_WIDTH / 2.5
            }}>
                <LinearGradient colors={["#555555", "#171717"]} style={styles.card}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{
                            color: "white",
                            fontFamily: "Roboto_700Bold",
                            fontSize: textSizeRender(4)
                        }}>Order: </Text>
                        <Text style={{
                            color: "white",
                            fontFamily: "Roboto_900Black",
                            fontSize: textSizeRender(6)
                        }}>{order && order.orderId}</Text>
                    </View>
                    <View style={{flex: 1, alignItems: "flex-end", justifyContent: 'center'}}>
                        <Text style={{
                            color: "#F4FCC2",
                            fontFamily: "Roboto_500Medium",
                            fontSize: textSizeRender(3.5)
                        }}>

                            {
                                order.createdAt ? moment(order.createdAt, "", "en").format('MM/DD/YYYY')
                                    :
                                    order.timestamp ? moment(order.timestamp, "", "en").format('MM/DD/YYYY')
                                        :
                                        "No date"
                            }
                        </Text>
                    </View>
                </LinearGradient>
                {
                    user.userDoc.role === 2 &&
                    <AssignOrderTo assigned={assigned} selected={selected} setVisibleUserPicker={setVisibleUserPicker}/>
                }

                <CustomerData user={order.client}/>
                <OrderInfo gravestone={order && order.gravestone && order.gravestone}/>

                {
                    <View style={{
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                backgroundColor: 'white',
                                alignItems: 'center',
                                width: '100%',
                                borderRadius: 5,
                                borderWidth: 1,
                                padding: 10,
                                borderColor: '#7A7A7A',
                            }}
                            onPress={() => {
                                setOpenStatus(true)
                            }}>
                            <Text
                                style={{
                                    flex: 1,
                                    textAlign: 'center',
                                    fontFamily: "Roboto_500Medium",
                                    fontSize: textSizeRender(4)
                                }}
                            >{statusCode(status)}</Text>
                            <View>
                                <MaterialIcons name="keyboard-arrow-down" size={textSizeRender(6)} color="black"/>
                            </View>
                        </TouchableOpacity>
                    </View>


                }
            </View>
            {
                openStatus &&
                <ChangeStatusComponent
                    isOpen={openStatus}
                    selected={status}
                    title={"Order status change"}
                    send={handleStatus} onClose={onClose}
                    options={options}/>
            }
            {
                visibleUserPicker &&
                <UserPickerModal visible={visibleUserPicker}
                                 options={users}
                                 assigned={assigned}
                                 selected={selected}
                                 setSelected={setSelected}
                                 setVisible={setVisibleUserPicker}
                                 title={"Select user"}/>
            }

            {
                modalVisible &&
                <CustomModal message={message} visible={modalVisible} setVisible={setModalVisible} isError={isError}/>

            }

            {
                loading &&
                <Loading loading={loading} color={"white"} text={"Verified the change..."}/>
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
