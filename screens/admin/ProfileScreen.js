import React from "react";
import {Dimensions, StyleSheet, TouchableOpacity, View} from "react-native";
import {Text, VStack} from "native-base";
import ContainerAdmin from "~/components/common/ContainerAdmin";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import FormAdmin from "~/components/Profile/FormAdmin";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";
import screens from "~/constants/screens";
import {useNavigation} from "@react-navigation/native";

const FromProfileStatic = ({data = null, ...props}) => {
    const navigation = useNavigation();
    return (
        <VStack w="full"
                style={{
                    paddingHorizontal: SCREEN_WIDTH * .05
                }}
                maxW={SCREEN_WIDTH} mb={SCREEN_WIDTH / 3.5} space={3}>
            <View>
                <Text style={styles.textTitle}>Name</Text>
                <View style={styles.input}>
                    <Text style={styles.text}>{data && data.name && data.name}</Text>
                </View>
            </View>

            <View>
                <Text style={styles.textTitle}>Email</Text>
                <View style={styles.input}>
                    <Text style={styles.text}>{data && data.email && data.email}</Text>
                </View>
            </View>

            <View>
                <Text style={styles.textTitle}>Phone Number</Text>
                <View style={styles.input}>
                    <Text style={styles.text}>{data && data.phone && data.phone}</Text>
                </View>
            </View>

            <View>
                <Text style={styles.textTitle}>Password</Text>
                <View style={styles.inputPass}>
                    <Text style={[styles.text, {flex: 1}]}>************</Text>
                    <TouchableOpacity
                        style={{flex: 0}}
                        onPress={() => {

                            navigation.navigate({name: screens.PASSWORD_UPDATE})
                        }}>
                        <Text mr="2" fontSize="11" underline>Change Password</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </VStack>
    )
}
const DashboardScreen = (props) => {
    return (
        <ContainerAdmin title={"My profile"}
                        icon={<MaterialCommunityIcons name={"face-profile"} size={30} color={"black"}/>}>
            {/*    <FormAdmin/>*/}

            <FromProfileStatic
                data={{name: "Irving Lara", email: "irving.lara@si-quimera.com.mx", phone: "+52 9991501069"}}/>
        </ContainerAdmin>
    )
};

const styles = StyleSheet.create({
    textTitle: {
        fontSize: textSizeRender(4),
        fontFamily: 'Roboto_700Bold'
    },
    text: {
        color: '#797878',
        fontSize: textSizeRender(3.5),
        fontFamily: 'Roboto_400Regular'
    },
    input: {
        height: Dimensions.get("window").height * .055,
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: 10,
        borderRadius: Dimensions.get("window").height * .055,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },
    inputPass: {
        height: Dimensions.get("window").height * .055,
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 8,
        marginBottom: 10,
        borderRadius: Dimensions.get("window").height * .055,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white'
    }
});

export default DashboardScreen;
