import styled from "styled-components";
import React, {useState} from "react";
import {CategoryTitle, Title1} from "../../components/Text/Title";

export default function ReleaseCreate() {
    const [project, setProject] = useState("첫회사 첫 프로젝트");
    const [categories, setCategories] = useState([
        {
            title: "첫 프로젝트 첫 카테고리",
        },
        {
            title: "첫번째 프로젝트 두번째 카테고리",
        },
        {
            title: "첫번째 프로젝트 세번째 카테고리",
        },
        {
            title: "첫번째 프로젝트 네번째 카테고리",
        },
        {
            title: "첫번째 프로젝트 다섯번째 카테고리",
        }
    ]);
    const [releaseVersion, setReleaseVersion] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [releaseTag, setReleaseTag] = useState("");
    const [releaseDetail, setReleaseDetail] = useState("");

    const handleChangeVersion = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setReleaseVersion(e.target.value);
    }

    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setReleaseDate(e.target.value);
    }

    const handleChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setReleaseTag(e.target.value);
    }

    const handleDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setReleaseDetail(e.target.value);
    }

    return (
        <Container>
            <MainContainer>
                <ReleaseCreateTitle>{project}</ReleaseCreateTitle>
                <ReleaseContainer>
                    {categories.map((category, index) =>
                        <CategoryTitle1 key={index}>{category.title}</CategoryTitle1>
                    )}
                </ReleaseContainer>
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

export const ReleaseCreateTitle = styled(Title1)`
  margin-bottom: 4.69rem;
`;

export const ReleaseContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;
`;

export const CategoryTitle1 = styled(CategoryTitle)`
  margin-top: 0.4rem;
`;