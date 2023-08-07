import { authorizationClient, unAuthorizationClient } from ".";
import API from "./config";

export const editProject = async (projectId: string, projectData: object) => {
    const {data} = await unAuthorizationClient.put(`${API.PROJECT}/${projectId}`, projectData);
    return data;
};

export const createProject = async (companyId: string, projectData: object) => {
    const {data} = await unAuthorizationClient.post(`${API.COMPANIES}/${companyId}/projects`, projectData);
    return data;
};

export const deleteProject = async (companyId: string, projectId: string) => {
    const {data} = await unAuthorizationClient.delete(`${API.COMPANIES}/${companyId}/projects/${projectId}`);
    return data;
};

export const fetchProject = async (
    companyId: number,
    offset?: number,
    pageNumber?: number,
    pageSize?: number,
    paged?: boolean,
) => {
    const {data} = await unAuthorizationClient.get(`${API.COMPANIES}/${companyId}/projects`); //auth로 바꿔야
    return data.findProjectListResponseDtos.content;
};