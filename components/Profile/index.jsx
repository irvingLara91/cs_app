import React, {useEffect, useState} from "react";
import {ScrollView,View} from "react-native";
import {Stack, Box, Image, Center, Divider, Text, IconButton, Icon} from "native-base";
import Form from "./Form";
import gravestoneMedia from "~/assets/gravestone-media.png";
import ContainerBaseV2 from "~/components/common/ContainerBaseV2";
import {useAuthUserContext} from "~/context/authUser";
import {useIsFocused} from "@react-navigation/native";
import {errorMessage, SCREEN_WIDTH} from "~/utils/utils";
import userService, {uploadUserPhoto} from "~/services/user";
import Loading from "~/components/Loading/Loading";
import * as ImagePicker from "expo-image-picker";
import * as mime from "react-native-mime-types";
import * as ImageManipulator from "expo-image-manipulator";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import CustomModal from "~/components/Modals/CustomModal";
import {LinearGradient} from "expo-linear-gradient";

const ButtonImage = (props) => {
    return (
            <IconButton
                bg={"primary_white.50"}
                w={"40px"}
                top={"0px"}
                left={"70px"}
                position={"absolute"}
                icon={<Icon as={MaterialCommunityIcons} name="pencil"/>}
                borderRadius="full"
                onPress={() => {
                    props.pickImage()
                }}
                _icon={{
                    color: "primary_black.500",
                    size: "sm",
                }}
                _hover={{
                    bg: "primary_black.100",
                }}
                _pressed={{
                    bg: "primary_black.100",
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
    const {user, setUserDoc, setUserParam} = useAuthUserContext();
    const [profile, setProfile] = useState(null)
    const [firstName, setFirstName] = useState(user && user.userDoc.firstName)
    const [lastName, setLastName] = useState(user && user.userDoc.lastName)
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)

    /***
     * States de CustomModal
     * **/
    const [modalVisible, setModalVisible] = useState(false)
    const [message, setMessage] = useState("")
    const [isError, setIsError] = useState(false)

    /***
     * End States de CustomModal
     * **/

    useEffect(() => {
        console.log(user.userDoc)
        if (isFocused) {
            setProfile(user.userDoc)
        }
    }, [isFocused, user])

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

    // const changeImage=async (image_)=>{
    //     let res = "";
    //     if (image){
    //          res =  await userService.uploadUserPhoto(user.uid, image)
    //     }else {
    //         res = image_
    //     }
    //     return res
    // }

    const handlePhotoURL = async (photoURL, userId = "") => {
        if (image) {
            if (photoURL !== "" && photoURL.match(userId)) {
                return await userService.updateUserPhoto(user.uid ? user.uid :user.userId, image)
            } else {
                return await userService.uploadUserPhoto(user.uid ? user.uid :user.userId, image)
            }
        } else return photoURL;
    }

    const handleSubmit = async (data, param) => {
        setLoading(true)
        const {address, city, zipCode, email, firstName, lastName, phoneNumber} = data;
        const {orders, role, photoURL} = user.userDoc;

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
            photoURL: await handlePhotoURL(photoURL, user.uid ? user.uid :user.userId)
        }  
        const updateResult = await userService.updateUser(user.uid ? user.uid :user.userId, newData);
        if (updateResult.success) {
            setTimeout(() => {
                console.log("newData",newData)
                 setUserDoc(newData)
                setImage(null)
                setLoading(false)
                setMessage("Update profile successfully.")
                setModalVisible(true)
                setIsError(false)
            }, 500);
        } else {
            setTimeout(() => {
                setImage(null)
                setLoading(false)
                setMessage("Failed to update profile.")
                setModalVisible(true)
                setIsError(true)
            }, 500);

        }
    }

    return (
        <ContainerBaseV2 backgroundColor={"white"}>
            <ScrollView>
                <Center mb={SCREEN_WIDTH * .5}>
                    <View>
                        <LinearGradient colors={["#555555","#171717"]} style={{alignItems:'center',paddingVertical:20}}>
                            {
                                image ?
                                    <View>
                                        <Image borderWidth={1} style={{borderColor:"white"}}  borderRadius={SCREEN_WIDTH } size={"lg"} source={{uri: image}}
                                               alt="gravestone picture"/>
                                        <ButtonImage pickImage={pickImage}/>
                                    </View>
                                    :
                                profile?.photoURL ?
                                    <View>
                                        <Image borderWidth={1} style={{borderColor:"white"}}  borderRadius={SCREEN_WIDTH } size={"lg"} source={{uri:profile.photoURL}}
                                               alt="gravestone picture"/>
                                        <ButtonImage pickImage={pickImage}/>
                                    </View>
                                    :
                                    <Box bgColor="muted.300" pt="7" pb="7" pl="7" pr="7" borderRadius={100}>
                                        <Image source={gravestoneMedia} alt="gravestone picture"/>
                                        <ButtonImage pickImage={pickImage}/>
                                    </Box>

                            }
                            <Text color={"white"} mt={5} fontSize={20}>
                                {firstName} {lastName}
                            </Text>
                        </LinearGradient>
                        <Divider mt="5" mb="5"/>
                        <View style={{paddingHorizontal:SCREEN_WIDTH*.15}}>
                            <Form
                                setFirstName={setFirstName} setLastName={setLastName} profile={profile}
                                onSubmit={handleSubmit}/>
                        </View>
                    </View>
                </Center>
            </ScrollView>
            {
                loading &&
                <Loading loading={loading} text={"Loading..."} color={"white"}/>
            }

            {
            modalVisible &&
            <CustomModal message={message} visible={modalVisible} setVisible={setModalVisible} isError={isError}/>

            }
        </ContainerBaseV2>
    );
};

export default Profile;

