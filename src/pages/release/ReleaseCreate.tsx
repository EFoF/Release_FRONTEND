import styled from "styled-components";
import React, {useState} from "react";
import {CategoryTitle, Title1} from "../../components/Text/Title";
import {Table1, HeaderCell, TableRow, TableCell, TableImg} from "../../components/Table";
import {Container1} from "../../components/Container";
import minus from "../../img/minus.png";
import plus from "../../img/plus.png";
import check from "../../img/check.png";
import ConfirmationModal from "../../components/Modal";


export default function ReleaseCreate() {
    const [project, setProject] = useState("첫회사 첫 프로젝트");
    const [categories, setCategories] = useState([
        {
            category: {
                title: "첫 프로젝트 첫 카테고리",
                description: "아ㅣㄹ넝ㄹㄴ",
                detail: "null",
                lastModifierName: "null",
                lastModifiedTime: "null"
            },
            release: [
                {
                    releaseDate: "2023-08-01",
                    lastModifiedTime: "2023-08-01T14:10:10.620659",
                    lastModifierName: "null",
                    content: "sdflsdsdflksjdflskdjfsldkfjsklfjsdklfjsflksjdflskdjfsldkfjsklfjsdklfjsksjdflskdjfsldkfjsklfjsdklfjs" +
                        "sdklfjssdflksjdflskdjfsldkfjsklfjsdklfjsksdflksjdflskdjfsldkfjsklfjsdklfjsldfjsdlkf" +
                        "sldfsdflksjdflskdjfsldkfjsklfjsdklfjssdflksjdflskdjfsldkfjsklfjsdklfjskjsldfkj" +
                        "sdlsdflksjdflskdjfsldkfjsklfjsdklfjssdflksjdflskdjfsldkfjsklfjsdklfjskfjs",
                    version: "1.1.0",
                    tag: "DEPRECATED"
                },
                {
                    releaseDate: "2023-08-01",
                    lastModifiedTime: "2023-08-01T14:10:25.007838",
                    lastModifierName: "null",
                    content: "sdflksjdflskdjfsldkfjsklfjsdklfjs" +
                        "sdklfjskldfjsdlkf" +
                        "sldfkjsldfkj" +
                        "sdlkfjs",
                    version: "1.1.0",
                    tag: "NEW"
                },
                {
                    releaseDate: "2023-08-01",
                    lastModifiedTime: "2023-08-01T14:10:29.561621",
                    lastModifierName: "null",
                    content: "sdflksjdflskdjfsldkfjsklfjsdklfjs" +
                        "sdklfjskldfjsdlkf" +
                        "sldfkjsldfkj" +
                        "sdlkfjs",
                    version: "1.1.0",
                    tag: "UPDATED"
                },
                {
                    releaseDate: "2023-08-01",
                    lastModifiedTime: "2023-08-01T14:10:34.006635",
                    lastModifierName: "null",
                    content: "sdflksjdflskdjfsldkfjsklfjsdklfjs" +
                        "sdklfjskldfjsdlkf" +
                        "sldfkjsldfkj" +
                        "sdlkfjs",
                    version: "1.1.0",
                    tag: "FIXED"
                }
            ]
        },
        {
            category: {
                title: "첫번째 프로젝트 두번째 카테고리",
                description: "아ㅣㄹ넝ㄹㄴ",
                detail: "null",
                lastModifierName: "null",
                lastModifiedTime: "null"
            },
            release: [
                {
                    releaseDate: "2023-08-01",
                    lastModifiedTime: "2023-08-01T14:10:50.751726",
                    lastModifierName: "null",
                    content: "sdflksjdflskdjfsldkfjsklfjsdklfjs" +
                        "sdklfjskldfjsdlkf" +
                        "sldfkjsldfkj" +
                        "sdlkfjs",
                    version: "1.1.0",
                    tag: "NEW"
                },
                {
                    releaseDate: "2023-08-01",
                    lastModifiedTime: "2023-08-01T14:10:52.610176",
                    lastModifierName: "null",
                    content: "sdflksjdflskdjfsldkfjsklfjsdklfjs" +
                        "sdklfjskldfjsdlkf" +
                        "sldfkjsldfkj" +
                        "sdlkfjs",
                    version: "1.1.0",
                    tag: "UPDATED"
                },
                {
                    releaseDate: "2023-08-01",
                    lastModifiedTime: "2023-08-01T14:10:54.723116",
                    lastModifierName: "null",
                    content: "sdflksjdflskdjfsldkfjsklfjsdklfjs" +
                        "sdklfjskldfjsdlkf" +
                        "sldfkjsldfkj" +
                        "sdlkfjs",
                    version: "1.1.0",
                    tag: "DEPRECATED"
                },
                {
                    releaseDate: "2023-08-01",
                    lastModifiedTime: "2023-08-01T14:10:56.309203",
                    lastModifierName: "null",
                    content: "sdflksjdflskdjfsldkfjsklfjsdklfjs" +
                        "sdklfjskldfjsdlkf" +
                        "sldfkjsldfkj" +
                        "sdlkfjs",
                    version: "1.1.0",
                    tag: "FIXED"
                }
            ]
        },
        {
            category: {
                title: "첫번째 프로젝트 세번째 카테고리",
                description: "아ㅣㄹ넝ㄹㄴ",
                detail: "null",
                lastModifierName: "null",
                lastModifiedTime: "null"
            },
            release: [
                {
                    releaseDate: "2023-08-01",
                    lastModifiedTime: "2023-08-01T14:11:07.544848",
                    lastModifierName: "null",
                    content: "sdflksjdflskdjfsldkfjsklfjsdklfjs" +
                        "sdklfjskldfjsdlkf" +
                        "sldfkjsldfkj" +
                        "sdlkfjs",
                    version: "1.1.0",
                    tag: "NEW"
                },
                {
                    releaseDate: "2023-08-01",
                    lastModifiedTime: "2023-08-01T14:11:08.970794",
                    lastModifierName: "null",
                    content: "sdflksjdflskdjfsldkfjsklfjsdklfjs" +
                        "sdklfjskldfjsdlkf" +
                        "sldfkjsldfkj" +
                        "sdlkfjs",
                    version: "1.1.0",
                    tag: "ADDED"
                },
                {
                    releaseDate: "2023-08-01",
                    lastModifiedTime: "2023-08-01T14:11:10.549661",
                    lastModifierName: "null",
                    content: "sdflksjdflskdjfsldkfjsklfjsdklfjs" +
                        "sdklfjskldfjsdlkf" +
                        "sldfkjsldfkj" +
                        "sdlkfjs",
                    version: "1.1.0",
                    tag: "NEW"
                },
                {
                    releaseDate: "2023-08-01",
                    lastModifiedTime: "2023-08-01T14:11:11.770884",
                    lastModifierName: "null",
                    content: "sdflksjdflskdjfsldkfjsklfjsdklfjs" +
                        "sdklfjskldfjsdlkf" +
                        "sldfkjsldfkj" +
                        "sdlkfjs",
                    version: "1.1.0",
                    tag: "ADDED"
                },
                {
                    releaseDate: "2023-08-01",
                    lastModifiedTime: "2023-08-01T14:11:13.117891",
                    lastModifierName: "null",
                    content: "sdflksjdflskdjfsldkfjsklfjsdklfjs" +
                        "sdklfjskldfjsdlkf" +
                        "sldfkjsldfkj" +
                        "sdlkfjs",
                    version: "1.1.0",
                    tag: "UPDATED"
                }
            ]
        },
        {
            category: {
                title: "첫번째 프로젝트 네번째 카테고리",
                description: "아ㅣㄹ넝ㄹㄴ",
                detail: "null",
                lastModifierName: "null",
                lastModifiedTime: "null"
            },
            release: [
                {
                    releaseDate: "2023-08-01",
                    lastModifiedTime: "2023-08-01T14:11:27.182969",
                    lastModifierName: "null",
                    content: "sdflksjdflskdjfsldkfjsklfjsdklfjs" +
                        "sdklfjskldfjsdlkf" +
                        "sldfkjsldfkj" +
                        "sdlkfjs",
                    version: "1.1.0",
                    tag: "NEW"
                },
                {
                    releaseDate: "2023-08-01",
                    lastModifiedTime: "2023-08-01T14:11:28.609412",
                    lastModifierName: "null",
                    content: "sdflksjdflskdjfsldkfjsklfjsdklfjs" +
                        "sdklfjskldfjsdlkf" +
                        "sldfkjsldfkj" +
                        "sdlkfjs",
                    version: "1.1.0",
                    tag: "DEPRECATED"
                },
                {
                    releaseDate: "2023-08-01",
                    lastModifiedTime: "2023-08-01T14:11:29.905167",
                    lastModifierName: "null",
                    content: "sdflksjdflskdjfsldkfjsklfjsdklfjs" +
                        "sdklfjskldfjsdlkf" +
                        "sldfkjsldfkj" +
                        "sdlkfjs",
                    version: "1.1.0",
                    tag: "DEPRECATED"
                }
            ]
        },
        {
            category: {
                title: "첫번째 프로젝트 다섯번째 카테고리",
                description: "아ㅣㄹ넝ㄹㄴ",
                detail: "null",
                lastModifierName: "null",
                lastModifiedTime: "null"
            },
            release: [
                {
                    releaseDate: "2023-08-01",
                    lastModifiedTime: "2023-08-01T14:11:36.651553",
                    lastModifierName: "null",
                    content: "sdflksjdflskdjfsldkfjsklfjsdklfjs" +
                        "sdklfjskldfjsdlkf" +
                        "sldfkjsldfkj" +
                        "sdlkfjs",
                    version: "1.1.0",
                    tag: "NEW"
                },
                {
                    releaseDate: "2023-08-01",
                    lastModifiedTime: "2023-08-01T14:11:38.176223",
                    lastModifierName: "null",
                    content: "sdflksjdflskdjfslsdlfksdjfwlsdlkfsjfwelrkjesdkfjsklfjsdklfjs" +
                        "sdklfjskldfjsdlkf" +
                        "sldfkjsldfkj" +
                        "sdlkfjs",
                    version: "1.1.0",
                    tag: "FIXED"
                }
            ]
        }
    ]);

    const [releaseVersion, setReleaseVersion] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [releaseTag, setReleaseTag] = useState("");
    const [releaseDetail, setReleaseDetail] = useState("");

    const [optionTagColor, setOptionTagColor] = useState("transparent");

    const [addIndex, setAddIndex] = useState(-1);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChangeVersion = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setReleaseVersion(e.target.value);
    };

    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setReleaseDate(e.target.value);
    };

    type TagColors = {
        [key: string]: string;
    };

    const tagColors: TagColors = {
        new: "rgba(157, 233, 131, 0.46)",
        updated: "rgba(234, 237, 98, 0.71)",
        deprecated: "rgba(255, 34, 34, 0.47)",
        fixed: "rgba(105, 156, 255, 0.56)",
        added: "rgba(200, 182, 166, 0.61)",
    };

    const handleChangeTag = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setReleaseTag(e.target.value);
        setOptionTagColor(tagColors[e.target.value] || "transparent");
    };

    const handleChangeDetail = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setReleaseDetail(e.target.value);
    };

     const handlePlusBtn = (index: number) => {
        setReleaseVersion("");
        setReleaseDate("");
        setReleaseTag("");
        setReleaseDetail("");
        setAddIndex(index);
    };

    const handleCheckBtn = (index: number) => {
        // TODO: db 반영
    }

    const handleMinusBtn = (index: number) => {
        setIsModalOpen(true);
    };

    const handleModalCancel = () => {
        // 모달 닫기
        setIsModalOpen(false);
    };

    const handleModalConfirm = () => {
        // TODO: db 반영

        // 모달 닫기
        setIsModalOpen(false);
    };

    // TODO: 최근 수정자, 수정날짜 추가
    return (
        <Container>
            <MainContainer>
                <ReleaseCreateTitle>{project}</ReleaseCreateTitle>
                {categories.map((category, index) =>
                    <ReleaseContainer>
                        <CategoryTitle1 key={index}>{category.category.title}</CategoryTitle1>
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
                            {category.release.map((release, rindex) =>
                                <ReleaseRow key={rindex}>
                                    <TableCell1>{release.version}</TableCell1>
                                    <TableCell1>{release.releaseDate}</TableCell1>
                                    <TableCell1>
                                        <TableCellTag optionTagColor={tagColors[release.tag.toLowerCase()]}>
                                            {release.tag}
                                        </TableCellTag>
                                    </TableCell1>
                                    <TableCellLong>{release.content}</TableCellLong>
                                    <TableCell1><TableImg1 src={minus} onClick={() => handleMinusBtn(index)}/></TableCell1>
                                </ReleaseRow>
                            )}
                            {addIndex === index && (
                                <ReleaseRow>
                                    <TableCell1>
                                        <StyledInput
                                            type="text"
                                            value={releaseVersion}
                                            onChange={handleChangeVersion}
                                        />
                                    </TableCell1>
                                    <TableCell1>
                                        <StyledInput
                                            type="text"
                                            value={releaseDate}
                                            onChange={handleChangeDate}
                                        />
                                    </TableCell1>
                                    <TableCell1>
                                        <StyledSelect
                                            value={releaseTag}
                                            onChange={handleChangeTag}
                                            optionTagColor={optionTagColor}
                                        >
                                            <option value="">-- 선택 --</option>
                                            <option value="new">NEW</option>
                                            <option value="updated">UPDATED</option>
                                            <option value="fixed">FIXED</option>
                                            <option value="deprecated">DEPRECATED</option>
                                            <option value="added">ADDED</option>
                                        </StyledSelect>
                                    </TableCell1>
                                    <TableCellLong>
                                        <StyledText
                                            value={releaseDetail}
                                            onChange={handleChangeDetail}
                                        />
                                    </TableCellLong>
                                    <TableCell1><TableImg1 src={check}
                                                           onClick={() => handleCheckBtn(index)}/></TableCell1>
                                </ReleaseRow>
                            )}
                            <ReleaseRow>
                                <TableCell1 colSpan={5}>
                                    <TableImgLast src={plus} onClick={() => handlePlusBtn(index)}/>
                                </TableCell1>
                            </ReleaseRow>
                            </tbody>
                        </ReleaseTable>
                    </ReleaseContainer>
                )}
            </MainContainer>
            <ConfirmationModal isOpen={isModalOpen} onCancel={handleModalCancel} onConfirm={handleModalConfirm}
                               message={"삭제하시겠습니까?"}/>
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
  width: 65%;
  padding: 10px 50px;
  white-space: normal;
  word-break: break-all;
`

export const TableImg1 = styled(TableImg)`
  width: 1.7rem;
  height: 1.7rem;
  display: inline-block;
`

export const TableImgLast = styled(TableImg)`
  width: 3rem;
  height: 3rem;
  display: inline-block;
`

// TODO: width 수정
export const StyledInput = styled.input`
  width: 100%;
  border-color: transparent;
  background-color: transparent;
  text-align: center;
`;

export const StyledText = styled.textarea`
  width: 100%;
  border-color: transparent;
  background-color: transparent;
  text-align: center;
  resize: vertical;
  overflow: auto;
`;

export const StyledSelect = styled.select<{optionTagColor: string}>`
  width: 90px;
  font-size: 11px;
  font-weight: bold;
  line-height: 2.3;
  background-color: ${(props) => props.optionTagColor};
  border: 1px solid transparent;
  border-radius: 35px;
  outline: none;
  transition: border-color 0.3s;
  appearance: none;
  text-align-last: center;
  padding: 3px;

  &:focus {
    border-color: #1E90FF;
    box-shadow: 0 0 0 0.2rem rgba(30, 144, 255, 0.25);
  }
`;


