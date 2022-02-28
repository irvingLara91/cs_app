import React from "react";
import {Link} from "@react-navigation/native";
import {Stack, Box, Center, Image, Text} from "native-base";
import Form from "../../../components/Login/Form";
import ReferenceImage from "~/assets/image.png";
import screens from "~/constants/screens";
import styles from "./styles";
import ContainerBase from "~/components/common/ContainerBase";
import Loading from "~/components/Loading/Loading";
import userService from "~/services/user";
import {useAuthUserContext} from "~/context/authUser";
import {textSizeRender, setData} from "~/utils/utils";

export default function Login() {
    const { loginUser, getUser } = userService;
    const {passwordRecoveryLink} = styles;
    const {setFetching, fetching, setUser} = useAuthUserContext()

    const onLogin = async(data) => {
        const { email, password } = data;
        setFetching(true);
        const result = await loginUser(email, password);
        if (result.hasOwnProperty("errorMessage")) {
            console.log("trigger error")
        } else {
            const user = await getUser(result.uid);
            setUser({...result, role: user.role});
            setData("user", {...result, role: user.role})
        }
        setFetching(false)
    }

    return (
        <ContainerBase>
            <Center>
                <Stack mt={3} space={4} w="75%" maxW="300px">
                    <Center mt={20} mb={20}>
                        <Image source={ReferenceImage} alt="reference login image"/>
                    </Center>
                    <Form onSubmit={onLogin}/>
                    <Box>
                        <Link
                            to={{screen: screens.PASSWORD_RECOVERY_ADMIN}}
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
