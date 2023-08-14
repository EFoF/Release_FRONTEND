import { authorizationClient, unAuthorizationClient } from ".";
import API from "./config";

export const fetchCategories = async (projectId: number) => {
    const {data} = await unAuthorizationClient.get(`${API.PROJECT}/${projectId}/categories`);
    return data;
};