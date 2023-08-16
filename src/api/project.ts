import { authorizationClient, unAuthorizationClient } from ".";
import API from "./config";

export const editProject = async (projectId: number, projectData: object) => {
    const {data} = await authorizationClient.put(`${API.PROJECT}/${projectId}`, projectData);
    return data;
};

export const createProject = async (companyId: number, projectData: object) => {
    const {data} = await authorizationClient.post(`${API.COMPANIES}/${companyId}/projects`, projectData);
    return data;
};

export const deleteProject = async (companyId: number, projectId: number) => {
    const {data} = await authorizationClient.delete(`${API.COMPANIES}/${companyId}/projects/${projectId}`);
    return data;
};

export const fetchProject = async (
    companyId: number,
    offset?: number,
    pageNumber?: number,
    pageSize?: number,
    paged?: boolean,
) => {
    const {data} = await unAuthorizationClient.get(`${API.COMPANIES}/${companyId}/projects`);
    return data;
};

export const fetchMyProject = async (
    companyId: number,
    offset?: number,
    pageNumber?: number,
    pageSize?: number,
    paged?: boolean,
) => {
    const {data} = await unAuthorizationClient.get(`${API.COMPANIES}/${companyId}/myProjects`);
    return data;
};

export const getProjectMembers = async (projectId: number) => {
    const {data} = await authorizationClient.get(`${API.PROJECT}/${projectId}/members`);
    return data;
};

export const addProjectMembers = async (projectId: number, emailObject: object) => {
    const {data} = await authorizationClient.post(`${API.PROJECT}/${projectId}/members`, emailObject);
    return data;
};

export const deleteProjectMembers = async (projectId: number, email: string) => {
    const {data} = await authorizationClient.delete(`${API.PROJECT}/${projectId}/members`, {
        headers: {
          'email': email,
        }
    });
    return data;
};