import styled from "styled-components";
import React, {useState} from "react"
import {Title1, Title2} from "../../components/Text/Title";
import kakaoenter from "../../img/kakao-enter.jpg";
import naver from "../../img/naver.png";
import kakaopay from "../../img/kakao-pay.jpg";
import kakaobrain from "../../img/kakao-brain.png";
import eagle from "../../img/icon-park-outline_eagle.png";
import kakaobank from "../../img/kakao-brain.png";
import kakaogames from "../../img/kakao-games.jpg";
import facebook from "../../img/facebook.png";
import {useNavigate} from "react-router-dom";
import PATH from "../../constants/path";
import {ProjectCard, ProjectContainer, ProjectImage, ProjectListContainer, ProjectName} from "../home";

interface Project {
    // id : number;
    name: string;
    imgURL: string;
    companyId: number;
}

interface ProjectData {
    findProjectListByCompanyResponseDtoList: Project[];
}

export default function MyProjects() {
    const [projects, setProjects] = useState<ProjectData>(
        {
            findProjectListByCompanyResponseDtoList: [
                {
                    // id: 1,
                    name: "DOKSEOL",
                    imgURL: kakaoenter,
                    companyId: 1,
                },
                {
                    // id: 1,
                    name: "DOKLIB",
                    imgURL: kakaoenter,
                    companyId: 1,
                },
                {
                    // id: 1,
                    name: "DOKBAK",
                    imgURL: naver,
                    companyId: 2,
                },
                {
                    // id: 1,
                    name: "DOKODIE",
                    imgURL: naver,
                    companyId: 2,
                },
                {
                    // id: 1,
                    name: "DOKSAA",
                    imgURL: kakaogames,
                    companyId: 3,
                },
                {
                    // id: 1,
                    name: "DOKDO",
                    imgURL: kakaogames,
                    companyId: 3,
                },
                {
                    // id: 1,
                    name: "DOKSURI",
                    imgURL: facebook,
                    companyId: 4,
                },
                {
                    // id: 1,
                    name: "DOKPA",
                    imgURL: facebook,
                    companyId: 4,
                }
            ]
        }
    )

    const navigate = useNavigate();

    const handleCompanyClick = () => {
        navigate(PATH.COMPANYMAIN);
    };

    const companyClick = () => {
        navigate(PATH.MYCOMPANY);
    };

    return (
        <Container>
            <MainContainer>
                <div style={{display: "flex"}}>
                    <CompanyTitle onClick={companyClick}>내가 소속된 회사</CompanyTitle>
                    <ProjectTitle>내가 소속된 프로젝트</ProjectTitle>
                </div>
                <ProjectContainer>
                    <ProjectListContainer>
                        {projects.findProjectListByCompanyResponseDtoList
                            .map((project, index) => (
                                <ProjectCard key={index} onClick={handleCompanyClick}>
                                    <ProjectImage src={project.imgURL} alt={project.name}/>
                                    <ProjectName>{project.name}</ProjectName>
                                </ProjectCard>
                            ))}
                    </ProjectListContainer>
                </ProjectContainer>
            </MainContainer>
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

export const CompanyTitle = styled(Title2)`
  margin-bottom: 4.69rem;
  margin-right: 4.69rem;
  cursor: pointer;
`;

export const ProjectTitle = styled(Title1)`
  margin-bottom: 4.69rem;
`;
