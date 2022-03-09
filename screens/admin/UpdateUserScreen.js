import FormEditUser from "~/components/FormUser/FormEditUser";
import {useNavigation, useRoute} from "@react-navigation/native";

const UpdateUserScreen =(props)=>{
    const {user} = useRoute().params ?? {};
    return(
        <FormEditUser user={user}/>
    )
}
export default UpdateUserScreen;