import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import React, {useState, useEffect} from "react"
import {useNavigate, useLocation } from "react-router-dom";
import {Title1} from "../../components/Text/Title";
import { updatePassword } from "../../api/auth";

export default function PasswordChange() {
    const [inputOldPassword, setInputOldPassword] = useState("");
    const [inputNewPassword, setInputNewPassword] = useState("");
    const [checkNewPassword, setCheckNewPassword] = useState("");

    const { state } = useLocation();
    const navigate = useNavigate();

    const handleChangeInputOldPassword = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setInputOldPassword(e.target.value)
    }

    const handleChangeCheckNewPassword = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setCheckNewPassword(e.target.value)
    }

    const handleChangeInputNewPassword = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setInputNewPassword(e.target.value)
    }

    const handleBack = () => {
        navigate(-1);
    };

    const handleChangePassword = () => {
      const userInfo = {
        "inputEmail": state,
        "inputNewPassword": inputNewPassword,
        "inputOldPassword": inputOldPassword,
      }

      const updateMyPassword = async () => {
        try {
          const data = await updatePassword(userInfo);
          console.log("content", data);
        } catch (error) {
          console.error("Error Update Password:", error);
        }
      };
      updateMyPassword();
    };

    return (
        <Container>
            <MainContainer>
                <InfoContainer>
                    <InfoTitle>비밀번호 변경</InfoTitle>
                    <InfoItem>
                        <Label>현재 비밀번호</Label>
                        <Input type="password" size={20} value={inputOldPassword} onChange={handleChangeInputOldPassword}></Input>
                    </InfoItem>
                    <InfoItem>
                        <Label>새 비밀번호</Label>
                        <Input type="password" size={20} value={inputNewPassword} onChange={handleChangeInputNewPassword}></Input>
                    </InfoItem>
                    <InfoItem>
                        <Label>새 비밀번호 확인</Label>
                        <Input type="password" size={20} value={checkNewPassword} onChange={handleChangeCheckNewPassword}></Input>
                    </InfoItem>
                    <ButtonContainer>
                        <Button onClick={handleBack} title={"돌아가기"}></Button>
                        <Button onClick={handleChangePassword} title={"적용하기"}></Button>
                    </ButtonContainer>
                </InfoContainer>
            </MainContainer>
        </Container>
    );
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3.31rem;
`;

export const InfoContainer = styled.div`
  //display: flex;
  //flex-direction: column;
  //align-items: center;
  //justify-content: center;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid #ccc;
  width: 450px;
  height: 400px;
`;

const InfoTitle = styled(Title1)`
  //margin-bottom: 4.69rem;
  margin-bottom: 6.69rem;
  //margin-right: 4.69rem;
  text-align: center;
`;

const InfoItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  margin-left: 60px;
  font-weight: bold;
  font-size: 1.35rem;
  flex: 0 0 100px; /* 왼쪽 정렬을 위해 추가, 라벨(Label)의 너비를 100px로 고정 */
`;

const Info = styled.span`
  margin-left: 10px;
  font-size: 1.35rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;

  & > button {
    margin: 0 30px;
  }
`;