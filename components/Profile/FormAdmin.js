import {Button, FormControl, Input, Text, TextArea, VStack} from "native-base";
import {useForm, Controller} from "react-hook-form";
import {TouchableOpacity, View, TextInput} from "react-native";
import MapView from "react-native-maps";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import screens from "~/constants/screens";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";


const Location = (props) => {
    const {navigate} = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigate(screens.NEW_ORDER_STEP_3_MAP, {screen: screens.NEW_ORDER_STEP_3})}>
            <Text mr="2" fontSize="11" underline>Change Password</Text>
        </TouchableOpacity>
    );
};

const FormAdmin = (props) => {
    const {control, setValue, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = (data) => {
        console.log({data});

    };

    return (
        <VStack w="full" maxW={SCREEN_WIDTH} mb={SCREEN_WIDTH / 3.5} space={3} alignItems="center">
            <FormControl isInvalid={"name" in errors}>
                <FormControl.Label _text={{
                    color: "primary_black",
                    fontFamily: "Roboto_700Bold",
                    fontSize: textSizeRender(4),
                }}>Name</FormControl.Label>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <Input
                            height={SCREEN_WIDTH * .12}
                            _light={{
                                paddingLeft:5,
                                borderColor: 'primary_black.100',
                                backgroundColor: 'primary_white.50',
                            }} _dark={{
                            backgroundColor: 'primary_white.50'
                        }}
                            variant="rounded"
                            name={"name"}
                            onBlur={onBlur}
                            onChangeText={(text) => onChange(text)}
                            value={value}
                        />
                    )}
                    name="name"
                    rules={{required: "Field is required", minLength: 3}}
                    defaultValue=""
                />
                <FormControl.ErrorMessage>
                    {errors?.name?.message}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={"email" in errors}>
                <FormControl.Label _text={{
                    color: "primary_black",
                    fontFamily: "Roboto_700Bold",
                    fontSize: textSizeRender(4),
                }}>Email</FormControl.Label>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <Input
                            height={SCREEN_WIDTH * .12}
                            _light={{
                                paddingLeft:5,
                                borderColor: 'primary_black.100',
                                backgroundColor: 'primary_white.50',
                            }} _dark={{
                            borderColor: 'primary_black.100',
                            backgroundColor: 'primary_white.50',
                        }}
                            variant="rounded"
                            name={"email"}
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

            <FormControl isInvalid={"phone" in errors}>
                <FormControl.Label _text={{
                    color: "primary_black",
                    fontFamily: "Roboto_700Bold",
                    fontSize: textSizeRender(4),
                }}>Phone Number</FormControl.Label>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <Input
                            height={SCREEN_WIDTH * .12}
                            _light={{
                                paddingLeft:5,
                                borderColor: 'primary_black.100',
                                backgroundColor: 'primary_white.50',
                            }} _dark={{
                            borderColor: 'primary_black.100',
                            backgroundColor: 'primary_white.50',
                        }}
                            variant="rounded"
                            name={"phone"}
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


            <FormControl>
                <FormControl.Label
                    _text={{
                        color: "primary_black",
                        fontFamily: "Roboto_700Bold",
                        fontSize: textSizeRender(4),
                    }}
                >Password</FormControl.Label>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <Input
                            height={SCREEN_WIDTH * .12}
                            _light={{
                                paddingLeft:5,
                                borderColor: 'primary_black.100',
                                backgroundColor: 'primary_white.50',
                            }} _dark={{
                            borderColor: 'primary_black.100',
                            backgroundColor: 'primary_white.50',
                        }}
                            name={"password"}
                            InputRightElement={<Location/>}
                            variant="rounded"
                            onBlur={onBlur}
                            secureTextEntry={true}
                            onChangeText={(text) => onChange(text)}
                            value={value}
                        />
                    )}
                    name="password"
                />
            </FormControl>
            <Button borderRadius="none" bgColor="dark.50" onPress={handleSubmit(onSubmit)} size="lg"
                    style={{width: "100%"}}>
                Continue
            </Button>
        </VStack>

    )
};
export default FormAdmin;
