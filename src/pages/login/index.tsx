import styled from "styled-components";
import COLORS from "../../constants/color";
import PATH from "../../constants/path";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import {useState} from "react"
import { login } from "../../api/auth";
import useLogin from "../../hooks/useLogin";
import { useMutation } from "@tanstack/react-query";
import { isLoginState } from "../../states/isLogin";
import { useRecoilState } from 'recoil';
import SNSLogin from "./snsLogin";


const Containers = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 10rem; //
`;


const LoginForm = styled.form`
  width: 55rem;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  gap: 1rem;
  border-radius: 5px;
  background-color: #fff;
  hr {
    color: black;
    height: 2px;
    width: 80%;
  }
`;

const LoginBox = styled.div`
  width: 41rem;
  display: flex;
  flex-direction: column;
`;

const BoxTitle = styled.h3`
  margin-bottom: 5px;
  font-size: 1.2rem;
  color: ${COLORS.GREY[400]};
`;

const BoxInput = styled.input`
  width: 41rem;
  height: 30px;
  border: 0.1rem solid ${COLORS.GREY[300]};
  margin-bottom: 15px;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  padding: 2rem 0 2rem 1rem;
`;

const ButtonContainer = styled.div`
margin-top: 1rem;
width: 10rem;
padding: 1rem;
margin-left: 25rem;
`
const SubmitButton = styled(Button)` //안먹히는 이유? 
  margin-top: 1rem;
  width: 10rem;
  padding: 1rem;
  margin-left: 31rem;
`;

const Box = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  margin-left: -22rem;
  font-size: 1.2rem;
  cursor: pointer;
  div {
    &:hover {
      color: ${COLORS.BLUE};
    }
  }
`;

const Message = styled.p`
  font-size: 1.1rem;
  padding-top: 1rem;
`;

const SignupTitleContainer = styled.div`
  text-align: center;
`;

const SignupTitle = styled.h1`
font-family: S-Regular;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const SignupIntro = styled.p`
font-family: S-light;
  font-size: 1.2rem;
  color: gray;
`;

export default function Login() {
  const navigate = useNavigate();
  let message = "";
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  
  // const {mutateLogin} = useLogin();

  const onChangeEmail = (e : React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserEmail(e.target.value);
  }

  const onChangePassword = (e : React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserPassword(e.target.value);
  }

  const handleLogin = () => {
    const userLoginData = {
      email: userEmail,
      password: userPassword,
    }
    login(userLoginData).then((fetchedData)=>{
      if(fetchedData) {
        console.log("login", fetchedData.headers.authorization)
        localStorage.setItem("accessToken", fetchedData.headers.authorization);
        setIsLogin(true);
        navigate(PATH.MYCOMPANY) //mycomp로 변환 
      }
    })
    
    // console.log(userLoginData)
    // mutateLogin.mutate(userLoginData);
    // console.log("mutateLogin", mutateLogin)
  }


  return ( 
    <Containers>
      <SignupTitleContainer>
        <SignupTitle>로그인</SignupTitle>
      </SignupTitleContainer>
      <LoginForm>
        <LoginBox>
          <BoxTitle>이메일</BoxTitle>
          <BoxInput
            placeholder="이메일을 입력해주세요"
            value={userEmail}
            onChange={onChangeEmail}
          />
          {message.length > 0 && <Message> {message}</Message>}
        </LoginBox>
        <LoginBox>
          <BoxTitle>비밀번호</BoxTitle>
          <BoxInput
            placeholder="비밀번호를 입력해주세요"
            type={"password"}
            value={userPassword}
            onChange={onChangePassword}
          />
        </LoginBox>
        <hr />
        <Box>
          <div onClick={() => navigate(PATH.SIGNUP)}>회원가입</div>
          <div>아이디 찾기</div>
          <div>비밀번호 찾기</div>
        </Box>
        <ButtonContainer>
            <Button theme="blue" title="로그인" onClick={handleLogin}></Button>
        </ButtonContainer>
      </LoginForm>
      <SNSLogin />
    </Containers>
  );
}
