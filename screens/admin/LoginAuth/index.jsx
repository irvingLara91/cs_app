import React, {useState} from "react";
import {Link} from "@react-navigation/native";
import Form from "../../../components/Login/Form";
import ReferenceImage from "~/assets/logo_login.png";
import screens from "~/constants/screens";
import styles from "./styles";
import ContainerBase from "~/components/common/ContainerBase";
import Loading from "~/components/Loading/Loading";
import authService from "~/services/auth";
import userService from "~/services/user";
import {useAuthUserContext} from "~/context/authUser";
import {textSizeRender, setData, errorMessage, SCREEN_WIDTH} from "~/utils/utils";
import CustomModal from "~/components/Modals/CustomModal";
import ApiApp from "~/api/ApiApp";
import {Image, Text, View} from "react-native";

export default function Login() {
    const {getUser} = userService;
    const {login} = authService;
    const {passwordRecoveryLink} = styles;
    const {setFetching, fetching, setUser} = useAuthUserContext()
    /***
     * States de CustomModal
     * **/
    const [modalVisible, setModalVisible] = useState(false)
    const [message, setMessage] = useState("")
    const [isError, setIsError] = useState(false)
    /***
     * End States de CustomModal
     * **/
    const closeModal = (val) => {
        setMessage("")
        setIsError(false)
        setModalVisible(false)
    }

    const setDataUser = async (data) => {
        let res = {
            accessToken: data.currentUser.stsTokenManager.accessToken,
            expirationTime:data.currentUser.stsTokenManager.expirationTime,
            refreshToken:data.currentUser.stsTokenManager.refreshToken,
            userDoc: data.userDoc,
            userId: data.userId,
            pushRegister: data.pushRegister
        }
        await setUser(res)
        await setData("user", res)
    }

    const onLogin = async (data) => {
        setFetching(true)
        const {email, password} = data;
        ApiApp.login({email, password}).then(response => {
            if (response.data.success) {
                if (response.data.data.userDoc.role!==1){
                    setTimeout(() => {
                        setFetching(false)
                        response.data.data.pushRegister = false
                        setDataUser(response.data.data)
                    }, 500);
                }else {
                    setTimeout(() => {
                        setFetching(false)
                        setModalVisible(true)
                        setMessage("Your role is not correct check it with the administrator.")
                        setIsError(true)
                    }, 500);
                }
            } else {
                setTimeout(() => {
                    setFetching(false)
                    setModalVisible(true)
                    setMessage(response.data.message)
                    setIsError(true)
                }, 500);
            }
        }).catch(e => {
            setTimeout(() => {
                setFetching(false)
                setModalVisible(true)
                setMessage("Error")
                setIsError(true)
            }, 500);
        });
    }

    return (
        <ContainerBase backgroundColor={"white"}>
            <View style={{flex:1}}>
                <View style={{flex:1,alignItems: 'center',marginTop:SCREEN_WIDTH*.15}}>
                    <View>
                        <Image
                            style={{
                                resizeMode:'contain',
                                height: SCREEN_WIDTH/1.5,
                                width: SCREEN_WIDTH,
                            }}
                            source={ReferenceImage}/>
                    </View>
                </View>
                <View style={{marginTop:SCREEN_WIDTH*.10,flex:1,paddingHorizontal:SCREEN_WIDTH*0.1}}>
                    <View style={{marginBottom:10}}>
                        <Text style={{fontSize: textSizeRender(7)}}>Log In</Text>
                    </View>
                    <Form onSubmit={onLogin}/>
                    <View style={{marginTop:20}}>
                        <Link
                            to={{screen: screens.PASSWORD_RECOVERY_ADMIN}}
                            style={passwordRecoveryLink}
                        >
                            <Text
                                style={{
                                    textDecorationLine: 'underline',
                                    fontFamily:"Roboto_400Regular",fontSize:textSizeRender(3.5)}}>
                                Did you forget your password?</Text>

                        </Link>
                    </View>
                </View>

            </View>
            {
                fetching &&
                <Loading loading={fetching} color={"white"} text={"loading..."}/>
            }

            {
                modalVisible &&
                <CustomModal message={message} visible={modalVisible} setVisible={closeModal} isError={isError}/>
            }
        </ContainerBase>
    );
}
