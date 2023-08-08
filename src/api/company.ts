import { authorizationClient, unAuthorizationClient } from ".";
import API from "./config";

export const createCompany = async (companyData: FormData) => {
    const {data} = await unAuthorizationClient.post(API.COMPANIES, companyData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
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