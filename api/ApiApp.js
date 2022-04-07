import APIKit from "./axiosApi";
import axios from "axios";

const baseURL = "https://dev-backend-cornerd-kdccl2goja-uc.a.run.app";
//const baseURL = "https://46a8-2806-2f0-9001-a35d-25aa-bbdf-488c-d1dc.ngrok.io";

class ApiApp {

    static ApisTypeBase = (url, method = 'post', params = {}) => {
        switch (method) {
            case "post":
                return APIKit.post(url, params)
                break;
            case "get":
                return APIKit.get(url)
                break;
            case "put":
                return APIKit.put(url, params)
                break;
            case "delete":
                return APIKit.delete(url)
                break;
        }
    };


    /*** Funciones  sin token con axios ***/
    static ApisType = (url, method = 'post', params = {}) => {
        switch (method) {
            case "post":
                return axios.post(baseURL + url, params,{  headers: {
                        'enctype':"multipart/form-data"
                    }})
                break;
            case "get":
                return axios.get(baseURL + url)
                break;
            case "put":
                return axios.put(baseURL + url, params)
                break;
            case "delete":
                return axios.delete(baseURL + url)
                break;
        }
    };

    /**
     *  IL APIS
     * API REST AUTH
     **/
    static login = (params) => {
        return ApiApp.ApisType('/api/auth/login', 'post', params);
    }
    static registerUser = (params) => {
        return ApiApp.ApisType('/api/auth/', 'post', params);
    }
    static logout = (params) => {
        return ApiApp.ApisType('/api/auth/logout', 'post', params);
    }
    static updatePassword = (params) => {
        return ApiApp.ApisType('/api/auth/updatePassword', 'put', params);
    }
    static passwordReset = (params) => {
        return ApiApp.ApisType('/api/auth/passwordReset', 'post', params);
    }


    /**
     * API REST ORDERS
     **/

    static createOrder = (params) => {
        return ApiApp.ApisType('/api/orders', 'post', params);
    }

    static getOrders = (limit = null) => {
        let url = `/api/orders`
        if (limit) {
            url = `/api/orders?limit=${limit}`
        }
        return ApiApp.ApisType(url, 'get');
    }

    static getOrder = (orderId) => {
        return ApiApp.ApisType(`/api/orders/${orderId}`, 'get');
    }
    static deleteOrder = (orderId) => {
        return ApiApp.ApisType(`/api/orders/${orderId}`, 'delete');
    }
    static getAssigned = (userId) => {
        return ApiApp.ApisType(`/api/orders/assigned/${userId}`, 'get');
    }


    /**
     *  API REST USERS
     **/

    static getUsers = () => {
        return ApiApp.ApisType(`/api/users`, 'get');
    }
    static getUser = (userId) => {
        return ApiApp.ApisType(`/api/users/${userId}`, 'get');
    }

    static updateUser = (userId, params) => {
        return ApiApp.ApisType(`/api/users/${userId}`, 'post', params);
    }

    /**
     *  API REST ADMIN
     **/
    static deleteUser = (userId) => {
        return ApiApp.ApisType(`/api/admin/${userId}`, 'delete');
    }
    static putAssign = (orderId, params) => {
        return ApiApp.ApisType(`/api/admin/orders/assign/${orderId}`, 'put', params);
    }
    static putReassign = (orderId, params) => {
        return ApiApp.ApisType(`/api/admin/orders/reassign/${orderId}`, 'put', params);
    }



}

export default ApiApp;
