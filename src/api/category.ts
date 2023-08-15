import { authorizationClient, unAuthorizationClient } from ".";
import API from "./config";

export const fetchCategories = async (projectId: number) => {
    const {data} = await unAuthorizationClient.get(`${API.PROJECT}/${projectId}/categories`);
    return data;
};

export const addCategory = async (projectId: number, projectData: object) => {
    const {data} = await authorizationClient.post(`${API.PROJECT}/${projectId}/categories`, projectData);
    return data;
};

export const updateCategory = async (projectId: number, categoryId: number, projectData: object) => {
    const {data} = await authorizationClient.put(`${API.PROJECT}/${projectId}/categories/${categoryId}`, projectData);
    return data;
};

export const deleteCategory = async (projectId: number, categoryId: number) => {
    const {data} = await authorizationClient.delete(`${API.PROJECT}/${projectId}/categories/${categoryId}`);
    return data;
};