import axios from "axios";
import API from "./config";
import PATH from "../constants/path";

axios.defaults.baseURL = API.BASE_URL;
axios.defaults.withCredentials = true;

const handleUnauthorized = () => {
  localStorage.clear();
  window.location.href = PATH.HOME;
}

const authorizationClient = axios.create({
  baseURL: API.BASE_URL,
  withCredentials: true, // 요청보낼 때 자격 증명 정보(인증 헤더 등)을 포함시킴 (origin이 달라도)
});

authorizationClient.interceptors.request.use((config) => {
  return Object.assign(config, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
});

//accesstoken 가지고 있는지 상태 여부 
let isAlreadyFetchingAccessToken = false;

//파라미터로 토큰을 가진 함수 타입 
type Subscriber = (accessToken: string) => { };
//위 함수 타입을 저장해놓는 배열 
let subscribers: Subscriber[] = [];

//subscribers 배열에 함수를 추가하는 기능 
function addSubscribers(callback: Subscriber) {
  subscribers.push(callback)
}

function onAccessTokenFetched(accessToken: string) {
  subscribers.forEach((callback)=>{
    callback(accessToken)
  })
}

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
