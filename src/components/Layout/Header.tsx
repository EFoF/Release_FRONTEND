import eagle from "../../img/icon-park-outline_eagle.png";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 5.56rem;
  background-color: white;
  display: flex;
  border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.4);
    // gap: 60rem;
    align-items: center;
    // justify-content: center;
  //   position: fixed;
  //   top: 0;
  //   z-index: 999;
`;

export const LogoBox = styled.div`
  display: flex;
  gap: 10px;
  cursor: pointer;
  align-items: center;
  margin-left: 2rem;
  div {
    color: #000;
    font-family: Inter;
    font-size: 2.25rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

export const LogoImg = styled.img`
  width: 4.375rem;
  height: 4.6875rem;
  flex-shrink: 0;
  margin-top: 0.4rem;
`;

export const ForDev = styled.div`
  margin-left: 1rem;
  margin-top: 0.8rem;
  color: #000;
  font-family: Inter;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export default function Header() { //isDev 추가하기 
  return (
    <Container>
      <LogoBox>
        <LogoImg src={eagle} />
        <div>독수리 플랫폼</div>
      </LogoBox>
      <ForDev>for Developers</ForDev>
    </Container>
  );
}
