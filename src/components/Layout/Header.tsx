import eagle from "../../img/icon-park-outline_eagle.png";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import PATH from "../../constants/path";
import profile from "../../img/profile.png"

export const Container = styled.div`
  width: 100%;
  height: 5.56rem;
  background-color: white;
  display: flex;
  border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.2);
  align-items: center;
    position: fixed;
    top: 0;
    z-index: 999;
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

export const RightBox1 = styled.div`
  margin-left: auto;
  margin-right: 3rem;
  color: #000;
  font-family: Inter;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`;

export const RightBox2 = styled.div`
display: flex;
align-items: center;
margin-right: 2.5rem;
gap: 2rem;
`

export const ProfileBox = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileImg = styled.img`
  width: 2.4rem;
  height: 2.6rem;
  margin-right: 0.4rem;
`;

export const ProfileName = styled.div`
  font-size: 1.5rem;
`;

export const Logout = styled.div`
font-size: 1.5rem;

`;

interface HeaderProps {
  isDev: boolean;
  isCompany?: boolean;
}

export default function Header({isDev, isCompany}:HeaderProps) { //isDev 추가하기
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate(PATH.HOME)
  } //회사면 첫 디폴트 카테고리로 

  return (
    <Container>
      <LogoBox>
        {(isCompany ? "" : <LogoImg src={eagle} />)}
        {(isCompany ?<div>카카오 엔터프라이즈</div> : <div onClick={handleLogoClick}>독수리 플랫폼</div>)}
      </LogoBox>
      {(isDev ? <ForDev>for Developers</ForDev> : "")}
      <RightBox1 onClick={()=>navigate(PATH.LOGIN)}>개발자이신가요?</RightBox1>
      <RightBox2>
        <ProfileBox>
          <ProfileImg src={profile} alt="Person" />
          <ProfileName>최철웅</ProfileName>
        </ProfileBox>
        <Logout>로그아웃</Logout>
      </RightBox2>
    </Container>
  );
}
