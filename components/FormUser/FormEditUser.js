import React, {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {Text, TouchableOpacity, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import ContainerAdmin from "~/components/common/ContainerAdmin";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";
import {Center, CheckIcon, Divider, FormControl, Image, Input, Select, Stack} from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as mime from "react-native-mime-types";
import * as ImageManipulator from "expo-image-manipulator";
import {FAKE_USER_DETAILS} from "~/utils";
import ContainOrdersAssignedList from "~/components/ContainerList/ContainOrdersAssignedList";

const FormEditUser = (props) => {
    const {control, setValue, handleSubmit, formState: {errors}} = useForm();
    const [image, setImage] = useState(null)
    const [imageError, setImageError] = useState(false)

    useEffect(() => {
        setUser()
    }, [])

    const setUser = () => {
        setValue("firstName", FAKE_USER_DETAILS.fullName);
        setValue("lastName", FAKE_USER_DETAILS.lastName);
        setValue("email", FAKE_USER_DETAILS.email);
        setValue("phone", FAKE_USER_DETAILS.phone);
        setValue("rol", FAKE_USER_DETAILS.rol);
        setImage("https://www.w3schools.com/css/img_lights.jpg")

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
            setImage(resizedImage.uri);
            setImageError(false)
        }
    };

    const onSubmit = (data) => {
        if (image==null){
            setImageError(true)
            return
        }else {
            setImageError(false)
        }

        console.log("submiting with ", data,image);

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
                onPress={()=>{
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
                                    color: "primary_black",
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
                                                        <Image size="xs" resizeMode={"cover"} borderRadius={50}
                                                               source={{
                                                                   uri: image
                                                               }}/>
                                                    </Center>
                                                    :
                                                    <View style={{
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        backgroundColor: "#C4C4C4",
                                                        borderRadius: 1000,
                                                        padding: 5
                                                    }}>
                                                        <Image size={8} resizeMode={"contain"}
                                                               source={require("../../assets/image.png")}/>
                                                    </View>
                                            }
                                        </TouchableOpacity>
                                        <Input
                                            flex={1}
                                            height={SCREEN_WIDTH * .12}
                                            _light={{
                                                paddingLeft: 5,
                                                backgroundColor: 'primary_white.50',
                                            }} _dark={{
                                            paddingLeft: 5,
                                            backgroundColor: 'primary_white.50',
                                        }}
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
                                    color: "primary_black",
                                    fontFamily: "Roboto_700Bold",
                                    fontSize: textSizeRender(4),
                                }}
                            >Last Name</FormControl.Label>
                            <Controller
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <Input
                                        height={SCREEN_WIDTH * .12}
                                        _light={{
                                            paddingLeft: 5,
                                            backgroundColor: 'primary_white.50',
                                        }} _dark={{
                                        paddingLeft: 5,
                                        backgroundColor: 'primary_white.50',
                                    }}
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
                                    color: "primary_black",
                                    fontFamily: "Roboto_700Bold",
                                    fontSize: textSizeRender(4),
                                }}
                            >Email</FormControl.Label>
                            <Controller
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <Input
                                        height={SCREEN_WIDTH * .12}
                                        _light={{
                                            paddingLeft: 5,
                                            backgroundColor: 'primary_white.50',
                                        }} _dark={{
                                        paddingLeft: 5,
                                        backgroundColor: 'primary_white.50',
                                    }}
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
                                    color: "primary_black",
                                    fontFamily: "Roboto_700Bold",
                                    fontSize: textSizeRender(4),
                                }}
                            >Phone Number</FormControl.Label>
                            <Controller
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <Input
                                        height={SCREEN_WIDTH * .12}
                                        _light={{
                                            paddingLeft: 5,
                                            backgroundColor: 'primary_white.50',
                                        }} _dark={{
                                        paddingLeft: 5,
                                        backgroundColor: 'primary_white.50',
                                    }}
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
                        <FormControl mb={3} isInvalid={"rol" in errors}>
                            <FormControl.Label
                                _text={{
                                    color: "primary_black",
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
                                            [{label: "Administrator", value: 2}, {
                                                label: "Technician",
                                                value: 3
                                            }].map((rol, index) =>
                                                <Select.Item key={index}
                                                             label={rol.label}
                                                             value={rol.value}/>
                                            )
                                        }
                                    </Select>
                                )}
                                name="rol"
                                rules={{required: "Field is required"}}
                            />
                            <FormControl.ErrorMessage>
                                {errors.rol?.message}
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