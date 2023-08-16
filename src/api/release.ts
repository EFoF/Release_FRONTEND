import { authorizationClient, unAuthorizationClient } from ".";
import API from "./config";

export const getReleases = async (projectId: number | undefined) => {
    const {data} = await unAuthorizationClient.get(`${API.PROJECT}/${projectId}/categories/releases`)
    return data;
};

export const addRelease = async () => {

};

export const deleteRelease = async () => {

};