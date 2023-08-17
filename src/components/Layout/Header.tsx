import eagle from "../../img/icon-park-outline_eagle.png";
import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";
import PATH from "../../constants/path";
import profile from "../../img/profile.png";
import bell from "../../img/bell.png";
import Button from "../../components/Button";
import {fetchMyAlarms, readMyAlarms} from "../../api/alarm";
import {PopoverBody, PopoverHeader, UncontrolledPopover} from "reactstrap";
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

export const AlarmContainer = styled.div`
  border-radius: 10px; /* 둥근 테두리 설정 */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* 그림자 설정 */
  padding: 20px; /* 내용과의 간격을 위한 패딩 값 설정 */
  background-color: white;
  max-height: 300px; /* 원하는 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤만 표시 */
`;

export const Background = styled.div`
  font-size: 1.3rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
`;

export const AlarmHeader = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const Button1 = styled(Button)`
  width: 5rem;
  height: 2rem;
  font-size: 1rem;
  margin-left: 16rem;
`

interface HeaderProps {
    isCompany?: boolean;
}

interface Alarm {
    authorEmail: string;
    authorId: number;
    id: number;
    message: string;
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
    const [alarm, setAlarm] = useState<Alarm[] | null>(null);
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
        if(isLogin) {
            getAlarm();
        }
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
                    getAlarm();
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
        navigate(PATH.HOME);
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

    const getAlarm = async () => {
        try {
            const {content} = await fetchMyAlarms();
            console.error("내 알람들", content);
            setAlarm(content);
        } catch (error) {
            console.error(error);
        }
    }

    const readAlarm = async () => {
        try {
            await readMyAlarms();
            console.log("알람 읽음 처리 완료");
            setAlarm([]);
        } catch (error) {
            console.error(error);
        }
    }

    const handleClickMyProfile = () => {
        navigate(PATH.MYCOMPANY);
    }

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
                    <ProfileBox onClick={() => console.log("")}>
                        <ProfileImg src={bell} alt="Bell"/>
                        {alarm &&
                            <>
                                {/*<AlarmCount title={alarm.length.toString()} onClick={() => console.log("")}></AlarmCount>*/}
                                <ProfileName id="alarmId">{alarm.length.toString()}</ProfileName>
                                <UncontrolledPopover placement="bottom" target="alarmId">
                                    <AlarmContainer>
                                        <AlarmHeader>읽지 않은 알람 목록</AlarmHeader>
                                        {alarm.map((alarmEach : Alarm, index) => (
                                            <Background>{alarmEach.message}</Background>
                                        ))}
                                        <Button1 title="읽음 처리" onClick={readAlarm}/>
                                    </AlarmContainer>
                                </UncontrolledPopover>
                            </>
                        }
                    </ProfileBox>
                    <ProfileBox onClick={handleClickMyProfile}>
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
