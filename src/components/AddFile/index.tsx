import styled from "styled-components";
import COLORS from "../../constants/color";
import React from "react";

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 35rem;
`;

const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7.3rem;
  height: 2.6rem;
  color: #000;
  font-family: Inter;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: 0.1rem solid ${COLORS.GREY[600]};
  margin-bottom: 0.88rem;
  cursor: pointer;
`;
const AddContainer = styled.div`
  min-width: 35rem;
  width: 35rem;
  height: 17.625rem;
  border-radius: 0.625rem;
  border: 0.1rem solid ${COLORS.GREY[300]};
`;

export default function AddFile() {
  return (
    <LogoContainer>
      <AddButton>첨부하기</AddButton>
      <AddContainer></AddContainer>
    </LogoContainer>
  );
}
