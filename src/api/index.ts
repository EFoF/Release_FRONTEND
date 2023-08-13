import axios from "axios";
import API from "./config";
import PATH from "../constants/path";

axios.defaults.baseURL = API.BASE_URL; 
axios.defaults.withCredentials = true;

const authorizationClient = axios.create({
  baseURL: API.BASE_URL,
  withCredentials: true, // 요청보낼 때 자격 증명 정보(인증 헤더 등)을 포함시킴 (origin이 달라도)
});

//accesstoken 가져오고 있는지 상태 여부 
let isAlreadyFetchingAccessToken = false;

//파라미터로 토큰을 가진 함수 타입 
type Subscriber = (accessToken: string) => { };
//위 함수 타입을 저장해놓는 배열 
//accesstoken 갱신 후 실행 할 콜백 함수들 저장 
let subscribers: Subscriber[] = [];

//subscribers 배열에 함수를 추가하는 기능 
function addSubscribers(callback: Subscriber) {
  subscribers.push(callback)
}

//accesstoken 가져오고 나서 쌓인 콜백 함수들 모두 실행 / 이후 배열 초기화
function onAccessTokenFetched(accessToken: string) {
  subscribers.forEach((callback)=>{
    callback(accessToken)
  })
  subscribers = [];
}

function handleUnauthorized () {
  localStorage.clear();
  window.location.href = PATH.HOME;
}

async function resetTokenAndReattemptRequest(error: any) {
  try {
    const {response: errorResponse} = error;

    //엑세스토큰 얻었을 때 원래 요청 재시도 
    const retryOriginalRequest = new Promise((resolve, reject) => {
      addSubscribers(async (accessToken)=>{
        try {
          errorResponse.config.headers.Authorization = `${accessToken}`; //삭제
          resolve(authorizationClient(errorResponse.config));
        } catch (err) {
          reject(err);
        }
      })
    });

    //엑세스토큰 안가져오고 있다면 재발급(REISSUE) 요청 후 받은 토큰 로컬스토리지 저장
    if(!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;
      await axios
        .post(API.REISSUE, { token: localStorage.getItem("accessToken") })
        .then(
          ({
            data,
          }: {
            data: {
              accessToken : string;
              grantType: string;
              accessTokenExporesIn: number;
            };
          }) => {
            localStorage.setItem("accessToken", data.accessToken);
            isAlreadyFetchingAccessToken = false;
            onAccessTokenFetched(data.accessToken)
          }
        )
        .catch((err)=>{ //못받아온다면 로그인 정보 없는걸로 간주
          console.log("로그인 정보 없어 메인 화면으로 이동");
          handleUnauthorized();
          return Promise.reject(err)
        })
    }
    //엑세스토큰 얻었을 때 원래 요청 재시도 
    return await retryOriginalRequest;
  } catch (refreshError) {
    console.log("로그인 정보 없어 메인 화면으로 이동");
    handleUnauthorized();
    return Promise.reject(refreshError);
  }
}

//req 인터셉터
authorizationClient.interceptors.request.use((config) => {
  return Object.assign(config, {
    headers: {
      Authorization: `${localStorage.getItem("accessToken")}`, //삭제 
    },
  });
}, (error) => {
  console.error("2[Axios]", error);
  return Promise.reject(error)
} );

//resp 인터셉터 
authorizationClient.interceptors.response.use(
  (response) => { //2xx 범위 응답 성공 시
  return response;
}, 
  async (error) => { //그 외 응답 실패 시 
    console.log("resp 받고 에러 : ", error)
    if(error.response.status === 401 && localStorage.getItem("accessToken")) { //401인데 로컬스토리지 엑세스토큰이 존재할 때
      console.log("refresh ㄱㄱ ", error)
      return resetTokenAndReattemptRequest(error); //엑세스토큰 재발급하고 재요청 
    }
    return Promise.reject(error); //인증 에러가 아닌 다른 에러
})



///////////////////////////UnAthorization 
const unAuthorizationClient = axios.create({
  baseURL: API.BASE_URL,
  withCredentials: true,
});

unAuthorizationClient.interceptors.response.use(
  (response) => {
    //특정 도메인에 대한 접근 허용, 로그인을 하지 않은 인증되지 않은 사용자니까
    // response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000";
    response.headers["Access-Control-Allow-Origin"] = API.BASE_URL;
    return response;
  },
  (error) => {
    console.error("1[Axios]", error);
    return Promise.reject(error);
  }
);

export { authorizationClient, unAuthorizationClient };
