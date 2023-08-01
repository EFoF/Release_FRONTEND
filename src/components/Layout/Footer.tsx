import eagle from "../../img/icon-park-outline_eagle.png";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 4.3125rem;
  background: #E5E3E3;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  color: white;
  // gap: 60rem;
  // background: rgba(0, 0, 0, 0.8);
  // justify-content: space-between;
  // position: sticky;
  // bottom: 0;
  // z-index: 999;
`;

export const LeftBox = styled.div`
    margin-left: 1.4rem;
    display: flex;
  color: rgba(0, 0, 0, 0.8);
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
  margin: auto;
`

export default function Footer() { 
  return (
    <Container>
        <LeftBox>
            <div>개인정보처리방침 | </div>
            <div>서비스 이용약관</div>
        </LeftBox>
        <LogoImg src={eagle}/>
    </Container>
  )
}
