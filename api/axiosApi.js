import axios from 'axios'
import {getData} from "~/utils/utils";
import {useAuthUserContext} from "~/context/authUser";

let config =
    {
        baseURL: "https://dev-backend-cornerd-kdccl2goja-uc.a.run.app",
        headers: {
            'Accept': 'application/json',
        }
    };

let APIKit = axios.create(config);
    APIKit.interceptors.request.use(async function(config) {
        try {
            let userData =  await getData("user")
            //console.log(userData.accessToken)
            let token = await userData.accessToken ? userData.accessToken :"";
            if (token)
                 config.headers.Authorization = `${token}`;
        } catch(e) {
            console.log("Error->",e)
        }
        return config;
    });
    APIKit.interceptors.response.use(config => config, (err) => {
        const {LogOut} = useAuthUserContext();
        if (err.response) {
            const response = err.response;
            if (response.status === 401) {
                LogOut()
            }
        }
        return config;
    });
export default APIKit;
