import eagle from "../../img/icon-park-outline_eagle_white.png";
import home from "../../img/ant-design_home-outlined.png"
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 4.3125rem;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  // gap: 60rem;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  z-index: 999;
  color: white;
`;

export const LeftBox = styled.div`
    margin-left: 1.4rem;
    display: flex;
  color: #fff;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  div{
    margin-right: 0.2rem;
  }
`;

export const LogoImg = styled.img`
  width: 3.12rem;
  height: 3.12rem;
//   margin: auto;
`

export const LogoImg2 = styled.img`
  width: 3.12rem;
  height: 3.12rem;
  cursor: pointer;
  margin-right: 0.6rem;
`

export default function Footer() { 
  return (
    <Container>
        <LeftBox>
            <div>개인정보처리방침 | </div>
            <div>서비스 이용약관</div>
        </LeftBox>
        <LogoImg src={eagle}/>
        <LogoImg2 src={home} />
    </Container>
  )
}
