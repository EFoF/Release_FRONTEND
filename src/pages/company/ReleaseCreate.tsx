import styled from "styled-components";
import React, {useState} from "react";
import {CategoryTitle, Title1} from "../../components/Text/Title";
import {Table1, HeaderCell, TableRow, TableCell, TableCellBold} from "../../components/Table";

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
                    {categories.map((category, index) =>
                        <ReleaseContainer>
                            <CategoryTitle1 key={index}>{category.title}</CategoryTitle1>
                            <ReleaseTable>
                                <thead>
                                <tr>
                                    <HeaderCell1>버전</HeaderCell1>
                                    <HeaderCell1>날짜</HeaderCell1>
                                    <HeaderCell1>태그</HeaderCell1>
                                    <HeaderCell1>변경사항</HeaderCell1>
                                    <HeaderCell1/>
                                </tr>
                                </thead>
                                <tbody>
                                    <ReleaseRow>
                                        <TableCell1>dkdk</TableCell1>
                                        <TableCell1>dkdk</TableCell1>
                                        <TableCell1>dkdk</TableCell1>
                                        <TableCell1>dkdk</TableCell1>
                                        <TableCell1>-</TableCell1>
                                    </ReleaseRow>
                                    <ReleaseRow>
                                        <TableCell1>dkdk</TableCell1>
                                        <TableCell1>dkdk</TableCell1>
                                        <TableCell1>dkdk</TableCell1>
                                        <TableCell1>dkdk</TableCell1>
                                        <TableCell1>-</TableCell1>
                                    </ReleaseRow>
                                    <ReleaseRow>
                                        <TableCell1>dkdk</TableCell1>
                                        <TableCell1>dkdk</TableCell1>
                                        <TableCell1>dkdk</TableCell1>
                                        <TableCell1>dkdk</TableCell1>
                                        <TableCell1>-</TableCell1>
                                    </ReleaseRow>
                                </tbody>
                            </ReleaseTable>
                        </ReleaseContainer>

                    )}
            </MainContainer>
        </Container>
    );
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3.31rem;
  margin-left: 3.8rem;
  width: 80rem;
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

export const ReleaseTable = styled(Table1)`
  margin-top: 0.3rem;
  margin-left: 3rem;
`;

export const HeaderCell1 = styled(HeaderCell)`
  padding: 10px;
  margin-top: 0.4rem;
`

export const ReleaseRow = styled(TableRow)`
  margin-left: 0.3rem;
`


export const TableCell1 = styled(TableCell)`
  padding: 10px;
  margin-left: 0.3rem;
`