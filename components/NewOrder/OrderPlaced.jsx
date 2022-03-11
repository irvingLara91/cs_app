import React from "react";
import {TouchableHighlight} from "react-native";
import {Text, Center, Image, Heading, Box, Button, Flex} from "native-base";
import OrderSucceed from "~/assets/gravestone.png";
import screens from "~/constants/screens";

const OrderPlaced = ({navigation}) => {
    const {navigate} = navigation;
    return (
        <Center>
            <Box p="15" w="full" maxW="85%">
                <Center>
                    <Image mb="30" mt="30" source={OrderSucceed} alt="gravestone picture unboarding"/>
                    <Heading style={{textAlign: "center"}}>THANK YOU FOR YOUR ORDER</Heading>
                    <Text fontSize="10" mt="3" style={{textAlign: "center"}}>We will contact you soon to fine-tune
                        details.</Text>
                    <Flex direction="row" alignItems="center" justify="flex-start">
                        <Text fontSize="10" style={{textAlign: "center"}}>
                            You can check details of your order </Text>
                        <TouchableHighlight
                            onPress={() => navigate({name: screens.ORDER_DETAILS, params: {orderId: 1}})}>
                            <Text fontSize="11" underline>here</Text>
                        </TouchableHighlight>
                    </Flex>
                    <Box w="full" mt="5" mb="5">
                        <Button bgColor="dark.50" borderRadius="none"
                                onPress={() => navigate(screens.HOME)}>Continue</Button>
                    </Box>
                </Center>
            </Box>
        </Center>
    );
};

export default OrderPlaced; 