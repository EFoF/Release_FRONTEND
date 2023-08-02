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
import {CompanyCard, CompanyContainer, CompanyImage, CompanyListContainer, CompanyName} from "../home";


export default function ProjectCreate() {
    const companies = [
        {name: "카카오 엔터프라이즈", imageUrl: kakaoenter},
        {name: "네이버", imageUrl: naver},
        {name: "카카오페이", imageUrl: kakaopay},
        {name: "카카오 브레인", imageUrl: kakaobrain},
        {name: "EagleEagle", imageUrl: eagle},
        {name: "카카오 뱅크", imageUrl: kakaobank},
        {name: "카카오 게임즈", imageUrl: kakaogames},
        {name: "페이스북", imageUrl: facebook},
    ];

    const navigate = useNavigate();
    const [searchKey, setSearchKey] = useState("");

    const handleCompanyClick = () => {
        navigate(PATH.COMPANYMAIN);
    };

    const projectClick = () => {
        navigate(PATH.MYPROJECT);
    };

    return (
        <Container>
            <MainContainer>
                <div style={{ display: "flex" }}>
                    <CompanyTitle>내가 소속된 회사</CompanyTitle>
                    <ProjectTitle onClick={projectClick}>내가 소속된 프로젝트</ProjectTitle>
                </div>
                <CompanyContainer>
                    <CompanyListContainer>
                        {companies
                            .filter((c) => c.name.includes(searchKey))
                            .map((company, index) => (
                                <CompanyCard key={index} onClick={handleCompanyClick}>
                                    <CompanyImage src={company.imageUrl} alt={company.name}/>
                                    <CompanyName>{company.name}</CompanyName>
                                </CompanyCard>
                            ))}
                    </CompanyListContainer>
                </CompanyContainer>
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

export const CompanyTitle = styled(Title1)`
  margin-bottom: 4.69rem;
  margin-right: 4.69rem;
`;

export const ProjectTitle = styled(Title2)`
  margin-bottom: 4.69rem;
  cursor: pointer;
`;
