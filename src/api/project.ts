import { authorizationClient, unAuthorizationClient } from ".";
import API from "./config";

export const editProject = async (projectId: string, projectData: object) => {
    const {data} = await authorizationClient.put(`${API.PROJECT}/${projectId}`, projectData);
    return data;
};

export const createProject = async (companyId: string, projectData: object) => {
    const {data} = await authorizationClient.post(`${API.COMPANIES}/${companyId}/projects`, projectData);
    return data;
};

export const deleteProject = async (companyId: string, projectId: string) => {
    const {data} = await authorizationClient.delete(`${API.COMPANIES}/${companyId}/projects/${projectId}`);
    return data;
};