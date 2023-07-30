import axios from "axios";
import API from "./config";
import PATH from "../constants/path";

axios.defaults.baseURL = API.BASE_URL;
axios.defaults.withCredentials = true;

const authorizationClient = axios.create({
  baseURL: API.BASE_URL,
  withCredentials: true, // 요청보낼 때 자격 증명 정보(인증 헤더 등)을 포함시킴
});

authorizationClient.interceptors.request.use((config) => {
  return Object.assign(config, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
});

const unAuthorizationClient = axios.create({
  baseURL: API.BASE_URL,
  withCredentials: true,
});

unAuthorizationClient.interceptors.response.use(
    (response) => {
      //특정 도메인에 대한 접근 허용, 로그인을 하지 않은 인증되지 않은 사용자니까
      response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000";
      return response;
    },
    (error) => {
      console.error("[Axios]", error);
      return Promise.reject(error);
    }
  );

export { authorizationClient, unAuthorizationClient };
