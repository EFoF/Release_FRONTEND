import { authorizationClient, unAuthorizationClient } from ".";
import API from "./config";

export const login = async (userLoginData: Object) => { //email, pw
    const {data} = await unAuthorizationClient.post(API.LOGIN, userLoginData);
    return data;
};

export const signup = async (userSignupData: object) => { //mail, logintype, pw, username
    const {data} = await unAuthorizationClient.post(API.SIGNUP, userSignupData);
    return data;
}

export const logout = async () => {
    const {data} = await authorizationClient.post(API.LOGOUT);
    return data;
};

export const withdrawal = async (userPW: object) => { //pw
    const {data} = await authorizationClient.post(API.WIDHDRAWAL, userPW);
    return data;
};

export const sendMail = async (userMail: object) => { //email
    const {data} = await unAuthorizationClient.post(API.SEND_EMAIL, userMail);
    return data;
};

export const verification = async (userMailData: object) => { //email, code
    const {data} = await unAuthorizationClient.post(API.VERIFY, userMailData);
    return data;
};

//reissue는 index에 