import React, {useState, useEffect} from "react";
import {TouchableOpacity, StyleSheet, View} from "react-native";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {Text} from "native-base";
import {Feather} from "@expo/vector-icons";
import ContainerUsersList from "~/components/ContainerList/ContainerUsersList";
import ContainerAdmin from "~/components/common/ContainerAdmin";
import Screens from "~/constants/screens";
import {SCREEN_WIDTH, textSizeRender} from "~/utils/utils";
import userService from "~/services/user"
import Loading from "~/components/Loading/Loading";
import {LinearGradient} from "expo-linear-gradient";


const TitleComponent = (props) => {
    return (
        <LinearGradient colors={["#555555","#171717"]} style={{
            marginHorizontal: SCREEN_WIDTH * .05,
            flexDirection: "row",
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
        </LinearGradient>
    )
}


const UsersScreen = (props) => {
    const [loading, setLoading] = useState(null);
    const [users, setUsers] = useState([]);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(async () => {
        if (isFocused) {
            await getUserDocs();
        }
    }, [isFocused])

    const getUserDocs = () => {
        setLoading(true)
        try {
            userService.getUsers().then(docs => {
                setUsers(docs)
                setTimeout(() => {
                    setLoading(false)
                }, 500);
            });
        } catch (e) {
            setLoading(false)
        }
    };

    const actions = (<View style={{flex: 1, alignItems: 'flex-end'}}>
        <View style={{flexDirection: 'row', width: "100%", justifyContent: 'flex-end'}}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(Screens.CREATE_USER)
                }}
                style={{
                    width: "50%",
                    height: SCREEN_WIDTH*.09,
                }}>
                <LinearGradient colors={["#858C93","#5E6268"]} style={{
                    width: "100%",
                    height: '100%',
                    justifyContent: 'center',
                    marginRight: 2,
                    borderRadius: 17
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: "Roboto_700Bold", fontSize: textSizeRender(2.2), color: 'white'
                    }}>Create user</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    </View>)
    return (
        <ContainerAdmin isList={true} title={"Users"}
                        callApi={() => {
                            getUserDocs()
                        }}
                        icon={<Feather name="users" size={30} color={"black"}/>}
                        actions={actions} componentTitle={<TitleComponent/>}>
            <View style={{
                paddingHorizontal: SCREEN_WIDTH * .05,
                marginBottom: SCREEN_WIDTH / 3.5
            }}>

                <ContainerUsersList data={users} loading={loading}/>

            </View>
            {
                loading &&
                <Loading color={"white"} loading={loading} text={"Loading..."}/>
            }
        </ContainerAdmin>
    )
};

const styles = StyleSheet.create({
    titleComponent: {
        color:"white",
        fontSize: textSizeRender(3),
        fontFamily: "Roboto_700Bold"
    }

});

export default UsersScreen;
