import axios from 'axios'
import {getData, removeData} from "~/utils/utils";
import {useAuthUserContext} from "~/context/authUser";

let config =
    {
        baseURL: "https://dev-backend-cornerd-kdccl2goja-uc.a.run.app",
        headers: {
            'Accept': 'application/json',
        }
    };

let APIKit = axios.create(config);
APIKit.interceptors.request.use(async function (config) {
    try {
        let userData = await getData("user")
        //console.log(userData.accessToken)
        let token = await userData.accessToken ? userData.accessToken : "";
        if (token)
            config.headers.Authorization = `${token}`;
    } catch (e) {
        console.log("Error->", e)
    }
    return config;
});
APIKit.interceptors.response.use((response) => {
    return response
}, async function (error) {
    if (error.response.status === 403 || error.response.status ===400) {
        removeData("user").then(()=>{
            alert("session expired, please login again")
        }).catch(e=>{
            console.log(",3",e)
        })

    }
    return Promise.reject(error);
});
/*APIKit.interceptors.response.use(config => config, (err) => {
    try {
        if (err.response) {
            const response = err.response;
            if (response.status===400){
            }else if (response.data.error.code=== "auth/id-token-expired"){
                removeData("user").then(r=>{
                              alert("session expired, please login again")
                          }).catch(e=>{
                              console.log(",3",e)
                         })
            }else {
               // console.log("status:N:->",response)
            }
        }
    }catch (e){
        console.log("Error2->",e)

    }

    return config;
});*/
export default APIKit;
