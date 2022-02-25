import React, {useState} from "react";
import {Link} from "@react-navigation/native";
import {Stack, Box, Center, Image, Text} from "native-base";
import Form from "../../../components/Login/Form";
import ReferenceImage from "~/assets/image.png";
import screens from "~/constants/screens";
import styles from "./styles";
import ContainerBase from "~/components/common/ContainerBase";
import Loading from "~/components/Loading/Loading";
import {useAuthUserContext} from "~/context/authUser";
import {textSizeRender} from "~/utils/utils";

export default function Login() {
    const {passwordRecoveryLink} = styles;
    const {LoginUser, fetching} = useAuthUserContext()

    const LoginParams = async (params) => {
        let data = {}
        data.username = params.username;
        data.password = params.password;
        data.LoggedIn = true;
        data.userType = 1;
        data.isFirstTime = false;
        await LoginUser(data)
    }

    return (
        <ContainerBase>
            <Center>
                <Stack mt={3} space={4} w="75%" maxW="300px">
                    <Center mt={20} mb={20}>
                        <Image source={ReferenceImage} alt="reference login image"/>
                    </Center>
                    <Form LoginParams={LoginParams}/>
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
        </ContainerBase>
    );
}
