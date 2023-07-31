import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import {useState} from "react"
import { CategoryTitle, Title1 } from "../../components/Text/Title";

export default function ProjectCreate() {

  return (
    <Container>
      <CompanyContainer>
        <Title1>프로젝트 생성하기</Title1>
        <CategoryTitle>프로젝트 이름</CategoryTitle>
      </CompanyContainer>
    </Container>
  );
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const CompanyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  margin-left: 3.8rem;
  width: 80rem;

`;
