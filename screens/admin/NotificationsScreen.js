import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {Text} from "native-base";
import ContainerAdmin from "~/components/common/ContainerAdmin";

import {Feather, MaterialIcons, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import ContainerNotifications from "~/components/ContainerList/ContainerNotifications";
import {useAuthUserContext} from "~/context/authUser";
import {useIsFocused} from "@react-navigation/native";
import ApiApp from "~/api/ApiApp";

const notificationsData = [
    {
        id: 1,
        date: new Date(),
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus dui potenti scelerisque eget scelerisque ultrices. Ut tortor et egestas facilisi euismod lorem molestie nec."
    },
    {
        id: 2,
        date: new Date(),
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus dui potenti scelerisque eget scelerisque ultrices. Ut tortor et egestas facilisi euismod lorem molestie nec."
    },
    {
        id: 3,
        date: new Date(),
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus dui potenti scelerisque eget scelerisque ultrices. Ut tortor et egestas facilisi euismod lorem molestie nec."
    },
    {
        id: 4,
        date: new Date(),
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus dui potenti scelerisque eget scelerisque ultrices. Ut tortor et egestas facilisi euismod lorem molestie nec."
    },
    {
        id: 5,
        date: new Date(),
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus dui potenti scelerisque eget scelerisque ultrices. Ut tortor et egestas facilisi euismod lorem molestie nec."
    },
    {
        id: 6,
        date: new Date(),
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus dui potenti scelerisque eget scelerisque ultrices. Ut tortor et egestas facilisi euismod lorem molestie nec."
    },
    {
        id: 7,
        date: new Date(),
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus dui potenti scelerisque eget scelerisque ultrices. Ut tortor et egestas facilisi euismod lorem molestie nec."
    },
    {
        id: 8,
        date: new Date(),
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus dui potenti scelerisque eget scelerisque ultrices. Ut tortor et egestas facilisi euismod lorem molestie nec."
    },
    {
        id: 9,
        date: new Date(),
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus dui potenti scelerisque eget scelerisque ultrices. Ut tortor et egestas facilisi euismod lorem molestie nec."
    },
    {
        id: 10,
        date: new Date(),
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus dui potenti scelerisque eget scelerisque ultrices. Ut tortor et egestas facilisi euismod lorem molestie nec."
    },
    {
        id: 11,
        date: new Date(),
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus dui potenti scelerisque eget scelerisque ultrices. Ut tortor et egestas facilisi euismod lorem molestie nec."
    },
    {
        id: 12,
        date: new Date(),
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus dui potenti scelerisque eget scelerisque ultrices. Ut tortor et egestas facilisi euismod lorem molestie nec."
    },
    {
        id: 13,
        date: new Date(),
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus dui potenti scelerisque eget scelerisque ultrices. Ut tortor et egestas facilisi euismod lorem molestie nec."
    },
]
const NotificationsScreen = (props) => {
    const {user} = useAuthUserContext();
    const isFocused = useIsFocused();
    const [notifications, setNotifications] = useState([]);



    const getNotificationsData = () => {
        ApiApp.getNotifications(user.userDoc.userId).then(r => {
            console.log(r.data)
            if (r.data.success){
                setNotifications(r.data.data)
            }else {
                setNotifications([])
            }
        }).catch(e=>{console.log(e)})
    }

    useEffect(() => {
        getNotificationsData()
    }, []);


    const actionDelete=(item)=>{

    }


    return (
        <ContainerAdmin title={"Notifications"}
                        isList={true} callApi={getNotificationsData}
                        icon={<MaterialCommunityIcons name={"message-reply-text"} size={30} color={"black"}/>}>
            <ContainerNotifications data={notifications} action={actionDelete}/>
        </ContainerAdmin>
    )
}
export default NotificationsScreen;
