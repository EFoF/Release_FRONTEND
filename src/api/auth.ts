import { authorizationClient, unAuthorizationClient } from ".";
import API from "./config";

export const login = async (userLoginData: Object) => {
    const {data} = await unAuthorizationClient.post(API.LOGIN, userLoginData);
    return data;
};

export const signup = async (userSignupData: Object) => {
    const {data} = await unAuthorizationClient.post(API.SIGNUP, userSignupData);
    return data;
}

export const logout = async () => {
    const {data} = await authorizationClient.post(API.LOGOUT);
    return data;
};

export const withdrawal = async (userPassword: String) => {
    const {data} = await authorizationClient.post(API.WIDHDRAWAL, userPassword);
    return data;
};