import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import React, {useState} from "react"
import {useNavigate} from "react-router-dom";
import {CompanyTitle} from "../company/myProjects";
import {Title1} from "../../components/Text/Title";
import ConfirmationModal from "./confirmationModal";

export default function Withdrawal() {
    const [inputOldPassword, setInputOldPassword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleChangeInputOldPassword = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setInputOldPassword(e.target.value)
    }

    const handleBack = () => {
        navigate(-1);
    };

    const handleWithdrawal = () => {
        // 회원 탈퇴 재 확인 문구 모달 띄워주기
        // 모달 열기
        setIsModalOpen(true);
    };

    const handleModalCancel = () => {
        // 모달 닫기
        setIsModalOpen(false);
    };

    const handleModalConfirm = () => {
        // 회원 탈퇴 로직 추가
        // ...

        // 모달 닫기
        setIsModalOpen(false);
    };

    return (
        <Container>
            <MainContainer>
                <InfoContainer>
                    <InfoTitle>회원 탈퇴</InfoTitle>
                    <InfoItem>
                        <Label>현재 비밀번호</Label>
                        <Input size={20} value={inputOldPassword} onChange={handleChangeInputOldPassword}></Input>
                    </InfoItem>
                    <ButtonContainer>
                        <Button onClick={handleBack} title={"돌아가기"}></Button>
                        <Button onClick={handleWithdrawal} theme={"red"} title={"회원 탈퇴"}></Button>
                    </ButtonContainer>
                </InfoContainer>
            </MainContainer>
            <ConfirmationModal isOpen={isModalOpen} onCancel={handleModalCancel} onConfirm={handleModalConfirm} />
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
  font-size: 1.35rem;
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