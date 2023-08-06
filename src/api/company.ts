import { authorizationClient, unAuthorizationClient } from ".";
import API from "./config";

export const createCompany = async (companyData: Object) => {
    const {data} = await authorizationClient.post(API.COMPANIES, companyData);
    return data;
};

export const searchCompany = async (
    offset?: number,
    pageNumber?: number,
    pageSize?: number,
    paged?: boolean,
) => {
    const {data} = await unAuthorizationClient.get(API.COMPANIES);
    return data;
};