import styled from "styled-components";
import React, {useEffect, useRef, useState} from "react";
import {CategoryTitle, Title1} from "../../components/Text/Title";
import {Table1, HeaderCell, TableRow, TableCell, TableImg} from "../../components/Table";
import {Container1} from "../../components/Container";
import minus from "../../img/minus.png";
import plus from "../../img/plus.png";
import check from "../../img/check.png";
import ConfirmationModal from "../../components/Modal";
import Tooltip from "./Tooltip";
import {useLocation} from "react-router-dom";
import {getReleases} from "../../api/release";
import {loadMyInfo} from "../../api/auth";

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
    releaseDtoList: Release[]
}

export default function ReleaseCreate() {
    const location = useLocation();
    // TODO: 수정
    const projectId = location.state.projectId
    const projectTitle = location.state.projectTitle;
    const isLogin = useState(!!localStorage.getItem("accessToken"));

    console.log("Get Project Id", projectId);

    const [userName, setUserName] = useState("");
    const [categories, setCategories] = useState<CategoryItem[]>([]);

    useEffect(()=>{
        if(isLogin) {
            const fetchMyInfo = async () => {
                try {
                    const { username } = await loadMyInfo();
                    setUserName(username);
                } catch (error) {
                    console.error('Error fetching info:', error);
                }
            }
            fetchMyInfo();
        }
    }, [isLogin])

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

    const [releaseVersion, setReleaseVersion] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [releaseTag, setReleaseTag] = useState("");
    const [releaseDetail, setReleaseDetail] = useState("");

    const [optionTagColor, setOptionTagColor] = useState("transparent");

    const [addIndex, setAddIndex] = useState(-1);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isModalOpen2, setIsModalOpen2] = useState(false);

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
        fixed: "rgba(105, 156, 255, 0.56)"
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
        setIsModalOpen2(true);
        // TODO: db 반영
    }

    const handleModalCancel2 = () => {
        // 모달 닫기
        setIsModalOpen2(false);
    };

    const handleModalConfirm2 = () => {
        // TODO: db 반영

        // 모달 닫기
        setIsModalOpen2(false);
    };

    const handleMinusBtn = (index: number) => {
        setIsModalOpen(true);
        // TODO: db 반영
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

    const tooltipRef = useRef<HTMLDivElement | null>(null);

    const [hovered, setHovered] = useState(false);

    const [hoveredRelease, setHoveredRelease] = useState<Release | null>(null);

    const hoveredTooltip = useRef<boolean>(false);

    const handleTableCellMouseLeave = () => {
        if (!hoveredTooltip.current) {
            setHovered(false);
            setHoveredRelease(null);
        }
    };


    // TODO: 최근 수정자, 수정날짜 추가
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
                                <HeaderCell1>수정자</HeaderCell1>
                                <HeaderCell1/>
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
                                    <TableCell1
                                        onMouseEnter={(event) => {
                                            tooltipRef.current = event.currentTarget;
                                            setHovered(true);
                                            setHoveredRelease(release);
                                        }}
                                        onMouseLeave={handleTableCellMouseLeave}
                                    >
                                        {release.lastModifierName}
                                    </TableCell1>
                                    <TableCellIcon><TableImg1 src={minus} onClick={() => handleMinusBtn(index)}/></TableCellIcon>
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
                                        </StyledSelect>
                                    </TableCell1>
                                    <TableCellLong>
                                        <StyledText
                                            value={releaseDetail}
                                            onChange={handleChangeDetail}
                                        />
                                    </TableCellLong>
                                    <TableCell1>{userName}</TableCell1>
                                    <TableCell1><TableImg1 src={check}
                                                           onClick={() => handleCheckBtn(index)}/></TableCell1>
                                </ReleaseRow>
                            )}
                            <ReleaseRow>
                                <TableCell1 colSpan={6}>
                                    <TableImgLast src={plus} onClick={() => handlePlusBtn(index)}/>
                                </TableCell1>
                            </ReleaseRow>
                            </tbody>
                        </ReleaseTable>
                        </ReleaseContainer>
                )}
                {
                    hovered && hoveredRelease && (
                        <Tooltip
                            tooltipRef={tooltipRef}
                            onMouseEnter={() => {
                                hoveredTooltip.current = true;
                                setHovered(true);
                            }}
                            onMouseLeave={() => {
                                hoveredTooltip.current = false;
                                setHovered(false);
                            }}
                            show={hovered}
                            release={hoveredRelease}
                        />
                    )
                }
            </MainContainer>
            <ConfirmationModal isOpen={isModalOpen} onCancel={handleModalCancel} onConfirm={handleModalConfirm}
                               message={"삭제하시겠습니까?"}/>
            <ConfirmationModal isOpen={isModalOpen2} onCancel={handleModalCancel2} onConfirm={handleModalConfirm2}
                               message={"저장하시겠습니까?"}/>
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
  white-space: normal;
  word-break: break-all;
`

export const TableCellIcon = styled(TableCell)`
  padding: 10px;
  width: 3rem;
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
  font-size: 11px;
  width: 100%;
  border-color: transparent;
  background-color: transparent;
  text-align: center;
`;

export const StyledText = styled.textarea`
  font-size: 11px;
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


