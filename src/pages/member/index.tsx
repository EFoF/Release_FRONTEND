import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom";
import {CompanyTitle} from "../company/myProjects";
import {Title1} from "../../components/Text/Title";
import PATH from "../../constants/path";
import { loadMyInfo } from "../../api/auth";

interface Member {
    username: string;
    email: string;
}
export default function Member() {
  const [myName, setMyName] = useState("");
  const [MyEmail, setMyEmail] = useState("")

    // const memberResponseDTO: Member = {
    //     username: "Owen Choi",
    //     email: "owen123@naver.com",
    // };

    useEffect(()=>{
      const fetchMyInfo = async () => {
        try {
          const { email, username } = await loadMyInfo();
          setMyName(username);
          setMyEmail(email)
        } catch (error) {
          console.error('Error fetching info:', error);
        }
      }
      fetchMyInfo();
    }, [])


    const navigate = useNavigate();

    const handlePasswordChange = () => {
        navigate(PATH.PASSWORDCHANGE, {state: MyEmail});
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
                        <Info>{myName}</Info>
                    </InfoItem>
                    <InfoItem>
                        <Label>이메일</Label>
                        <Info>{MyEmail}</Info>
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