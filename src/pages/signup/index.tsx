import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import PATH from "../../constants/path";

import styled, { keyframes } from "styled-components";
import COLORS from "../../constants/color";
import Button from "../../components/Button";


export default function Signup() {

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
      size: "large" | "medium" | "small";
      disabled: boolean;
      theme: string;
      onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    };
  };

  const InputList: InputProps[] = [
    {
      label: "이메일 주소",
      size: 35.38,
      value: "email",
    //   onChange: onChangeEmail,
      type: "email",
      placeholder: "",
    },
    {
      label: "인증번호 입력",
      size: 35.38,
      value: "code",
      type: "text",
    //   onChange: setCode,
      placeholder: "",
      readOnly: false,
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

  return (
    <Wrapper>
      <Container>
        <SignupTitleContainer>
          <SignupTitle>회원가입</SignupTitle>
          <SignupIntro>가입 후 더 많은 기능을 누려보세요!</SignupIntro>
        </SignupTitleContainer>
        {InputList.map((input) =>
           (
            <InputContainer>
              <Input
                key={input.label}
                size={input.size}
                label={input.label}
                value={input.value}
                type={input.type}
                onChange={input.onChange}
                message={input.message}
                placeholder={input.placeholder}
                readOnly={input.readOnly}
              />
            </InputContainer>
          )
        )}
        <PersonalDiv>
          <StyledCheckBox
            type="checkbox"
            value=""
            size={1.3}
            // onChange={handleCheckboxChange}
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
            // disabled={}
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
  height: 4.7rem;
  border-radius: 0.7rem;
  width: 7.32rem;
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
  padding-top: 1rem;
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