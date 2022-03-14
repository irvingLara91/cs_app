import React, {useEffect, useState} from "react";
import {ScrollView} from "react-native";
import {Stack, Box, Image, Center, Divider, Text} from "native-base";
import Form from "./Form";
import gravestoneMedia from "~/assets/gravestone-media.png";
import ContainerBaseV2 from "~/components/common/ContainerBaseV2";
import {useAuthUserContext} from "~/context/authUser";
import {useIsFocused} from "@react-navigation/native";
import {SCREEN_WIDTH} from "~/utils/utils";
import userService from "~/services/user";

const Profile = (props) => {
    const isFocused = useIsFocused();
    const {user, setUser, setNewOrder} = useAuthUserContext();
    const [profile, setProfile] = useState(null)
    const [firstName, setFirstName] = useState(user && user.userDoc.firstName)
    const [lastName, setLastName] = useState(user && user.userDoc.lastName)

    useEffect(() => {
        //setNewOrder(user,"order5")
        if (isFocused) {
            setProfile(user.userDoc)
        }
    }, [isFocused])


    const handleSubmit = async (data) => {
        const { address, city, zipCode, email, firstName, lastName, phoneNumber } = data;
        const { orders, role, photoURL } = user.userDoc;
        const newData = {
            address: {
                address,
                city,
                zipCode
            },
            email,
            firstName,
            lastName,
            orders,
            role,
            photoURL
        }
       const updateResult = await userService.updateUser(user.uid, newData);
       console.log({updateResult})
    //    if (updateResult.success){

    //    } else {

    //    }
    }


    return (
        <ContainerBaseV2>
            <ScrollView>
                <Center mt={5} mb={SCREEN_WIDTH * .5}>
                    <Stack w="full" maxW="300">
                        <Center mt="5">

                            {
                                profile ?
                                    <Box bgColor="muted.300" padding="3" borderRadius="lg">
                                        <Image size={"lg"} source={{uri: profile.photoURL}} alt="gravestone picture"/>
                                    </Box>
                                    :
                                    <Box bgColor="muted.300" pt="7" pb="7" pl="7" pr="7" borderRadius="lg">
                                        <Image source={gravestoneMedia} alt="gravestone picture"/>
                                    </Box>

                            }
                            <Text fontSize={20}>
                                {firstName} {lastName}
                            </Text>
                        </Center>
                        <Divider mt="5" mb="5"/>
                        <Box>
                            <Form setFirstName={setFirstName} setLastName={setLastName} profile={profile} onSubmit={handleSubmit}/>
                        </Box>
                    </Stack>
                </Center>
            </ScrollView>
        </ContainerBaseV2>
    );
};

export default Profile;

