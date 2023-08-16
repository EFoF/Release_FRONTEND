import { authorizationClient, unAuthorizationClient } from ".";
import API from "./config";

export const getReleases = async (projectId: number | undefined) => {
    const {data} = await unAuthorizationClient.get(`${API.PROJECT}/${projectId}/categories/releases`);
    return data;
};

export const addRelease = async (projectId: number, categoryId: number, releaseData: object) => {
    const {data} = await authorizationClient.post(`${API.PROJECT}/${projectId}/categories/${categoryId}/releases`, releaseData);
    return data;
};

export const deleteRelease = async (projectId: number, categoryId: number, releaseId: number) => {
    const {data} = await authorizationClient.delete(`${API.PROJECT}/${projectId}/categories/${categoryId}/releases/${releaseId}`)
    return data;
};