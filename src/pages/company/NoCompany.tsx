import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import {useState} from "react"
import { CategoryTitle, Title1 } from "../../components/Text/Title";
import { Navigate, useNavigate } from "react-router";
import PATH from "../../constants/path";


export default function NoCompany() {
    const navigate = useNavigate();
    return (
        <MainContainer>
            <MainText>속한 회사가 없습니다</MainText>
            <Button theme="blue" title="회사 생성하기" onClick={()=>navigate(PATH.COMPANYCREATE)}></Button>
        </MainContainer>
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

