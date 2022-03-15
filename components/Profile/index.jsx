import React, {useEffect, useState} from "react";
import {ScrollView} from "react-native";
import {Stack, Box, Image, Center, Divider, Text, IconButton, Icon} from "native-base";
import Form from "./Form";
import gravestoneMedia from "~/assets/gravestone-media.png";
import ContainerBaseV2 from "~/components/common/ContainerBaseV2";
import {useAuthUserContext} from "~/context/authUser";
import {useIsFocused} from "@react-navigation/native";
import {SCREEN_WIDTH} from "~/utils/utils";
import userService, {uploadUserPhoto} from "~/services/user";
import Loading from "~/components/Loading/Loading";
import * as ImagePicker from "expo-image-picker";
import * as mime from "react-native-mime-types";
import * as ImageManipulator from "expo-image-manipulator";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const ButtonImage=(props)=>{
    return (
        <IconButton
            w={"40px"}
            top={"60px"}
            left={"70px"}
            position={"absolute"}
            icon={<Icon as={MaterialCommunityIcons} name="pencil"/>}
            borderRadius="full"
            onPress={() => {
                props.pickImage()
            }}
            _icon={{
                color: "red.500",
                size: "sm",
            }}
            _hover={{
                bg: "red.500:alpha.30",
            }}
            _pressed={{
                bg: "primary_black.100:alpha.30",
                _icon: {
                    name: "pencil-outline",
                },
                _ios: {
                    _icon: {
                        size: "sm",
                    },
                },
            }}
            _ios={{
                _icon: {
                    size: "sm",
                },
            }}
        />
    )
}
const Profile = (props) => {
    const isFocused = useIsFocused();
    const {user,setUserDoc,setUserParam} = useAuthUserContext();
    const [profile, setProfile] = useState(null)
    const [firstName, setFirstName] = useState(user && user.userDoc.firstName)
    const [lastName, setLastName] = useState(user && user.userDoc.lastName)
    const [image,setImage] = useState(null)
    const [loadig, setLoading] = useState(false)

    useEffect(() => {
        console.log(user.userDoc)
        if (isFocused) {
            setProfile(user.userDoc)
        }
    }, [isFocused,user])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        result.type = mime.lookup(result.uri.split('/').pop());
        if (!result.cancelled) {
            let resizedImage = await ImageManipulator.manipulateAsync(
                result.uri, [{resize: {width: result.width / 2, height: result.height / 2}}],
                {format: result.type.split('/').pop(), base64: false});
            /// setImage(resizedImage.uri);
            setImage(resizedImage.uri)
        }
    };

    const changeImage=async (image_)=>{
        let res = "";
        if (image){
             res =  await userService.uploadUserPhoto(user.uid, image)
        }else {
            res = image_
        }
        return res
    }

    const handleSubmit = async (data, param) => {
        setLoading(true)
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
            phoneNumber,
            orders,
            role,
            photoURL: await changeImage(image ? image : photoURL)
        }

       const updateResult = await userService.updateUser(user.uid, newData);
       console.log(updateResult)
        if (updateResult.success){
            setUserDoc(newData)
            setImage(null)
            setLoading(false)
        }else {
            setImage(null)
            setLoading(false)
        }
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
                                        <Image size={"lg"} source={{uri: image ? image :profile.photoURL}} alt="gravestone picture"/>
                                        <ButtonImage pickImage={pickImage}/>
                                    </Box>
                                    :
                                    <Box bgColor="muted.300" pt="7" pb="7" pl="7" pr="7" borderRadius="lg">
                                        <Image source={gravestoneMedia} alt="gravestone picture"/>
                                        <ButtonImage pickImage={pickImage}/>
                                    </Box>

                            }
                            <Text fontSize={20}>
                                {firstName} {lastName}
                            </Text>
                        </Center>
                        <Divider mt="5" mb="5"/>
                        <Box>
                            <Form
                                setFirstName={setFirstName} setLastName={setLastName} profile={profile} onSubmit={handleSubmit}/>
                        </Box>
                    </Stack>
                </Center>
            </ScrollView>
            {
                loadig &&
                <Loading loading={loadig} text={"Loading..."} color={"white"}/>
            }
        </ContainerBaseV2>
    );
};

export default Profile;

