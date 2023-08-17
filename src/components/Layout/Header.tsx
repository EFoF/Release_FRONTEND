import eagle from "../../img/icon-park-outline_eagle.png";
import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";
import PATH from "../../constants/path";
import profile from "../../img/profile.png";
import {useRecoilState, useRecoilValue} from "recoil";
import {useState, useEffect} from "react"
import {loadMyInfo, logout} from "../../api/auth";
import {companyIdState, companyNameState} from "../../states/companyState";
import { searchCompany } from "../../api/company";

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
  width: 4rem;
  height: 4.2rem;
  flex-shrink: 0;
  margin-top: 0.4rem;
`;

export const ForDev = styled.span`
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
  margin-left: auto;
  align-items: center;
  margin-right: 2.5rem;
  gap: 2rem;
`;

export const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
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
  cursor: pointer;
`;

interface HeaderProps {
    isCompany?: boolean;
}

export default function Header({isCompany}: HeaderProps) {
    //isDev 추가하기
    const navigate = useNavigate();
    // const [isLogin, setIsLogin] = useRecoilState(isLoginState);
    const [myName, setMyName] = useState("");
    const [companyTitle, setcompanyTitle] = useState("");
    const [isLogin, setIsLogin] = useState(!!localStorage.getItem("accessToken"));
    const companyId = useRecoilValue(companyIdState);  
    const [companyName, setCompanyName] = useRecoilState<string>(companyNameState);

    const location = useLocation();
    const [isDev, setIsDev] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { content } = await searchCompany();            
            const matchingCompany = content.filter((company: { id: number; }) => company.id === companyId);
            console.log("matchingCompany", matchingCompany);
            setCompanyName(matchingCompany[0].name);
            console.log("companyName", companyName);
          } catch (error) {
            console.error("Error fetching companies:", error);
          }
        };
      
        fetchData();
      }, [companyId, companyName, setCompanyName]);

    useEffect(() => {
        setIsDev(location.pathname.includes("mypage") || location.pathname.includes("dev"));
    }, [location.pathname]);
    console.log("isDev", isDev)

    useEffect(() => {
        if (isCompany) {
            setCompanyName(companyName)
        }
    }, [companyName, isCompany, setCompanyName])

    useEffect(() => {
        if (isLogin) {
            const fetchMyInfo = async () => {
                try {
                    const {username} = await loadMyInfo();
                    setMyName(username);
                } catch (error) {
                    console.error('Error fetching info:', error);
                }
            }
            fetchMyInfo();
        }
    }, [isLogin])

    const handleLogoClick = () => {
        navigate(PATH.HOME);
    };

    const handleDevLogoClick = () => {
        navigate(PATH.MYCOMPANY);
    };

    const handleCompanyTitleClick = () => {
        navigate(PATH.COMPANYMAIN);
    }; //회사면 첫 디폴트 카테고리로, dev면 다르게?

    const handleLogout = async() => {
        try {
            const data = await logout();
            console.log("logout", data);
            setIsLogin(false);
            localStorage.clear();
            navigate(PATH.HOME);
        } catch(e){
            console.error("logout", e)
        }
    };

    return (
        <Container>
            <LogoBox>
                {isCompany ? "" : <LogoImg src={eagle}/>}
                {
                    isCompany ? (
                        isDev ? (
                            <div onClick={handleCompanyTitleClick}>{companyName}<ForDev>for Developers</ForDev> </div>
                        ) : (
                            <div onClick={handleCompanyTitleClick}>{companyName}</div>
                        )                        
                    ) : (
                        isDev ? (
                            <div onClick={handleDevLogoClick}>
                                DOKLIB
                                <ForDev>for Developers</ForDev>
                            </div>
                        ) : (
                            <div onClick={handleLogoClick}>DOKLIB</div>
                        )
                    )
                }
            </LogoBox>
            {isLogin ? (
                <RightBox2>
                    <ProfileBox onClick={handleDevLogoClick}>
                        <ProfileImg src={profile} alt="Person"/>
                        <ProfileName>{myName}</ProfileName>
                    </ProfileBox>
                    <Logout onClick={handleLogout}>로그아웃</Logout>
                </RightBox2>
            ) : (
                <RightBox1 onClick={() => navigate(PATH.LOGIN)}>
                    개발자이신가요?
                </RightBox1>
            )}
        </Container>
    );
}
