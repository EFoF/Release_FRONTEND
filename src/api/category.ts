import { authorizationClient, unAuthorizationClient } from ".";
import PATH from "../constants/path";
import API from "./config";

export const fetchCategories = async (projectId: number) => {
    const {data} = await unAuthorizationClient.get(`${API.PROJECT}/${projectId}/categories`);
    return data;
};

export const fetchOneCategory = async (categoryId: number) => {
    const {data} = await authorizationClient.get(`${API.CATEGORY}/${categoryId}?developer=true`);
    return data;
};

export const addCategory = async (projectId: number, categoryData: object) => {
    const {data} = await authorizationClient.post(`${API.PROJECT}/${projectId}/categories`, categoryData);
    return data;
};

export const updateCategory = async (projectId: number, categoryId: number, categoryData: object) => {
    const {data} = await authorizationClient.put(`${API.PROJECT}/${projectId}/categories/${categoryId}`, categoryData);
    return data;
};

export const deleteCategory = async (projectId: number, categoryId: number) => {
    const {data} = await authorizationClient.delete(`${API.PROJECT}/${projectId}/categories/${categoryId}`);
    return data;
};