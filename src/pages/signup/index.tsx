import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Input from "../../components/Input";
import PATH from "../../constants/path";

import styled, { keyframes } from "styled-components";
import COLORS from "../../constants/color";
import Button from "../../components/Button";
import {sendMail, signup, verification} from "../../api/auth";
import {type} from "os";


export default function Signup() {

  const [email, setEmail] = useState('');
  const [emailButton, setEmailButton] = useState(false);
  const [code, setCode] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  type InputProps = {
    label: string;
    size: number;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    message?: string;
    placeholder: string;
    readOnly?: boolean;
    isCertification?: {
      title: string;
      size: number; 
      disabled?: boolean;
      theme?: string;
      onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    };
  };

  type UserMail = {
    email : string;
  }

  type UserMailData = {
    email: string;
    inputCode: string;
  }

  type UserSignupData = {
    email : string;
    memberLoginType : string;
    password : string;
    username : string;
  }

  const InputList: InputProps[] = [
    {
      label: "이메일 주소",
      size: 35.38,
      value: "email",
    //   onChange: onChangeEmail,
      type: "email",
      placeholder: "",
      isCertification: {
        title: "인증",
        size: 15,
        disabled: false,
      },
    },
    {
      label: "인증번호 입력",
      size: 35.38,
      value: "code",
      type: "text",
    //   onChange: setCode,
      placeholder: "",
      readOnly: false,
      isCertification: {
        title: "인증 완료",
        size: 15,
        disabled: false,
      },
    },
    {
      label: "이름",
      size: 46.5,
      value: "username",
    //   onChange: onChangeName,
      type: "text",
      placeholder: "",
      readOnly: false,
    },
    {
      label: "비밀번호",
      size: 46.5,
      value: "password",
    //   onChange: onChangePassword,
      type: "password",
      placeholder: "",
      message: `8자 이상 16자 이하로 입력해주세요.`,
      readOnly: false,
    },
    {
      label: "비밀번호 확인",
      size: 46.5,
      value: "passwordCheck",
    //   onChange: onChangePasswordCheck,
      type: "password",
      placeholder: "",
      readOnly: false,
    },
  ];

  // api 요청하는 함수들
  const sendEmail = async () => {
    const userMail: UserMail = {
      email : email
    }
    try {
      const response = await sendMail(userMail);
    } catch (error) {
      console.error(error);
    }
  }

  const emailCodeVerfify = async () => {
    const userMailData : UserMailData = {
      email : email,
      inputCode : code
    };
    try {
      const response = await verification(userMailData);
      setIsValid(response);
    } catch (error) {
      console.error(error);
    }
  }

  const signUp = async () => {
    const userSignupData : UserSignupData = {
      email : email,
      memberLoginType : "RELEASE_LOGIN",
      password : password,
      username : name
    };
    try{
      const response = await signup(userSignupData);
      // 로그인 화면으로 리다이렉트
      alert("회원가입에 성공하셨습니다. 로그인해주세요.");
      navigate(`${PATH.LOGIN}`)

    } catch (error) {
      console.error(error);
    }
  }

  // useState 관련, 기타 함수들
  const handleEmailEdit = (e : React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  }

  const handleSendEmail = () => {
    setEmailButton(true);
    // 이메일 인증 api 전송
    sendEmail()
  }

  const handleEmailCodeEdit = (e : React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  }

  const handleCertificateEmail = () => {
    emailCodeVerfify();
  }

  const handleNameEdit = (e : React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handlePasswordEdit = (e : React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  }

  const handlePasswordValidationEdit = (e : React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPasswordConfirm(e.target.value);
  }

  const handleSignUpButton = () => {
    const passwordRegex = /^\s*$|^(?=.*[a-zA-Z])(?=.*[\W])(?=.*[0-9]).{8,}$/;
    if(!isValid) {
      alert("인증 코드가 일치하지 않습니다.");
      return;
    }
    if(!passwordRegex.test(password) || password === '') {
      alert("비밀번호는 길이 8자 이상, 영문자 1개 이상, 숫자 1개 이상, 특수문자 1개를 포함해야 합니다.");
      return;
    }
    if(password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if(!isAgree) {
      alert("약관에 동의 해주세요.");
      return;
    }

    // api 요청
    signUp();
  }

  return (
    <Wrapper>
      <Container>
        <SignupTitleContainer>
          <SignupTitle>회원가입</SignupTitle>
          <SignupIntro>가입 후 더 많은 기능을 누려보세요!</SignupIntro>
        </SignupTitleContainer>
        <InputContainer>
          <Input key={"email"} size={35.38} value={email} label={"이메일 주소"}
                 placeholder={"이메일을 입력해주세요."} onChange={handleEmailEdit} readOnly={emailButton}/>
          <CertificationStyledButton title={emailButton ? "재전송" : "인증"} onClick={handleSendEmail}/>
        </InputContainer>
        <InputContainer>
          <Input key={"code"} size={35.38} value={code} label={"인증번호 입력"}
                 placeholder={"인증 코드를 입력해주세요."} onChange={handleEmailCodeEdit} readOnly={false}/>
          <CertificationStyledButton title={"인증완료"} onClick={handleCertificateEmail}/>
        </InputContainer>
        {emailButton && !isValid ? (
            <Warn>인증 번호가 다릅니다.</Warn>
        ) : isValid ? <Pass>인증되었습니다.</Pass> : <></>}
        <InputContainer>
          <Input key={"name"} size={46.5} value={name} label={"이름"}
                 placeholder={"이름을 입력해주세요."} onChange={handleNameEdit} readOnly={false}/>
        </InputContainer>
        <InputContainer>
          <Input key={"password"} size={46.5} value={password} label={"비밀번호"} type={"password"}
                 placeholder={"비밀번호를 입력해주세요."} onChange={handlePasswordEdit} readOnly={false}/>
        </InputContainer>
        <InputContainer>
          <Input key={"password"} size={46.5} value={passwordConfirm} label={"비밀번호 확인"} type={"password"}
                 placeholder={"비밀번호를 한번 더 입력해주세요."} onChange={handlePasswordValidationEdit} readOnly={false}/>
        </InputContainer>
        {/*{InputList.map((input) =>*/}
        {/*   (*/}
        {/*    <InputContainer>*/}
        {/*      <Input*/}
        {/*        key={input.label}*/}
        {/*        size={input.size}*/}
        {/*        label={input.label}*/}
        {/*        value={input.value}*/}
        {/*        type={input.type}*/}
        {/*        onChange={input.onChange}*/}
        {/*        message={input.message}*/}
        {/*        placeholder={input.placeholder}*/}
        {/*        readOnly={input.readOnly}*/}
        {/*      />*/}
        {/*      {input.isCertification && (*/}
        {/*        <CertificationStyledButton*/}
        {/*          title={input.isCertification?.title}*/}
        {/*          // size="15"*/}
        {/*          disabled={input.isCertification.disabled}*/}
        {/*          // theme={input.isCertification?.theme}*/}
        {/*          onClick={input.isCertification?.onClick}*/}
        {/*        />*/}
        {/*      )}*/}
        {/*    </InputContainer>*/}
        {/*  )*/}
        {/*)}*/}
        <PersonalDiv>
          <StyledCheckBox
            type="checkbox"
            value=""
            size={1.3}
            onChange={() => setIsAgree(!isAgree)}
          />
          DOKLIB 개인정보 수집 및 동의 (필수)
          <PersonalInfo>자세히</PersonalInfo>
        </PersonalDiv>
        <Buttons>
          이미 계정이 있으신가요?
          <SignupButton>
            <Link to={PATH.LOGIN}>로그인</Link>
          </SignupButton>
          <SignUpStyledButton
            title="계정 만들기"
            width="13.5rem"
            onClick={handleSignUpButton}
          />
        </Buttons>
      </Container>
    </Wrapper>
  );
}



const Wrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-item: center;
//   width: 52rem;
  gap: 3rem;
//   height: 60rem;
  font-size: 1.2rem;
`;

const Container = styled.div`
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: center;
  width: 46.5rem;
  position: relative;
  gap: 3rem;
`;
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 700;
  font-size: 1.6rem;
  color: ${COLORS.BLACK};
  span {
    margin-top: 0.2rem;
    font-family: GmarketSans;
  }
`;

const PartTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  gap: 1rem;
`;
const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50%);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
`;

const CodeContainer = styled.p`
  display: flex;
  flex-direction: row;
  position: relative;
  opacity: 0;
  gap: 1rem;
  &.show-text {
    opacity: 1;
    animation: ${fadeInDown} 1s forwards;
  }
`;

const Title = styled.div`
  font-size: 2.4rem;
  font-weight: 700;
  color: ${COLORS.GREY[600]};
  padding: 0 0 0.5rem 0;
`;
const PartTitle = styled.div`
  font-size: 1.2rem;
  padding-top: 0.2rem;
  color: ${COLORS.GREY[400]};
`;
const CertificationStyledButton = styled(Button)`
  margin-top: 2.6rem;
  font-size: 1.4rem;
  height: 3.1rem;
  border-radius: 0.7rem;
  min-width: 7.32rem;
`;

const CodeStyledButton = styled(Button)`
  margin-top: 2.6rem;
  font-size: 1.4rem;
  height: 4.7rem;
  border-radius: 0.7rem;
  width: 11.32rem;
`;
const SignUpStyledButton = styled(Button)`
  font-size: 1.4rem;
  padding: 1.2rem 1rem;
  border-radius: 0.7rem;
  position: absolute;
  top: 0;
  right: 0;
`;

const Buttons = styled.div`
  font-size: 1.3rem;
  color: ${COLORS.GREY[400]};
  padding-bottom: 7rem;
  display: flex;
  position: relative;
`;
const PersonalDiv = styled.div`
  font-size: 1.3rem;
  color: ${COLORS.GREY[400]};
  display: flex;
  position: relative;
`;

const PersonalInfo = styled.div`
  margin-left: 2rem;
  font-size: 1.3rem;
  color: ${COLORS.GREY[400]};
  display: flex;
  position: relative;
`;

const StyledCheckBox = styled(Input)`
  zoom: 1.2;
  margin-top: -0.7rem;
  margin-right: 0.5rem;
`;

const SignupButton = styled.button`
  font-size: 1.3rem;
  color: ${COLORS.GREY[400]};
  cursor: pointer;
  padding-left: 1rem;
  border: none;
  background-color: transparent;
  text-decoration: underline;
`;

const Warn = styled.p`
  font-size: 1.1rem;
  color: ${COLORS.RED};
  margin-left: 0.5rem;
`;

const Pass = styled.p`
  font-size: 1.1rem;
  color: ${COLORS.BLUE};
  margin-left: 0.5rem;
`;

const SignupTitleContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
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