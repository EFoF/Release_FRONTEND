import styled from "styled-components";
import React, {useState} from "react";
import {CategoryTitle, Title1} from "../../components/Text/Title";
import {Table1, HeaderCell, TableRow, TableCell} from "../../components/Table";
import {Container1} from "../../components/Container";

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
    category: Category
    release: Release[]
}

export default function Release() {
    const [project, setProject] = useState("첫회사 첫 프로젝트");
    const [categories, setCategories] = useState<CategoryItem[]>([
        {
            category: {
                "id": 4,
                "detail": "null",
                "title": "2번째 프로젝트 1번째 카테고리",
                "description": "아ㅣㄹ넝ㄹㄴ",
                "lastModifierName": "null",
                "lastModifiedTime": "null"
            },
            release: []
        },
        {
            category: {
                "id": 5,
                "detail": "null",
                "title": "2번째 프로젝트 2번째 카테고리",
                "description": "아ㅣㄹ넝ㄹㄴ",
                "lastModifierName": "null",
                "lastModifiedTime": "null"
            },
            release: []
        },
        {
            category: {
                "id": 6,
                "detail": "null",
                "title": "2번째 프로젝트 3번째 카테고리",
                "description": "아ㅣㄹ넝ㄹㄴ",
                "lastModifierName": "null",
                "lastModifiedTime": "null"
            },
            release: []
        }
    ]);

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

    // TODO: 최근 수정자, 수정날짜 추가
    return (
        <Container>
            <MainContainer>
                <ReleaseCreateTitle>{project}</ReleaseCreateTitle>
                {categories.map((category: CategoryItem, index: number) =>
                    <ReleaseContainer>
                        <CategoryTitle1 key={index}>{category.category.title}</CategoryTitle1>
                        <ReleaseTable>
                            <thead>
                            <tr>
                                <HeaderCell1>버전</HeaderCell1>
                                <HeaderCell1>날짜</HeaderCell1>
                                <HeaderCell1>태그</HeaderCell1>
                                <HeaderCell1>변경사항</HeaderCell1>
                            </tr>
                            </thead>
                            <tbody>
                            {category.release.map((release: Release, rindex: number) =>
                                <ReleaseRow key={rindex}>
                                    <TableCell1>{release.version}</TableCell1>
                                    <TableCell1>{release.releaseDate}</TableCell1>
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
  white-space: normal;
  word-break: break-all;
`