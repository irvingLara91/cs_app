import React from "react";
import {Actionsheet, Box, ScrollView} from "native-base";
import {Text} from "react-native";
import {textSizeRender} from "~/utils/utils";
const ChangeStatusComponent = ({send, selected, options = [], title = "", ...props}) => {

    const sendData = (item) => {
        send(item)
    }
    return (
        <Actionsheet isOpen={props.isOpen} onClose={props.onClose}>
            <Actionsheet.Content bg={'white'}>
                <Box w="100%" h={60} px={4} justifyContent="center">
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: textSizeRender(5)
                    }}>
                        {title}
                    </Text>
                </Box>
                <ScrollView style={{width: '100%'}}>
                    {
                        options.map((item, index) => {
                            return (
                                <Actionsheet.Item
                                    _pressed={{
                                        bg: selected === item.id ? 'primary_black.50' : 'primary_black.50',
                                        _text: {
                                            fontSize: textSizeRender(4.3),
                                        }
                                    }}

                                    bg={selected === item.id ? 'primary_black.50' : 'white'}
                                    key={index} onPress={() => {
                                    sendData(item);
                                }}>{item.name}</Actionsheet.Item>
                            )
                        })
                    }
                </ScrollView>
            </Actionsheet.Content>
        </Actionsheet>
    )
};
export default ChangeStatusComponent;
