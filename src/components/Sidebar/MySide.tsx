import React, { useState } from "react";
import styled from "styled-components";
import "../../styles/font.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 58.44rem;
  width: 30rem; //20.75rem;
  position: sticky;
  top: 5.56rem;
  border-right: 0.0625rem solid rgba(0, 0, 0, 0.2);
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
//   margin-left: 2.08rem;
  margin-top: 2.75rem;
//   justify-content: center;
  align-items: center;
`;

const MyTitle = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;
  color: #000;
    font-family: Inter;
    font-size: 2rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const MyInfo = styled.div`
color: #000;
font-family: Inter;
font-size: 1.5rem;
font-style: normal;
font-weight: 400;
line-height: normal;
`;

const MyName = styled.div`
color: #000;
font-family: Inter;
font-size: 1.5rem;
font-style: normal;
font-weight: 400;
line-height: normal;
`;

const MyEmail = styled.div`
color: #000;
font-family: Inter;
font-size: 1.5rem;
font-style: normal;
font-weight: 400;
line-height: normal;
`;



export default function MySide() {
  
  return (
    <Container>
      <SidebarContainer>
        <MyTitle>내 정보</MyTitle>
        <MyInfo>
            <MyName>최철웅</MyName>
            <MyEmail>(dlrhdcjs@naver.com)</MyEmail>
        </MyInfo>
      </SidebarContainer>
    </Container>
  );
}
