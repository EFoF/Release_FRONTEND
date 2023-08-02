import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import React, {useState} from "react"
import {CategoryTitle, Title1, Title2} from "../../components/Text/Title";
import toggleOff from "../../img/ri_toggle-line.png"
import toggleOn from "../../img/ri_toggle-fill.png"
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
import {
    CompanyCard,
    CompanyContainer,
    CompanyImage,
    CompanyListContainer,
    CompanyName, ProjectCard,
    ProjectContainer, ProjectImage, ProjectListContainer, ProjectName
} from "../home";


export default function ProjectCreate() {
    const projects = [
        {name: "DOKSEOL", imageUrl: kakaoenter},
        {name: "DOKLIB", imageUrl: naver},
        {name: "DOKBAK", imageUrl: kakaopay},
        {name: "DOKDIE", imageUrl: kakaobrain},
        {name: "DOKSA", imageUrl: eagle},
        {name: "DOKDO", imageUrl: kakaobank},
        {name: "DOKSURI", imageUrl: kakaogames},
        {name: "DOKPA", imageUrl: facebook},
    ];

    const navigate = useNavigate();
    const [searchKey, setSearchKey] = useState("");

    const handleCompanyClick = () => {
        navigate(PATH.COMPANYMAIN);
    };

    const companyClick = () => {
        navigate(PATH.MYCOMPANY);
    };

    return (
        <Container>
            <MainContainer>
                <div style={{ display: "flex" }}>
                    <CompanyTitle onClick={companyClick}>내가 소속된 회사</CompanyTitle>
                    <ProjectTitle>내가 소속된 프로젝트</ProjectTitle>
                </div>
                <ProjectContainer>
                    <ProjectListContainer>
                        {projects
                            .filter((c) => c.name.includes(searchKey))
                            .map((project, index) => (
                                <ProjectCard key={index} onClick={handleCompanyClick}>
                                    <ProjectImage src={project.imageUrl} alt={project.name}/>
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
