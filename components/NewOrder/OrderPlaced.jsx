import React from "react";
import {TouchableHighlight} from "react-native";
import {Text, Center, Image, Heading, Box, Button, Flex} from "native-base";
import OrderSucceed from "~/assets/icon_thankyoufororder.png";
import screens from "~/constants/screens";
import CustomButton from "~/components/CustomButton/CustomButton";
import {textSizeRender} from "~/utils/utils";
import {Roboto_400Regular} from "@expo-google-fonts/roboto";

const OrderPlaced = ({navigation}) => {
    const {navigate} = navigation;
    return (
        <Center>
            <Box p="15" w="full" maxW="85%">
                <Center>
                    <Image mb="30" mt="30" source={OrderSucceed} alt="gravestone picture unboarding"/>
                    <Heading style={{textAlign: "center" ,  color:"black",fontFamily:"Roboto_500Medium"}}>THANK YOU FOR YOUR ORDER</Heading>
                    <Text fontFamily="Roboto_400Regular" fontSize={textSizeRender(2.7)} mt="3" style={{textAlign: "center"}}>We will contact you soon to fine-tune
                        details.</Text>
                    <Flex direction="row" alignItems="center" justify="flex-start">
                        <Text fontFamily="Roboto_400Regular" fontSize={textSizeRender(2.7)} style={{textAlign: "center"}}>
                            You can check details of your order </Text>
                        <TouchableHighlight
                            onPress={() => navigate({name: screens.ORDER_DETAILS, params: {orderId: 1}})}>
                            <Text fontFamily="Roboto_500Medium" fontSize={textSizeRender(3)} underline> here</Text>
                        </TouchableHighlight>
                    </Flex>
                    <Box w="full" mt="5" mb="5">
                        <CustomButton onPress={()=>navigate(screens.HOME)}
                                      title={"Continue"}
                                      textColor={"#fff"}
                                      gradient={["#555555","#171717"]}
                                      borderRadius={10} />
                    </Box>
                </Center>
            </Box>
        </Center>
    );
};

export default OrderPlaced;
