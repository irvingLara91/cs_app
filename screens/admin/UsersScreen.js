import React from "react";
import {TouchableOpacity, StyleSheet, View} from "react-native";
import {Text} from "native-base";
import ContainerAdmin from "~/components/common/ContainerAdmin";
import {Feather} from "@expo/vector-icons";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";
import ContainerUsersList from "~/components/ContainerList/ContainerUsersList";

const users_dummy = [
    {
        id: 1, firstName: "Irving", lastName: "Lara",
        timestamp: new Date(),
        assignedRole: 3,
        orders: 20,
        img:"https://random.imagecdn.app/150/150"
    },
    {
        id: 2, firstName: "Alex", lastName: "Lara",
        timestamp: new Date(),
        assignedRole: 3,
        orders: 21,
        img:"https://random.imagecdn.app/150/150"
    },
    {
        id: 2, firstName: "Carlos", lastName: "Jiménez",
        timestamp: new Date(),
        assignedRole: 3,
        orders: 21,
        img:"https://random.imagecdn.app/150/150"
    }
];
const TitleComponent = (props) => {
    return (
        <View style={{
            flexDirection: "row", flex: 1,
            backgroundColor: '#EAEAEA',
            padding: 15,
            borderRadius: 5
        }}>
            <View style={{flex: 1}}>
                <Text style={styles.titleComponent}>Name</Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={styles.titleComponent}>Date created</Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={styles.titleComponent}> Assigned role</Text>
            </View>
            <View style={{flex: .5}}>
                <Text style={styles.titleComponent}>Order</Text>
            </View>
        </View>
    )
}


const UsersScreen = (props) => {
    const actions = (<View style={{flex: 1, alignItems: 'flex-end'}}>
        <View style={{flexDirection: 'row', width: "100%", justifyContent: 'flex-end'}}>
            <TouchableOpacity style={{
                width: "45%",
                flexDirection: 'row',
                marginRight: 2,
                alignItems: 'center',
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 10
            }}>
                <View style={{flex: 1}}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: "Roboto_700Bold", fontSize: textSizeRender(2.5), color: 'black'
                    }}>Create user</Text>
                </View>

            </TouchableOpacity>
        </View>
    </View>)
    return (
        <ContainerAdmin title={"Users"}
                        icon={<Feather name="users" size={30} color={"black"}/>}
                        actions={actions}>
            <View style={{
                paddingHorizontal: SCREEN_WIDTH * .05,
                marginBottom: SCREEN_WIDTH / 3.5
            }}>
                <TitleComponent/>
                <ContainerUsersList data={users_dummy}/>
            </View>


        </ContainerAdmin>
    )
};

const styles = StyleSheet.create({
    titleComponent: {
        fontSize: textSizeRender(3),
        fontFamily: "Roboto_700Bold"
    }

});

export default UsersScreen;
