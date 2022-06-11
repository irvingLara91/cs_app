import APIKit from "./axiosApi";
import axios from "axios";

const baseURL = "https://dev-backend-cornerd-kdccl2goja-uc.a.run.app";

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
        return ApiApp.ApisTypeBase('/api/auth/logout', 'post', params);
    }
    static updatePassword = (params) => {
        return ApiApp.ApisTypeBase('/api/auth/updatePassword', 'put', params);
    }
    static passwordReset = (params) => {
        return ApiApp.ApisType('/api/auth/passwordReset', 'post', params);
    }


    /**
     * API REST ORDERS
     **/

    static createOrder = (params) => {
        return ApiApp.ApisTypeBase('/api/orders', 'post', params);
    }

    static getOrders = (limit = null) => {
        let url = `/api/orders`
        if (limit) {
            url = `/api/orders?limit=${limit}`
        }
        return ApiApp.ApisTypeBase(url, 'get');
    }

    static getOrder = (orderId) => {
        return ApiApp.ApisTypeBase(`/api/orders/${orderId}`, 'get');
    }
    static deleteOrder = (orderId) => {
        return ApiApp.ApisTypeBase(`/api/orders/${orderId}`, 'delete');
    }
    static getAssigned = (userId) => {
        return ApiApp.ApisTypeBase(`/api/orders/assigned/${userId}`, 'get');
    }

    static changeStatusOrder = (orderId,params) => {
        return ApiApp.ApisTypeBase(`/api/orders/status/${orderId}`, 'put',params);
    }

    static cancelOrder = (orderId,params) => {
        return ApiApp.ApisTypeBase(`/api/orders/status/${orderId}`, 'put',params);
    }

    /**
     *  API REST USERS
     **/

    static getUsers = () => {
        return ApiApp.ApisTypeBase(`/api/users`, 'get');
    }
    static getUser = (userId) => {
        return ApiApp.ApisTypeBase(`/api/users/${userId}`, 'get');
    }

    static updateUser = (userId, params) => {
        return ApiApp.ApisTypeBase(`/api/users/${userId}`, 'post', params);
    }

    /**
     *  API REST ADMIN
     **/
    static deleteUser = (userId) => {
        return ApiApp.ApisTypeBase(`/api/admin/${userId}`, 'delete');
    }
    static putAssign = (orderId, params) => {
        //alert(JSON.stringify(params))
        return ApiApp.ApisTypeBase(`/api/admin/orders/assign/${orderId}`, 'put', params);
    }
    static putReassign = (orderId, params) => {
        return ApiApp.ApisTypeBase(`/api/admin/orders/reassign/${orderId}`, 'put', params);
    }


    /**
     *  API PUSH NOTIFICATION
     **/
    static registerPushNotification = (params) => {
        return ApiApp.ApisTypeBase(`/api/notifications/registerMobileToken`, 'post',params);
    }

    //Client
    static getNotifications = (userId) => {
        return ApiApp.ApisTypeBase(`/api/notifications/${userId}`, 'get');
    }

    //Admin and Tech
    static getAdminTechNotifications = (userId) => {
        return ApiApp.ApisTypeBase(`/api/notifications/orders/assigned/${userId}`, 'get');
    }

    static  seeNotificationPut=(orderId)=>{
        return ApiApp.ApisTypeBase(`/api/notifications/seen/${orderId}`, 'put');
    }


}

export default ApiApp;
