import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {CategoryTitle, Title1} from "../../components/Text/Title";
import {Table1, HeaderCell, TableRow, TableCell} from "../../components/Table";
import {Container1} from "../../components/Container";
import {useLocation} from "react-router-dom";
import {getReleases} from "../../api/release";

type Release = {
    id: number
    tag: string,
    version: string,
    content: string,
    lastModifierName: string,
    lastModifierEmail: string,
    releaseDate: string,
    lastModifiedTime: string
}

type Category = {
    id: number,
    detail: string,
    title: string,
    description: string,
    lastModifierName: string,
    lastModifiedTime: string
}

type CategoryItem = {
    categoryResponseDto: Category
    releaseDtoList
        : Release[]
}

export default function Release() {
    const location = useLocation();
    // TODO: 수정
    const projectId = location.state.projectId
    const projectTitle = location.state.projectTitle;

    const [categories, setCategories] = useState<CategoryItem[]>([]);

    useEffect(() => {
        async function fetchReleases() {
            try {
                const releases = await getReleases(projectId);
                console.log("Release data: ", releases);
                setCategories(releases.projectReleasesDto);
            } catch (error) {
                console.error("Error fetching releases:", error);
            }
        }
        fetchReleases();
    }, [projectId]);


    type Release = {
        id: number
        tag: string,
        version: string,
        content: string,
        lastModifierName: string,
        lastModifierEmail: string,
        releaseDate: string,
        lastModifiedTime: string
    }

    type TagColors = {
        [key: string]: string;
    };

    const tagColors: TagColors = {
        new: "rgba(157, 233, 131, 0.46)",
        updated: "rgba(234, 237, 98, 0.71)",
        deprecated: "rgba(255, 34, 34, 0.47)",
        fixed: "rgba(105, 156, 255, 0.56)"
    };

    return (
        <Container>
            <MainContainer>
                <ReleaseCreateTitle>{projectTitle}</ReleaseCreateTitle>
                {categories.map((category: CategoryItem, index: number) =>
                    <ReleaseContainer>
                        <CategoryTitle1 key={index}>{category.categoryResponseDto.title}</CategoryTitle1>
                        <ReleaseTable>
                            <thead>
                            <tr>
                                <HeaderCell1>버전</HeaderCell1>
                                <HeaderCell1>날짜</HeaderCell1>
                                <HeaderCellTag>태그</HeaderCellTag>
                                <HeaderCellLong>변경사항</HeaderCellLong>
                            </tr>
                            </thead>
                            <tbody>
                            {category.releaseDtoList.map((release: Release, rindex: number) =>
                                <ReleaseRow key={rindex}>
                                    <TableCell1>{release.version}</TableCell1>
                                    <TableCell1>{new Date(release.releaseDate).toISOString().split('T')[0]}</TableCell1>
                                    <TableCell1>
                                        <TableCellTag optionTagColor={tagColors[release.tag.toLowerCase()]}>
                                            {release.tag}
                                        </TableCellTag>
                                    </TableCell1>
                                    <TableCellLong>{release.content}</TableCellLong>
                                </ReleaseRow>
                            )}
                            </tbody>
                        </ReleaseTable>
                    </ReleaseContainer>
                )}
            </MainContainer>
        </Container>
    );
}

export const Container = styled(Container1)`
  display: flex;
  flex-direction: column;
  margin-right: 8rem;
  margin-bottom: 8rem;
`;

export const MainContainer = styled.div`
  flex-direction: column;
  margin-top: 3.31rem;
`;

export const ReleaseCreateTitle = styled(Title1)`
  margin-bottom: 4.69rem;
`;

export const ReleaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

export const CategoryTitle1 = styled(CategoryTitle)`
  align-self: start;
  margin-top: 3.5rem;
  margin-bottom: 2rem;
`;

export const ReleaseTable = styled(Table1)`
  margin-top: 0.3rem;
`;

export const HeaderCell1 = styled(HeaderCell)`
  padding: 10px;
  margin-top: 0.4rem;
  width: 10rem;
  min-width: 10rem;
  max-width: 15rem;
`

export const HeaderCellTag = styled(HeaderCell)`
  width: 90px;
  padding: 3px;
`

export const HeaderCellLong = styled(HeaderCell)`
  width: 63rem;
  min-width: 50rem;
`

export const ReleaseRow = styled(TableRow)`
  padding: 10px;
`

export const TableCell1 = styled(TableCell)`
  padding: 10px;
  width: 10rem;
  min-width: 10rem;
  max-width: 15rem;
`

export const TableCellTag = styled.td <{optionTagColor: string}>`
  width: 90px;
  font-size: 11px;
  font-weight: bold;
  line-height: 2.3;
  background-color: ${(props) => props.optionTagColor || 'transparent'};
  border: 1px solid transparent;
  border-radius: 35px;
  outline: none;
  transition: border-color 0.3s;
  appearance: none;
  text-align-last: center;
  padding: 3px;
  display: inline-block;
`

export const TableCellLong = styled(TableCell)`
  width: 63rem;
  min-width: 50rem;
  padding: 10px 50px;
  white-space: pre-wrap;
  word-break: break-all;
`