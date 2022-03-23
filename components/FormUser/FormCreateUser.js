import React, {useState} from "react";
import {TouchableOpacity, Text, View} from "react-native";
import {Controller, useForm} from "react-hook-form";
import {
    Center,
    CheckIcon,
    FormControl,
    Image,
    Input,
    Select,
    Stack,
} from "native-base";
import {roles, SCREEN_WIDTH, textSizeRender} from "~/utils/utils";
import {Feather} from "@expo/vector-icons";
import ContainerAdmin from "~/components/common/ContainerAdmin";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as mime from "react-native-mime-types";
import authService from "~/services/auth";
import Loading from "~/components/Loading/Loading";
import CustomModal from "~/components/Modals/CustomModal";

const defaultValues = {
    select: 3,
    input: ""
};
const FormCreateUser = (props) => {
    const [loading, setLoading] = useState(false)
    const {control,register,reset, handleSubmit, formState: {errors}} = useForm();
    const [image, setImage] = useState(null)
    const [imageError, setImageError] = useState(false)

    /***
     * States de CustomModal
     * **/
    const [customModalVisible, setCustomModalVisible] = useState(false)
    const [customModal, setCustomModal] = useState({})
    /***
     * End States de CustomModal
     * **/


    const resetData=()=>{
        setImage(null)
        reset({ defaultValues })
    }


    const onSubmit = async (data) => {
        if (image == null) {
            setImageError(true)
            return
        } else {
            setLoading(true)
            setImageError(false)
            const result = await authService.createUser({...data, isRegister: false, photo: image.uri})
            //console.log({result})
            if (result.success) {
                setCustomModalVisible(true)
                setCustomModal({isError: false, message: result.message})
                setLoading(false)
               await resetData();
            } else if (result.error) {
                setCustomModalVisible(true)
                setCustomModal({isError: true, message: result.message})
                setLoading(false)

            } else {
                setCustomModalVisible(true)
                setCustomModal({isError: true, message: result.message})
                setLoading(false)
            }
        }
    };


    const actions = (<View style={{flex: 1, alignItems: 'flex-end'}}>
        <View style={{flexDirection: 'row', width: "100%", justifyContent: 'flex-end'}}>
            <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={{
                    width: "45%",
                    flexDirection: 'row',
                    marginRight: 2,
                    alignItems: 'center',
                    backgroundColor: 'black',
                    padding: 10,
                    borderRadius: 20
                }}>
                <View style={{flex: 1}}>
                    <Text style={{
                        color: 'white',
                        textAlign: 'center',
                        fontFamily: "Roboto_700Bold", fontSize: textSizeRender(2.5)
                    }}>Save user</Text>
                </View>

            </TouchableOpacity>
        </View>
    </View>)


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
            setImage(result);
            setImageError(false)
            /// updateImageProfile(resizedImage)
        }
    };


    return (
        <ContainerAdmin title={"Create user"}
                        icon={<Feather name="users" size={30} color={"black"}/>}
                        actions={actions}>
            <View style={{
                paddingHorizontal: SCREEN_WIDTH * .05,
                marginBottom: SCREEN_WIDTH / 3.5
            }}>
                <Center pt="5" pb="5">
                    <Stack w="full">
                        <FormControl mb={3} isInvalid={"firstName" in errors}>
                            <FormControl.Label
                                _text={{
                                    color: "primary_black.900",
                                    fontFamily: "Roboto_700Bold",
                                    fontSize: textSizeRender(4),
                                }}
                            >First Name</FormControl.Label>
                            <Controller
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <Input
                                        height={SCREEN_WIDTH * .12}
                                        backgroundColor='primary_white.50'
                                        pl={5}
                                        variant="rounded"
                                        onBlur={onBlur}
                                        onChangeText={(text) => onChange(text)}
                                        value={value}
                                    />
                                )}
                                name="firstName"
                                rules={{required: "Field is required", minLength: 3}}
                                defaultValue=""
                            />
                            <FormControl.ErrorMessage>
                                {errors?.firstName?.message}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl mb={3} isInvalid={"lastName" in errors}>
                            <FormControl.Label
                                _text={{
                                    color: "primary_black.900",
                                    fontFamily: "Roboto_700Bold",
                                    fontSize: textSizeRender(4),
                                }}
                            >Last Name</FormControl.Label>
                            <Controller
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <Input
                                        height={SCREEN_WIDTH * .12}
                                        backgroundColor='primary_white.50'
                                        pl={5}
                                        variant="rounded"
                                        onBlur={onBlur}
                                        onChangeText={(text) => onChange(text)}
                                        value={value}
                                    />
                                )}
                                name="lastName"
                                rules={{required: "Field is required", minLength: 3}}
                                defaultValue=""
                            />
                            <FormControl.ErrorMessage>
                                {errors?.lastName?.message}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl mb={3} isInvalid={"email" in errors}>
                            <FormControl.Label
                                _text={{
                                    color: "primary_black.900",
                                    fontFamily: "Roboto_700Bold",
                                    fontSize: textSizeRender(4),
                                }}
                            >Email</FormControl.Label>
                            <Controller
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <Input
                                        height={SCREEN_WIDTH * .12}
                                        backgroundColor='primary_white.50'
                                        pl={5}
                                        autoCapitalize='none'
                                        variant="rounded"
                                        onBlur={onBlur}
                                        onChangeText={(text) => onChange(text)}
                                        value={value}
                                        keyboardType={"email-address"}
                                        {...register("email", {
                                            required: "required",
                                            pattern: {
                                                value: /\S+@\S+\.\S+/,
                                                message: "Entered value does not match email format"
                                            }
                                        })}
                                    />
                                )}
                                name="email"
                                rules={{required: "Field is required", minLength: 3}}
                                defaultValue=""
                            />
                            <FormControl.ErrorMessage>
                                {errors?.email?.message}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl mb={3} isInvalid={"phoneNumber" in errors}>
                            <FormControl.Label
                                _text={{
                                    color: "primary_black.900",
                                    fontFamily: "Roboto_700Bold",
                                    fontSize: textSizeRender(4),
                                }}
                            >Phone Number</FormControl.Label>
                            <Controller
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <Input
                                        height={SCREEN_WIDTH * .12}
                                        backgroundColor='primary_white.50'
                                        pl={5}
                                        variant="rounded"
                                        onBlur={onBlur}
                                        onChangeText={(text) => onChange(text)}
                                        value={value}
                                        keyboardType={"phone-pad"}
                                    />
                                )}
                                name="phoneNumber"
                                rules={{required: "Field is required", minLength: 3,maxLength:12}}
                                defaultValue=""
                            />
                            <FormControl.ErrorMessage>
                                {errors?.phoneNumber?.message}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl mb={3} isInvalid={"role" in errors}>
                            <FormControl.Label
                                _text={{
                                    color: "primary_black.900",
                                    fontFamily: "Roboto_700Bold",
                                    fontSize: textSizeRender(4),
                                }}>Assign role</FormControl.Label>
                            <Controller
                                control={control}
                                render={({field: {onChange, value}}) => (
                                    <Select
                                        bg={"primary_white.50"}
                                        pl={5}
                                        selectedValue={value}
                                        onValueChange={(itemValue) => {
                                            onChange(itemValue);
                                        }}
                                        variant="rounded"
                                        height={SCREEN_WIDTH * .12}

                                        _selectedItem={{
                                            bg: "primary_white.50",
                                            endIcon: <CheckIcon size={4}/>
                                        }}
                                    >
                                        {
                                            roles.map((role, index) =>
                                                <Select.Item
                                                    key={index}
                                                    label={role.label}
                                                    value={role.value}
                                                    disabled={role.value === 1}
                                                />
                                            )
                                        }
                                    </Select>
                                )}
                                name="role"
                                rules={{required: "Field is required"}}
                                defaultValue={3}
                            />
                            <FormControl.ErrorMessage>
                                {errors.role?.message}
                            </FormControl.ErrorMessage>
                        </FormControl>

                        <View style={{
                            marginTop: 10,
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: 'black',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            height: SCREEN_WIDTH / 2.1
                        }}>

                            <View style={{flex: 0, width: '100%'}}>
                                <View style={{
                                    flexDirection: 'row',
                                    orderBottomColor: 'black', borderBottomWidth: 1,
                                    alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20
                                }}>
                                    <View style={{flex: 1}}>
                                        <Text
                                            style={{
                                                fontFamily: "Roboto_700Bold", fontSize: textSizeRender(3),
                                            }}
                                        >Photo profile</Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                pickImage()
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: "Roboto_400Regular", fontSize: textSizeRender(3),
                                                    textDecorationLine: 'underline'
                                                }}
                                            >Add Image</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center'}}>

                                {
                                    image ?
                                        <Center>
                                            <Image alt="image" size="lg" resizeMode={"cover"} borderRadius={100}
                                                   source={{
                                                       uri: image.uri
                                                   }}/>
                                        </Center>
                                        :
                                        <View style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: "#C4C4C4",
                                            borderRadius: 100,
                                            padding: 6
                                        }}>
                                            <Image alt="image" size="lg" resizeMode={"cover"} borderRadius={100}
                                                   source={require("../../assets/image.png")}/>
                                        </View>

                                }
                            </View>
                        </View>
                        {
                            imageError &&
                            <Text style={{
                                color: "red",
                                fontSize: textSizeRender(2.9)
                            }}>Field is required</Text>
                        }
                    </Stack>
                </Center>
            </View>
            {
                loading &&
                <Loading loading={loading} color={"white"} text={"loading..."}/>
            }
            {

                customModalVisible &&
                <CustomModal visible={customModalVisible} setVisible={setCustomModalVisible} message={customModal.message} isError={customModal.isError}/>
            }

        </ContainerAdmin>
    )
};
export default FormCreateUser;