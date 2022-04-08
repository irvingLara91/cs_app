import React, {useState} from "react";
import {Center, Stack, Heading} from "native-base";
import Form from "./Form";
import ContainerBase from "../common/ContainerBase";
import authService from "~/services/auth";
import {useAuthUserContext} from "~/context/authUser";
import {setData} from "~/utils/utils";
import Loading from "~/components/Loading/Loading";
import ApiApp from "~/api/ApiApp";

const Register = ({navigation}) => {
    const {setUser} = useAuthUserContext();
    const {createUser} = authService;
    const [loading, setLoading] = useState(false);

    const setDataUser = async (data) => {
        let res = {
            userDoc: data,
            userId: data.userId,
            isFirstTime: data.isFirstTime
        }
        await setUser(res)
        await setData("user", res)
    }

    const onRegister = async (data) => {
        setLoading(true)
        const formData = new FormData();
        data.role = 1;
        const dataString = JSON.stringify(data);
        formData.append("avatar", {})
        formData.append('data', dataString);
        ApiApp.registerUser(formData).then(response => {
            if (response.data.success) {
                setTimeout(() => {
                    setLoading(false)
                    response.data.data.isFirstTime = true
                    setDataUser(response.data.data)
                }, 500);
            } else {
                setTimeout(() => {
                    setLoading(false)
                }, 500);
            }
        }).catch(e => {
            console.log("error", e);
            setTimeout(() => {
                setLoading(false)
            }, 500);
        });

    }

    return (
        <ContainerBase backgroundColor={"white"}>
            <Center>
                <Stack mt={3} mb={10} space={4} w="75%" maxW="300px">
                    <Heading>Complete the following information</Heading>
                    <Form onSubmit={onRegister}/>
                </Stack>
            </Center>
            {
                loading &&
                <Loading loading={loading} text={"Loading"} color={"white"}/>
            }
        </ContainerBase>
    );
};

export default Register;
