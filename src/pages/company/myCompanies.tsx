import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Title1, Title2 } from "../../components/Text/Title";
import kakaoenter from "../../img/kakao-enter.jpg";
import naver from "../../img/naver.png";
import kakaopay from "../../img/kakao-pay.jpg";
import kakaobrain from "../../img/kakao-brain.png";
import eagle from "../../img/icon-park-outline_eagle.png";
import kakaobank from "../../img/kakao-brain.png";
import kakaogames from "../../img/kakao-games.jpg";
import facebook from "../../img/facebook.png";
import { useNavigate } from "react-router-dom";
import PATH from "../../constants/path";
import {
  CompanyCard,
  CompanyContainer,
  CompanyImage,
  CompanyListContainer,
  CompanyName,
} from "../home";
import { getMyCompanies } from "../../api/company";
import NoCompany from "./NoCompany";
import { useRecoilState } from "recoil";
import { companyIdState, companyNameState } from "../../states/companyState";

interface Company {
  id: number;
  name: string;
  imageUrl: string;
}

export default function MyCompanies() {
  const [companies, setCompanies] = useState<Company[] | null>(null);
  const [companyID, setCompanyID] = useRecoilState<number>(companyIdState);
  const [companyName, setCompanyName] = useRecoilState<string>(companyNameState);

  useEffect(() => {
    const fetchMyCompanies = async () => {
      try {
        const { content } = await getMyCompanies();
        console.log("content", content);
        setCompanies(content);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchMyCompanies();
  }, []);

  const navigate = useNavigate();

  const handleCompanyClick = (companyId: number, companyName: string) => {
    setCompanyID(companyId);
    setCompanyName(companyName);
    navigate(PATH.PROJECTEDIT, {state: {companyId, companyName}});
  };

  const projectClick = () => {
    navigate(PATH.MYPROJECT);
  };

  return (
    <Container>
      {companies !== null &&
        (companies.length === 0 ? (
          <NoCompany />
        ) : (
          <MainContainer>
              <TabContainer>
                <CompanyTitle>내가 소속된 회사</CompanyTitle>
                <ProjectTitle onClick={projectClick}>
                  내가 소속된 프로젝트
                </ProjectTitle>
              </TabContainer>
            <CompanyContainer>
              <CompanyListContainer>
                {companies !== null &&
                  companies.map((company, index) => (
                    <CompanyCard key={index} onClick={()=>handleCompanyClick(company.id, company.name)}>
                      <CompanyImage src={company.imageUrl} alt={company.name} />
                      <CompanyName>{company.name}</CompanyName>
                    </CompanyCard>
                  ))}
              </CompanyListContainer>
            </CompanyContainer>
          </MainContainer>
        ))}
    </Container>
  );
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3.31rem;
`;

export const TabContainer = styled.div`
display: flex;
`

export const CompanyTitle = styled(Title1)`
  margin-bottom: 4.69rem;
  margin-right: 4.69rem;
`;

export const ProjectTitle = styled(Title2)`
  margin-bottom: 4.69rem;
  cursor: pointer;
`;
