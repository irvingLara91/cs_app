import React, {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {Text, TouchableOpacity, View, Image} from "react-native";
import {Feather} from "@expo/vector-icons";
import ContainerAdmin from "~/components/common/ContainerAdmin";
import {roles, SCREEN_WIDTH, textSizeRender} from "~/utils/utils";
import {Center, CheckIcon, Divider, FormControl, Input, Select, Stack} from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as mime from "react-native-mime-types";
import * as ImageManipulator from "expo-image-manipulator";
import {FAKE_USER_DETAILS} from "~/utils";
import ContainOrdersAssignedList from "~/components/ContainerList/ContainOrdersAssignedList";


const ImgDefault = () => {
    return<Image
            style={{
                width: 50,
                height: 50,
                resizeMode: 'contain',
                borderRadius:50,
                borderWidth:3,
                borderColor:"#C4C4C4",
                backgroundColor: "#C4C4C4",
                padding: 15
            }}
            defaultSource={require("../../assets/image.png")}
            source={require("../../assets/image.png")}/>
}


const FormEditUser = (props) => {
    const {control, setValue, handleSubmit, formState: {errors}} = useForm();
    const [image, setImage] = useState(null)
    const [imageError, setImageError] = useState(false)

    useEffect(() => {
        if (props.user) {
            setUser(props.user)
        }

    }, [])

    const setUser = (user) => {
        setValue("firstName", user.firstName);
        setValue("lastName", user.lastName);
        setValue("email", user.email);
        setValue("phone", user.phoneNumber);
        setValue("role", user.role);
        setImage(user.photoURL)
    }


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
            setImage(result.uri);
            setImageError(false)
        }
    };

    const onSubmit = (data) => {
        if (image == null) {
            setImageError(true)
            return
        } else {
            setImageError(false)
        }

        console.log("submiting with ", data, image);

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
                    backgroundColor: 'white',
                    padding: 0,
                    borderRadius: 20
                }}>
                <View style={{flex: 1}}>
                    <Text style={{
                        color: 'black',
                        textAlign: 'center',
                        fontFamily: "Roboto_700Bold", fontSize: textSizeRender(2.5)
                    }}>Save change</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    alert("delete")
                }}
                style={{
                    width: "43%",
                    flexDirection: 'row',
                    marginRight: 2,
                    alignItems: 'center',
                    backgroundColor: '#7E7B7B',
                    padding: 10,
                    borderRadius: 20
                }}>
                <View style={{flex: 1}}>
                    <Text style={{
                        color: 'white',
                        textAlign: 'center',
                        fontFamily: "Roboto_700Bold", fontSize: textSizeRender(2.5)
                    }}>Delete user</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>)

    return (
        <ContainerAdmin title={"User"} icon={<Feather name="users" size={30} color={"black"}/>}
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
                                    <View style={{
                                        flexDirection: 'row',
                                        flex: 1,
                                        alignItems: 'center',
                                    }}>
                                        <TouchableOpacity
                                            style={{marginRight: 5}}
                                            onPress={() => {
                                                pickImage()
                                            }}
                                        >
                                            {
                                                image ?
                                                    <Center>
                                                        <Image
                                                            style={{
                                                                width: 50,
                                                                height: 50,
                                                                resizeMode: 'cover',
                                                                borderRadius:50,
                                                                borderWidth:3,
                                                                borderColor:"#C4C4C4",
                                                                backgroundColor: "#C4C4C4",
                                                                padding: 15
                                                            }}
                                                            defaultSource={require("../../assets/image.png")}
                                                            source={{
                                                                uri: image
                                                            }}/>
                                                    </Center>
                                                    :
                                                    <ImgDefault/>

                                            }
                                        </TouchableOpacity>
                                        <Input
                                            flex={1}
                                            height={SCREEN_WIDTH * .12}
                                            backgroundColor='primary_white.50'
                                            pl={5}
                                            variant="rounded"
                                            onBlur={onBlur}
                                            onChangeText={(text) => onChange(text)}
                                            value={value}
                                        />

                                    </View>
                                )}
                                name="firstName"
                                rules={{required: "Field is required", minLength: 3}}
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
                                        variant="rounded"
                                        onBlur={onBlur}
                                        onChangeText={(text) => onChange(text)}
                                        value={value}
                                        keyboardType={"email-address"}
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
                        <FormControl mb={3} isInvalid={"phone" in errors}>
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
                                name="phone"
                                rules={{required: "Field is required", minLength: 3}}
                                defaultValue=""
                            />
                            <FormControl.ErrorMessage>
                                {errors?.phone?.message}
                            </FormControl.ErrorMessage>
                        </FormControl>
                        <FormControl mb={3} isInvalid={"role" in errors}>
                            <FormControl.Label
                                _text={{
                                    color: "primary_black.900",
                                    fontFamily: "Roboto_700Bold",
                                    fontSize: textSizeRender(4),
                                }}>Role</FormControl.Label>
                            <Controller
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
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
                            />
                            <FormControl.ErrorMessage>
                                {errors.role?.message}
                            </FormControl.ErrorMessage>
                        </FormControl>
                    </Stack>
                </Center>
                <Divider mb={5} bg={"primary_black.900"}/>
                <ContainOrdersAssignedList/>
            </View>
        </ContainerAdmin>

    )
}
export default FormEditUser;