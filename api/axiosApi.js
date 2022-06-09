import axios from 'axios'
import {getData, removeData} from "~/utils/utils";
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
        console.log(err.response.data.error.code)
        try {
            if (err.response) {
                const response = err.response;
                if (response.data.error.code === "auth/id-token-expired") {
                     removeData("user").then(r=>{
                         alert("session expired, please login again")
                     }).catch(e=>{
                         console.log(",3",e)
                     })
                }
            }
        }catch (e){
            console.log("Error2->",e)

        }

        return config;
    });
export default APIKit;
