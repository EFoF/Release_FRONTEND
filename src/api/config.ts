const BASE_URL = process.env.REACT_APP_BASE_URL; //아직 env에 작성 x
const AUTH = "/auth/";
const MEMBER = "/member";
const LOGIN = "login";
const SIGNUP = "signup";
const CHECK_EMAIL = "email/exists/";
const EMAIL_SEND = "email/certificate";
const CODE = "email/check";
const NICK_DUPLICATE = "nickname/exists/";
const GOOGLE = "social_login/google";
const KAKAO = "social_login/kakao";
const LOGOUT = "/logout";

const API = {
  BASE_URL: `${BASE_URL}`,
  AUTH: `${AUTH}`,
  MEMBER: `${MEMBER}`,
  LOGIN: `${AUTH}${LOGIN}`,
  SIGNUP: `${AUTH}${SIGNUP}`,
  CHECK_EMAIL: `${AUTH}${CHECK_EMAIL}`,
  EMAIL_SEND: `${AUTH}${EMAIL_SEND}`,
  CODE: `${AUTH}${CODE}`,
  NICK_DUPLICATE: `${AUTH}${NICK_DUPLICATE}`,
  GOOGLE: `${AUTH}${GOOGLE}`,
  KAKAO: `${AUTH}${KAKAO}`,
  LOGOUT: `${LOGOUT}`,
  REISSUE: `${AUTH}reissue`,
  SOCIAL_LOGIN: `${AUTH}social-login`,
};

export default API;
