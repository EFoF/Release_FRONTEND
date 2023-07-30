import React, { useState } from "react";
import styled from "styled-components";
import "../../styles/font.css";
import setting from "../../img/setting1.png"
import Button from "../Button";

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

const MyRow = styled.div`
    display: flex;
    justify-content: center;
`

const MyTitle = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;
  margin-right: 1.4rem;
  color: #000;
    font-family: Inter;
    font-size: 2rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const MySetting = styled.img`
    width: 1.8rem;
    height: 1.8rem;
    margin-top: 0.5rem;
    cursor: pointer;
`

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

const ButtonContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   position: relative;
//   bottom: 0;
  position: absolute;
  bottom: 1rem; /* 버튼과 하단 간격 조절 */
  left: 50%; /* 가운데 정렬을 위해 왼쪽 위치 조절 */
  transform: translateX(-50%); /* 가운데 정렬을 위해 가로 방향으로 이동 */
`

export default function MySide() {
  
  return (
    <Container>
      <SidebarContainer>
        <MyRow>
            <MyTitle>내 정보</MyTitle>
            <MySetting src={setting}/>
        </MyRow>
        <MyInfo>
            <MyName>최철웅</MyName>
            <MyEmail>(dlrhdcjs@naver.com)</MyEmail>
        </MyInfo>
      </SidebarContainer>
      <ButtonContainer>
        <Button title="회사 생성하기" theme="blue"/>
      </ButtonContainer>
    </Container>
  );
}
