import React, {useState} from "react";
import {TouchableOpacity, Text, View} from "react-native";
import {Controller, useForm} from "react-hook-form";
import {
    Button,
    Center,
    CheckIcon, Divider,
    FormControl,
    Image,
    Input,
    Select,
    Stack,
} from "native-base";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";
import {Feather} from "@expo/vector-icons";
import ContainerAdmin from "~/components/common/ContainerAdmin";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as mime from "react-native-mime-types";

const FormCreateUser = (props) => {
    const {control, handleSubmit, formState: {errors}} = useForm();
    const [image, setImage] = useState(null)
    const [imageError, setImageError] = useState(false)

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
            console.log(result)
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
                                    color: "primary_black",
                                    fontFamily: "Roboto_700Bold",
                                    fontSize: textSizeRender(4),
                                }}
                            >First Name</FormControl.Label>
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
                        <FormControl mb={3} isInvalid={"Rol" in errors}>
                            <FormControl.Label
                                _text={{
                                    color: "primary_black",
                                    fontFamily: "Roboto_700Bold",
                                    fontSize: textSizeRender(4),
                                }}>Assign role</FormControl.Label>
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
                                defaultValue={3}
                            />
                            <FormControl.ErrorMessage>
                                {errors.rol?.message}
                            </FormControl.ErrorMessage>
                        </FormControl>

                        <View style={{
                            marginTop:10,
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
                                                <Image size="lg" resizeMode={"cover"} borderRadius={100}
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
                                                <Image size="lg" resizeMode={"cover"} borderRadius={100}
                                                       source={require("../../assets/image.png")}/>
                                            </View>

                                    }
                            </View>
                        </View>
                        {
                            imageError &&
                            <Text style={{
                                color:"red",
                                fontSize:textSizeRender(2.9)
                            }}>Field is required</Text>
                        }
                    </Stack>
                </Center>
            </View>
        </ContainerAdmin>
    )
};
export default FormCreateUser;