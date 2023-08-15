import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import {useState} from "react"
import { CategoryTitle, Title1 } from "../../components/Text/Title";
import { useNavigate } from "react-router-dom";
import PATH from "../../constants/path";


export default function NoProject() {
    const navigate = useNavigate();
    return (
        <Container>
            <MainContainer>
                <MainText>프로젝트가 존재하지 않습니다</MainText>
                <Button theme="blue" title="프로젝트 생성하기" width="14rem" onClick={()=>navigate(PATH.PROJECTCREATE)}></Button>
            </MainContainer>
        </Container>
    )
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MainContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: calc(100vh - 8rem);
`;

export const MainText = styled.div`
color: rgba(0, 0, 0, 0.60);
font-family: S-light;
font-size: 2.25rem;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-bottom: 2.44rem;
`;

