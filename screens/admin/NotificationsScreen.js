import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {Text} from "native-base";
import ContainerAdmin from "~/components/common/ContainerAdmin";

import {Feather, MaterialIcons, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import ContainerNotifications from "~/components/ContainerList/ContainerNotifications";
import {useAuthUserContext} from "~/context/authUser";
import {useIsFocused} from "@react-navigation/native";
import ApiApp from "~/api/ApiApp";
import screens from "~/constants/screens";

const NotificationsScreen = (props) => {
    const {user} = useAuthUserContext();
    const isFocused = useIsFocused();
    const [notifications, setNotifications] = useState([]);


    const traArray= (array)=>{
        console.log(array)

        let array_messagesUnion = [];
        array.map((m,i)=>{
             m.messages.map(r=>{
                 if (!r.seen){
                     array_messagesUnion.push(r)
                 }
             });
        });

        setNotifications(array_messagesUnion)
    }
    const getNotificationsData = () => {
        ApiApp.getAdminTechNotifications(user.userDoc.userId).then(r => {
            if (r.status){
                if (r.data.success){
                    if (r.data.data.length===1){
                       let e =  r.data.data[0].messages.filter(m => m.seen !==true)
                        setNotifications(e)

                    }else if (r.data.data.length>=1){
                        traArray(r.data.data)
                    }else {
                        setNotifications([])
                    }
                }
            }
        }).catch(e=>{console.log(e)})
    }

    useEffect(() => {
        if (isFocused){
            getNotificationsData()
        }
    }, [isFocused]);


    const actionDelete=(item)=>{
       // alert(JSON.stringify(item))
        props.navigation.navigate(screens.ASSIGN_ORDER_TO, {order: item,  otherParam: true})

    }


    return (
        <ContainerAdmin title={"Notifications"}
                        isList={true} callApi={getNotificationsData}
                        icon={<MaterialCommunityIcons name={"message-reply-text"} size={30} color={"black"}/>}>
            <ContainerNotifications callApi={getNotificationsData} data={notifications} action={actionDelete}/>
        </ContainerAdmin>
    )
}
export default NotificationsScreen;
