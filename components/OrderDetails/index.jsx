import React, {useEffect, useState} from "react";
import {Stack, Center, Divider, Text, Box, Heading, Image, Flex, View, ScrollView} from "native-base";
import Status from "./Status";
import ordersService from "~/services/orders";
import moment from "moment";

const OrderDetails = ({route}) => {

    const [details, setDetails] = useState({});

    useEffect(async () => {
        const getOrderDetails = async () => {
            const result = await ordersService.getOrder(route.params.orderId);
            setDetails(result.message);
        };
        await getOrderDetails();
    }, []);

    return (
        <ScrollView style={{backgroundColor:"white"}}>
            <Stack p="5">
                <Box w="full" borderWidth="1" borderRadius="lg">
                    <Center>
                        <Text>Order:</Text>
                        <Text fontSize="24" fontWeight="bold">{route.params.orderId}</Text>
                        <Text>{moment(details?.createdAt?.seconds * 1000, "", "en").format('MM/DD/YYYY')}</Text>
                    </Center>
                </Box>
                <Flex direction="column">
                    <Heading mt="5" mb="5">Order Details</Heading>
                    <Flex direction="row" w="full" justify="space-between" align="center" borderWidth={1} borderRadius="lg"
                        p="5">
                        <Text fontWeight="bold">Gravestone Picture</Text>
                        <Box bgColor="muted.300" pt="5" pb="5" pl="10" pr="10" borderRadius="lg">
                            <Image source={{uri: details?.gravestone?.image}} w="20" h="20" alt="gravestone picture"/>
                        </Box>
                    </Flex>
                    <Box mt="5">
                        <Text fontWeight="bold">Gravestone text</Text>
                        <Text>{details?.gravestone?.text}</Text>
                    </Box>
                    <Box mt="5">
                        <Text fontWeight="bold">Additional instructions</Text>
                        <Text>{details?.gravestone?.additionalInformation}</Text>
                    </Box>
                    <Box mt="5">
                        <Text fontWeight="bold">Gravestone address</Text>
                        <Text>{`${details?.gravestone?.address.address} ${details?.gravestone?.address.address2 ? details?.gravestone?.address.address2 : ""}, ${details?.gravestone?.address.city}, ${details?.gravestone?.address.zipCode}`}</Text>
                    </Box>
                </Flex>
                <Divider mt="5"/>
                <Box mt="5">
                    <Status code={details?.statusCode} />
                </Box>
                <Divider mt="2"/>

            </Stack>
        </ScrollView>
    );
};

export default OrderDetails;