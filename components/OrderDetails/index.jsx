import React, {useEffect, useState} from "react";
import {Stack, Center, Divider, Text, Box, Heading, Image, Flex, View} from "native-base";
import Status from "./Status";
import ordersService from "~/services/orders";
import gravestoneMedia from "~/assets/gravestone-media.png";
import LineOrderStatus from "~/components/LineOrderStatus/LineOrderStatus";

const OrderDetails = ({route}) => {

    const [details, setDetails] = useState({});

    useEffect(async () => {
        const getOrderDetails = async () => {
            const result = await ordersService.getOrderDetails(route.params.orderId);
            setDetails(result);
        };
      await getOrderDetails();
    }, []);

    return (
        <Stack p="5">
            <Box w="full" borderWidth="1" borderRadius="lg">
                <Center>
                    <Text>Order:</Text>
                    <Text fontSize="24" fontWeight="bold">{route.params.orderId}</Text>
                    <Text>{details.date}</Text>
                </Center>
            </Box>
            <Flex direction="column">
                <Heading mt="5" mb="5">Order Details</Heading>
                <Flex direction="row" w="full" justify="space-between" align="center" borderWidth={1} borderRadius="lg"
                      p="5">
                    <Text fontWeight="bold">Gravestone Picture</Text>
                    <Box bgColor="muted.300" pt="5" pb="5" pl="10" pr="10" borderRadius="lg">
                        <Image source={gravestoneMedia} alt="gravestone picture"/>
                    </Box>
                </Flex>
                <Box mt="5">
                    <Text fontWeight="bold">Gravestone text</Text>
                    <Text>{details.text}</Text>
                </Box>
                <Box mt="5">
                    <Text fontWeight="bold">Additional instructions</Text>
                    <Text>{details.additionalInstructions}</Text>
                </Box>
                <Box mt="5">
                    <Text fontWeight="bold">Gravestone address</Text>
                    <Text>{details.address}</Text>
                </Box>
            </Flex>
            <Divider mt="5"/>
            <Box mt="5">
                <Status {...details.status} />
            </Box>
            <Divider mt="2"/>

        </Stack>
    );
};

export default OrderDetails;