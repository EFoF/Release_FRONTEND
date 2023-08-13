import { authorizationClient, unAuthorizationClient } from ".";
import API from "./config";

export const createCompany = async (companyData: FormData) => {
    const {data} = await authorizationClient.post(API.COMPANIES, companyData, {
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

export const getMyCompanies = async (
  offset?: number,
  pageNumber?: number,
  pageSize?: number,
  paged?: boolean,
) => {
  const {data} = await authorizationClient.get(`${API.COMPANIES}/member/companies`);
  return data;
};

export const getMyProjects = async (
  offset?: number,
  pageNumber?: number,
  pageSize?: number,
  paged?: boolean,
) => {
  const {data} = await authorizationClient.get(`${API.COMPANIES}/projects`);
  return data;
};

export const updateCompany = async (companyId: number, companyData: FormData) => {
  const {data} = await authorizationClient.put(`${API.COMPANIES}/${companyId}`, companyData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  return data;
};

export const deleteCompany = async (companyId: number) => {
  const {data} = await authorizationClient.delete(`${API.COMPANIES}/${companyId}`);
  return data;
};