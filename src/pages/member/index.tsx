import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import React, {useState} from "react"
import {useNavigate} from "react-router-dom";
import {CompanyTitle} from "../company/myProjects";
import {Title1} from "../../components/Text/Title";
import PATH from "../../constants/path";

export default function Member() {
    const navigate = useNavigate();

    const handlePasswordChange = () => {
        navigate(PATH.PASSWORDCHANGE);
    };

    const handleWithdrawal = () => {
        navigate(PATH.WITHDRAWAL);
    };

    return (
        <Container>
            <MainContainer>
                <InfoContainer>
                    <InfoTitle>정보 수정</InfoTitle>
                    <InfoItem>
                        <Label>이름</Label>
                        <Info>Owen Choi</Info>
                    </InfoItem>
                    <InfoItem>
                        <Label>이메일</Label>
                        <Info>owen123@naver.com</Info>
                    </InfoItem>
                    <ButtonContainer>
                        <Button onClick={handlePasswordChange} title={"비밀번호 변경"}></Button>
                        <Button onClick={handleWithdrawal} theme={"red"} title={"회원 탈퇴"}></Button>
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
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  margin-left: 60px;
  font-weight: bold;
  font-size: 1.75rem;
  flex: 0 0 100px; /* 왼쪽 정렬을 위해 추가, 라벨(Label)의 너비를 100px로 고정 */
`;

const Info = styled.span`
  margin-left: 10px;
  font-size: 1.75rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 130px;

  & > button {
    margin: 0 30px;
  }
`;