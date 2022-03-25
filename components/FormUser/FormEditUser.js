import React, {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {Text, TouchableOpacity, View, Image,TextInput} from "react-native";
import {Feather} from "@expo/vector-icons";
import ContainerAdmin from "~/components/common/ContainerAdmin";
import {roles, SCREEN_WIDTH, textSizeRender} from "~/utils/utils";
import {Center, CheckIcon, Divider, FormControl, Input, Select, Stack} from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as mime from "react-native-mime-types";
import * as ImageManipulator from "expo-image-manipulator";
import ContainOrdersAssignedList from "~/components/ContainerList/ContainOrdersAssignedList";
import ordersService from "~/services/orders";
import {LinearGradient} from "expo-linear-gradient";
import styles from "~/components/Register/styles";


const ImgDefault = () => {
    return <Image
        style={{
            width: 20,
            height: 20,
            resizeMode: 'contain',
            borderRadius: 50,
            borderWidth: 3,
            borderColor: "#C4C4C4",
            backgroundColor: "#C4C4C4",
            padding: 12
        }}
        defaultSource={require("../../assets/image.png")}
        source={require("../../assets/image.png")}/>
}


const FormEditUser = (props) => {
    const {textInput} = styles;
    const {control, setValue, handleSubmit, formState: {errors}} = useForm();
    const [image, setImage] = useState(null)
    const [orders, setOrders] = useState([])
    const [imageError, setImageError] = useState(false)


    const getOrders = async (array) => {
        ordersService.getOrdersAssigned(array).then(response=>{
            setOrders(response)
        }).catch(error=>{
            console.log(error)
            setOrders([])
        });
    };

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
        getOrders(user.orders && user.orders.length > 0 ? user.orders : [])
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

    const actions_ = (<View style={{flex: 1, alignItems: 'flex-end'}}>
        <View style={{flexDirection: 'row', width: "100%", justifyContent: 'flex-end'}}>
            <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={{
                    width: "50%",
                    height: SCREEN_WIDTH * .09,
                }}>
                <LinearGradient colors={["#838B95", "#4A4E54"]} style={{
                    width: "100%",
                    height: '100%',
                    justifyContent: 'center',
                    marginRight: 2,
                    alignItems: 'center',
                    padding: 10,
                    borderRadius: 17
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: "Roboto_700Bold", fontSize: textSizeRender(2.2), color: 'white'
                    }}>Save change</Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={()=>{
                    alert("delete")
                }}
                style={{
                    marginLeft:5,
                    width: "50%",
                    height: SCREEN_WIDTH * .09,
                }}>
                <LinearGradient colors={["#555555", "#171717"]} style={{
                    width: "100%",
                    height: '100%',
                    justifyContent: 'center',
                    marginRight: 2,
                    alignItems: 'center',
                    padding: 10,
                    borderRadius: 17
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: "Roboto_700Bold", fontSize: textSizeRender(2.2), color: 'white'
                    }}>Delete</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    </View>)



    return (
        <ContainerAdmin title={"User"} icon={<Feather name="users" size={30} color={"black"}/>}
                        actions={actions_}>
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
                                    <View style={[textInput,{
                                        flexDirection: 'row',
                                        flex: 1,
                                        alignItems: 'center',
                                    }]}>
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
                                                                width: 23,
                                                                height: 23,
                                                                resizeMode: 'cover',
                                                                borderRadius: 50,
                                                                borderWidth: 2,
                                                                borderColor: "#eeeeee",
                                                                backgroundColor: "#C4C4C4",
                                                                padding: 13
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
                                        <TextInput
                                            flex={1}
                                            height={SCREEN_WIDTH * .09}
                                            pl={5}
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
                                    <TextInput
                                        style={textInput}
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
                                    <TextInput
                                        style={textInput}
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
                                    <TextInput
                                        style={textInput}
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
                        <View style={{
                            backgroundColor: '#F4F4F4',
                            marginBottom: 10
                        }}>
                            <Text style={{
                                color: "primary_black.900",
                                fontFamily: "Roboto_700Bold",
                                fontSize: textSizeRender(4)
                            }}>Assign role</Text>
                        </View>
                        <FormControl
                            style={{
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0, height: 4,
                                },
                                shadowOpacity: 0.30,
                                shadowRadius: 2.65,
                                elevation: 8,
                            }}
                            mb={3} isInvalid={"role" in errors}>
                            <Controller
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <Select
                                        bg={"primary_white.50"}
                                        borderRadius={8}
                                        borderColor='#C4C4C4'
                                        borderWidth={.5}
                                        selectedValue={value}
                                        onValueChange={(itemValue) => {
                                            onChange(itemValue);
                                        }}
                                        variant="rounded"
                                        height={SCREEN_WIDTH * .11}
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
                <ContainOrdersAssignedList user={props.user && props.user} orders={orders ? orders: []}/>
            </View>
        </ContainerAdmin>

    )
}
export default FormEditUser;