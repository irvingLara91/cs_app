import axios from 'axios'
import {getData} from "~/utils/utils";

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
            let userData =  await  getData("user") ;
            let token = await JSON.parse(userData).token ? JSON.parse(userData).token :"";
            if (token)
            config.headers.Authorization = `${token}`;
        } catch(e) {
            console.log("Error->",e.error)
        }
        return config;
    });
    APIKit.interceptors.response.use(function(config) {
        return config;
    });
export default APIKit;