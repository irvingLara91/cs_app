import React, {useEffect, useState} from "react";
import {Link} from "@react-navigation/native";
import {Stack, Box, Center, Image, Text} from "native-base";
import Form from "~/components/Login/Form";
import screens from "~/constants/screens";
import ContainerBase from "~/components/common/ContainerBase";
import Loading from "~/components/Loading/Loading";

import ReferenceImage from "~/assets/image.png";
import styles from "./styles";
import {textSizeRender, setData, errorMessage, removeData} from "~/utils/utils";

import authService from "~/services/auth";

import {useAuthUserContext} from "~/context/authUser";
import CustomModal from "~/components/Modals/CustomModal";
import ApiApp from "~/api/ApiApp";

export default function Login() {
    const {passwordRecoveryLink} = styles;
    const { setFetching, fetching, setUser } = useAuthUserContext()

    /***
     * States de CustomModal
     * **/
    const [modalVisible, setModalVisible] = useState(false)
    const [message, setMessage] = useState("")
    const [isError, setIsError] = useState(false)
    /***
     * End States de CustomModal
     * **/

    const closeModal=(val)=>{
        setMessage("")
        setIsError(false)
        setModalVisible(false)
    }

    const setDataUser = async (data) => {
        let res = {
            userDoc: data.userDoc,
            userId: data.userId,
            isFirstTime: data.isFirstTime
        }
        await setUser(res)
       await setData("user", res)
    }

    const onLogin = async(data) => {
        setFetching(true)
        const { email, password } = data;
        ApiApp.login({email, password}).then(response=>{
            if (response.data.success){
                setTimeout(() => {
                    setFetching(false)
                    response.data.data.isFirstTime = false
                    setDataUser(response.data.data)
                }, 500);
                }else {
                setTimeout(() => {
                    setFetching(false)
                    setModalVisible(true)
                    setMessage(response.data.message)
                    setIsError(true)
                }, 500);
            }
        }).catch(e=>{
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
            <Center>
                <Stack mt={3} space={4} w="75%" maxW="300px">
                    <Center mt={20} mb={20}>
                        <Image source={ReferenceImage} alt="reference login image"/>
                    </Center>
                    <Form onSubmit={onLogin} />
                    <Box>
                        <Link
                            to={{screen: screens.PASSWORD_RECOVERY}}
                            style={passwordRecoveryLink}
                        >
                            <Text underline fontFamily={"Roboto_400Regular"} fontSize={textSizeRender(3.5)}>
                                Did you forget your password?</Text>

                        </Link>
                    </Box>
                </Stack>
            </Center>
            {
                fetching &&
                <Loading loading={fetching} color={"black"} text={"loading..."}/>
            }
            {
                modalVisible &&
                <CustomModal message={message} visible={modalVisible} setVisible={closeModal} isError={isError} />
            }
        </ContainerBase>
    );
}
