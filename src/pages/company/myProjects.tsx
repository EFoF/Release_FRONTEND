import styled from "styled-components";
import React, { useEffect, useState } from "react";
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
  ProjectCard,
  ProjectContainer,
  ProjectImage,
  ProjectListContainer,
  ProjectName,
} from "../home";
import { getMyCompanies, getMyProjects } from "../../api/company";
import NoProject from "./NoProject";

interface Project {
  id: number;
  name: string;
  imgURL: string;
  companyId: number;
}

export default function MyProjects() {
  const [projects, setProjects] = useState<Project[] | null>(null);

  const navigate = useNavigate();

  const handleCompanyClick = () => {
    navigate(PATH.COMPANYMAIN);
  };

  const companyClick = () => {
    navigate(PATH.MYCOMPANY);
  };

  // content 형식 확인 및 api 있는지 확인 및 회사이름 확인
  useEffect(() => {
    const fetchMyProjects = async () => {
      try {
        const {
          list: { content },
        } = await getMyProjects();
        console.log("content", content);
        setProjects(content);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchMyProjects();
  }, []);

  return (
    <Container>
      {projects !== null &&
        (projects.length === 0 ? (
          <NoProject />
        ) : (
          <MainContainer>
            <TabContainer>
                  <CompanyTitle onClick={companyClick}>
                    내가 소속된 회사
                  </CompanyTitle>
                  <ProjectTitle>내가 소속된 프로젝트</ProjectTitle>
            </TabContainer>
            <ProjectContainer>
              <ProjectListContainer>
                {projects !== null &&
                  projects.map((project, index) => (
                    <ProjectCard key={index} onClick={handleCompanyClick}>
                      <ProjectImage src={project.imgURL} alt={project.name} />
                      <ProjectName>{project.name}</ProjectName>
                    </ProjectCard>
                  ))}
              </ProjectListContainer>
            </ProjectContainer>
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

export const CompanyTitle = styled(Title2)`
  margin-bottom: 4.69rem;
  margin-right: 4.69rem;
  cursor: pointer;
`;

export const ProjectTitle = styled(Title1)`
  margin-bottom: 4.69rem;
`;
