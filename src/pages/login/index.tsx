import styled from "styled-components";
import COLORS from "../../constants/color";
import PATH from "../../constants/path";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

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

  return (
    <Containers>
      <SignupTitleContainer>
        <SignupTitle>로그인</SignupTitle>
      </SignupTitleContainer>
      <LoginForm>
        <LoginBox>
          <BoxTitle>아이디</BoxTitle>
          <BoxInput
            placeholder="아이디를 입력해주세요"
            // value={}
            // onChange={onChangeEmail}
          />
          {message.length > 0 && <Message> {message}</Message>}
        </LoginBox>
        <LoginBox>
          <BoxTitle>비밀번호</BoxTitle>
          <BoxInput
            placeholder="비밀번호를 입력해주세요"
            type={"password"}
            // value={password}
            // onChange={onChangePassword}
          />
        </LoginBox>
        <hr />
        <Box>
          <div onClick={() => navigate(PATH.SIGNUP)}>회원가입</div>
          <div>아이디 찾기</div>
          <div>비밀번호 찾기</div>
        </Box>
        <ButtonContainer>
            <Button theme="blue" title="로그인"></Button>
        </ButtonContainer>
      </LoginForm>
      {/* <SNSLogin /> */}
    </Containers>
  );
}
