import React, {useEffect, useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {TouchableOpacity, View, TextInput} from "react-native";
import {useIsFocused, useNavigation, useRoute} from "@react-navigation/native";
import {isNumber} from "../../utils/utils"
import {
    Box,
    VStack,
    Input,
    Button,
    FormControl,
    TextArea,
    Text
} from "native-base";
import MapView from "react-native-maps";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import ContainerBaseV2 from "~/components/common/ContainerBaseV2";
import Steps from "./Steps";
import screens from "~/constants/screens";
import {useNewOrderContext} from "~/context/newOrder";
import loading from "~/components/Loading/Loading";
import styles from "~/components/Register/styles";
import CustomButton from "~/components/CustomButton/CustomButton";


const DetailsStep = () => {
    return (
        <ContainerBaseV2>
            <Box alignItems="center" mb={20}>
                <Steps/>
                <Form/>
            </Box>
        </ContainerBaseV2>
    );
};


const Location = () => {
    const {navigate} = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigate(screens.NEW_ORDER_STEP_3_MAP, {screen: screens.NEW_ORDER_STEP_3})}>
            <Text mr="2" fontSize="11" underline>Locate in the map</Text>
        </TouchableOpacity>
    );
};


const Form = () => {
    const {textInput} = styles;
    const isFocused = useIsFocused();
    const {setOrderData} = useNewOrderContext();
    const {location} = useRoute().params ?? {};
    const {control, setValue, handleSubmit, formState: {errors}} = useForm();
    const [location_map, setLocation_map] = useState(null);
    const {navigate} = useNavigation();
    useEffect(() => {
        let locationVar = location;
        if (isFocused && locationVar) {
            setLocation_map(locationVar);
            setValue("address", locationVar.address);
        } else {
            setLocation_map(null);
            setValue("address", "");
        }

    }, [location, isFocused]);


    const onSubmit = (data) => {
        const {additionalInformation, address: addressState, gravestoneText} = data;
        const addressSplitted = addressState.split(",");
        const address = addressSplitted[0];
        const address2 = addressSplitted[1];
        const city = addressSplitted[2];
        const zipCode = addressSplitted[addressSplitted.length - 1];

        setOrderData((prevState) => {
            return {
                ...prevState,
                gravestone: {
                    ...prevState.gravestone,
                    additionalInformation,
                    text: gravestoneText,
                    address: {
                        address,
                        address2,
                        city,
                        zipCode: isNumber(zipCode) ? zipCode : ""
                    }
                }
            }
        })
        navigate(screens.NEW_ORDER_STEP_4);
    };
    return (
        <VStack w="full" maxW={280} mt="30" mb={50} space={3} alignItems="center">
            <FormControl isRequired isInvalid={"gravestoneText" in errors}>
                <FormControl.Label>Gravestone text</FormControl.Label>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style={textInput}
                            variant="outline"
                            onBlur={onBlur}
                            onChangeText={(text) => onChange(text)}
                            value={value}
                        />
                    )}
                    name="gravestoneText"
                    rules={{required: "Field is required", minLength: 3}}
                    defaultValue=""
                />
                <FormControl.ErrorMessage>
                    {errors?.gravestoneText?.message}
                </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={"additionalInformation" in errors}>
                <FormControl.Label>Additional information</FormControl.Label>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style={[textInput, {height: 100, textAlignVertical: 'top',}]}
                            multiline={true}
                            numberOfLines={10}
                            variant="outline"
                            onBlur={onBlur}
                            onChangeText={(text) => onChange(text)}
                            value={value}
                        />
                    )}
                    name="additionalInformation"
                    rules={{required: "Field is required", minLength: 3}}
                    defaultValue=""
                />
                <FormControl.ErrorMessage>
                    {errors?.additionalInformation?.message}
                </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={"address" in errors}>
                <FormControl.Label>Address</FormControl.Label>
                {

                    !isFocused ?
                        null
                        :

                        location_map &&
                        <View style={{marginVertical: 8}}>
                            <MapView
                                minZoomLevel={2}  // default => 0
                                maxZoomLevel={20}
                                style={{width: '100%', height: 150, marginBottom: 32, borderRadius: 9}}
                                initialRegion={{
                                    latitude: location_map.points.latitude,
                                    longitude: location_map.points.longitude,
                                    latitudeDelta: 0.023,
                                    longitudeDelta: 0.023,
                                }}
                                scrollEnabled={false}
                                rotateEnabled={false}
                                zoomEnabled={false}

                            >
                                <MapView.Marker
                                    coordinate={{
                                        latitude: location_map.points.latitude,
                                        longitude: location_map.points.longitude,
                                        latitudeDelta: 0.023,
                                        longitudeDelta: 0.023,
                                    }}>
                                    <MaterialCommunityIcons name="map-marker" size={30}
                                                            color={'black'}
                                                            style={{marginBottom: 8}}/>
                                </MapView.Marker>
                            </MapView>
                        </View>
                }
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <View style={[textInput, {flexDirection: 'row'}]}>

                            <TextInput
                                style={{flex: 1, marginLeft: 4, marginRight: 5}}
                                name={"address"}
                                variant="outline"
                                onBlur={onBlur}
                                onChangeText={(text) => onChange(text)}
                                value={value}
                            />
                            <Location/>
                        </View>
                    )}
                    name="address"
                    rules={{required: "Field is required", minLength: 3}}
                    defaultValue=""
                />
                <FormControl.ErrorMessage>
                    {errors?.address?.message}
                </FormControl.ErrorMessage>
            </FormControl>

            <CustomButton onPress={handleSubmit(onSubmit)}
                          title={"Continue"}
                          textColor={"#fff"}
                          gradient={["#555555", "#171717"]}
                          borderRadius={10}/>
        </VStack>
    );
};


export default DetailsStep;