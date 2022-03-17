import React, {useState} from "react";
import {Link} from "@react-navigation/native";
import {Stack, Box, Center, Image, Text} from "native-base";
import Form from "~/components/Login/Form";
import screens from "~/constants/screens";
import ContainerBase from "~/components/common/ContainerBase";
import Loading from "~/components/Loading/Loading";

import ReferenceImage from "~/assets/image.png";
import styles from "./styles";
import {textSizeRender, setData, errorMessage} from "~/utils/utils";

import authService from "~/services/auth";

import {useAuthUserContext} from "~/context/authUser";
import CustomModal from "~/components/Modals/CustomModal";

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

    const onLogin = async(data) => {
        setFetching(true)
        const { email, password } = data;

        const result = await authService.login(email, password);
        if (result.hasOwnProperty("errorMessage")) {
            setTimeout(() => {
                setFetching(false)
                setModalVisible(true)
                setMessage(errorMessage(result.errorCode))
                setIsError(true)
            }, 500);
        } else {
            setTimeout(() => {
                setFetching(false)
                setUser({...result, role: 1, isFirstTime : false});
                setData("user", {...result, role: 1, isFirstTime : false})
            }, 500);

        }

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
