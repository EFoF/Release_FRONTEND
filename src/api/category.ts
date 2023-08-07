import { authorizationClient, unAuthorizationClient } from ".";
import API from "./config";

export const fetchCategories = async (projectId: string) => {
    const {data} = await unAuthorizationClient.put(`${API.PROJECT}/${projectId}/categories`);
    return data;
};