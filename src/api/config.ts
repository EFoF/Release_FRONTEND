const BASE_URL = process.env.REACT_APP_BASE_URL;
const AUTH = "/auth";
const LOGIN = "/signin";
const LOGOUT = "/logout";
const SIGNUP = "/signup";
const REISSUE = "/reissue"
const WIDHDRAWAL = "/withdrawal";
const UPDATE_PW = "/update/password";
const MEMBER_INFO = "/member/info";
const COMPANIES = "/companies";
const PROJECT = "/companies/projects";
const GOOGLELOGIN = "/oauth2/authorization/google"
const CATEGORY = "/categories"


// const CHECK_EMAIL = "email/exists/";
// const EMAIL_SEND = "email/certificate";
// const CODE = "email/check";
// const NICK_DUPLICATE = "nickname/exists/";
// const GOOGLE = "social_login/google";
// const KAKAO = "social_login/kakao";

const API = {
  BASE_URL: `${BASE_URL}`,
  SIGNUP: `${AUTH}${SIGNUP}`,
  LOGIN: `${AUTH}${LOGIN}`,
  LOGOUT: `${AUTH}${LOGOUT}`,
  REISSUE: `${AUTH}${REISSUE}`,
  WIDHDRAWAL: `${AUTH}${WIDHDRAWAL}`,
  UPDATE_PW: `${AUTH}${UPDATE_PW}`,
  MEMBER_INFO: `${AUTH}${MEMBER_INFO}`,
  SEND_EMAIL: `${AUTH}/mail/sending`,
  VERIFY: `${AUTH}/mail/verification`,

  CATEGORY: `${CATEGORY}`,
  COMPANIES: `${COMPANIES}`,
  PROJECT: `${PROJECT}`,
  GOOGLELOGIN: `${GOOGLELOGIN}`,


  // CHECK_EMAIL: `${AUTH}${CHECK_EMAIL}`,
  // EMAIL_SEND: `${AUTH}${EMAIL_SEND}`,
  // CODE: `${AUTH}${CODE}`,
  // NICK_DUPLICATE: `${AUTH}${NICK_DUPLICATE}`,
  // GOOGLE: `${AUTH}${GOOGLE}`,
  // KAKAO: `${AUTH}${KAKAO}`,
  // SOCIAL_LOGIN: `${AUTH}social-login`,
};

export default API;
