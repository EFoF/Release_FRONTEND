import { authorizationClient, unAuthorizationClient } from ".";
import API from "./config";

export const fetchMyAlarms = async (
    offset?: number,
    pageNumber?: number,
    pageSize?: number,
    paged?: boolean,
) => {
    const {data} = await authorizationClient.get(`${API.ALARM}`);
    // console.error("내 알람들", data);
    return data;
}

export const readMyAlarms = async () => {
    await authorizationClient.post(`${API.ALARM}`);
}