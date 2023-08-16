import React, {useState, useEffect} from "react";
import styled from "styled-components";
import "../../styles/font.css";
import setting from "../../img/setting1.png"
import Button from "../Button";
import {useNavigate} from "react-router";
import PATH from "../../constants/path";
import {loadMyInfo} from "../../api/auth";
import {getMyCompanies} from "../../api/company";
import {useRecoilState} from "recoil";
import {companyIdState, companyNameState} from "../../states/companyState";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  //height: 65rem;
  // min-height: calc(100vh - 5.56rem);
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

const MyOrganizationRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  cursor: pointer;
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

const MyOrganizations = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
  margin-right: 1.4rem;
  cursor: pointer;
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

const OrganizationsContainer = styled.div`
  color: #000;
  font-family: Inter;
  margin-top: 3rem;
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
  bottom: 2rem; /* 버튼과 하단 간격 조절 */
  left: 50%; /* 가운데 정렬을 위해 왼쪽 위치 조절 */
  transform: translateX(-50%); /* 가운데 정렬을 위해 가로 방향으로 이동 */
`

export default function MySide() {
    type Company = {
        id: number;
        name: string;
        imageUrl: string;
    };
    const navigate = useNavigate();
    const [myName, setMyName] = useState("");
    const [myEmail, setMyEmail] = useState("")
    const [companies, setCompanies] = useState<Company[] | null>(null);
    const [companyID, setCompanyID] = useRecoilState<number>(companyIdState);
    const [companyName, setCompanyName] = useRecoilState<string>(companyNameState);

    const handleMySettingClick = () => {
        navigate(PATH.MYINFO);
    }

    const handleMyCompaniesClick = () => {
        navigate(PATH.MYCOMPANY);
    }

    const handleMyCompaniesEach = (companyId: number, companyName: string) => {
        setCompanyID(companyId);
        setCompanyName(companyName);
        // navigate(PATH.COMPANYMAIN, {state: {companyId, companyName}});
        navigate(PATH.PROJECTEDIT, {state: {companyId, companyName}});
    }

    const loadCompanies = async () => {
        try {
            const {content} = await getMyCompanies();
            console.log("content", content);
            setCompanies(content);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchMyInfo = async () => {
            try {
                const {email, username} = await loadMyInfo();
                setMyName(username);
                setMyEmail(email)
                loadCompanies();
            } catch (error) {
                console.error('Error fetching info:', error);
            }
        }
        fetchMyInfo();
    }, [])

    return (
        <Container>
            <SidebarContainer>
                <MyRow>
                    <MyTitle>내 정보</MyTitle>
                    <MySetting src={setting} onClick={handleMySettingClick}/>
                </MyRow>
                <MyInfo>
                    <MyName>{myName}</MyName>
                    <MyEmail>{myEmail}</MyEmail>
                </MyInfo>
                <OrganizationsContainer>
                    <MyRow>
                        <MyOrganizations onClick={handleMyCompaniesClick}>내가 소속된 회사</MyOrganizations>
                    </MyRow>
                    {(companies !== null && companies.length !== 0) && companies.map((company: Company, index) => (
                        <MyOrganizationRow onClick={() => handleMyCompaniesEach(company.id, company.name)}>
                            {company.name}
                        </MyOrganizationRow>
                    ))}
                </OrganizationsContainer>
            </SidebarContainer>
            <ButtonContainer>
                <Button title="회사 생성하기" theme="blue" onClick={() => {
                    navigate(PATH.COMPANYCREATE)
                }}/>
            </ButtonContainer>
        </Container>
    );
}
