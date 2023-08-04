import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import React, {useState} from "react"
import { CategoryTitle, Title1 } from "../../components/Text/Title";
import {OwnerName} from "../../components/Text/Owner";
import MemberTable from "../../components/Table/memberTable";
import AddFile from "../../components/AddFile";
import ConfirmationModal from "../../components/Modal";

// const initMembers = [
//     { name: '이름1', email: '이메일1' },
//     { name: '이름2', email: '이메일2' },
//     { name: '이름3', email: '이메일3' },
//     { name: '이름4', email: '이메일4' },
//     { name: '이름5', email: '이메일5' },
// ];
//

const initMembers = [
    {
        "id": 1,
        "name": "user111",
        "email": "user111@test.com"
    },
    {
        "id": 2,
        "name": "user222",
        "email": "user222@test.com"
    },
    {
        "id": 3,
        "name": "user333",
        "email": "user333@test.com"
    },
    {
        "id": 4,
        "name": "user444",
        "email": "user444@test.com"
    }
]

export default function CompanyManage() {
    const [projectName, setProjectName] = useState("");
    const [projectDetail, setProjectDetail] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [members, setMembers] = useState(initMembers);

    const handleChangeName = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setProjectName(e.target.value)
    }

    const handleChangeDetail = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setProjectDetail(e.target.value)
    }

    const handleModalCancel = () => {
        // 모달 닫기
        setIsModalOpen(false);
    };

    const handleInviteModalCancel = () => {
        // 모달 닫기
        setIsModalOpen2(false);
    };

    const handleModalConfirm = () => {
        // ...

        // 모달 닫기
        setIsModalOpen(false);
    };

    const handleInviteModalConfirm = () => {
        // ...
        // 입력한 이메일을 배열에 추가합니다.
        // 여기서 받은 responseDto 에서 name과 email 추가하기!
        if (projectDetail.trim() !== "") {
            const newMember = { id: members.length+1, name: `이름${members.length + 1}`, email: projectDetail };
            setMembers([...members, newMember]);

            setProjectDetail(""); // 초대 입력창 비우기
        }

        // 모달 닫기
        setIsModalOpen2(false);
    };

    const handleDelCompany = () => {
        // 모달 열기
        setIsModalOpen(true);
    };

    const handleInviteModal = () => {
        // 모달 열기
        setIsModalOpen2(true);
    };

    return (
        <Container>
            <MainContainer>
                <ProjectManageTitle>회사 관리</ProjectManageTitle>
                <CategoryContainer>
                    <CategoryTitle1>회사명</CategoryTitle1>
                    <Input value={projectName} onChange={handleChangeName} placeholder={"카카오 엔터프라이즈"}></Input>
                </CategoryContainer>
                <CategoryContainer>
                    <CategoryTitle1>회사 오너</CategoryTitle1>
                    <ProjectOwner1>최철웅 (oldstyle@gmail.com)</ProjectOwner1>
                </CategoryContainer>
                <CategoryContainer>
                    <CategoryTitle1>회사 로고</CategoryTitle1>
                    <AddFile></AddFile>
                </CategoryContainer>
                <CategoryContainer>
                    <CategoryTitle1>초대원 이메일</CategoryTitle1>
                    <Input value={projectDetail} size={22.8} onChange={handleChangeDetail}></Input>
                    <Button2 onClick={handleInviteModal} title="초대하기"></Button2>
                </CategoryContainer>
                <CategoryContainer>
                    <CategoryTitle2>회사 멤버</CategoryTitle2>
                    <TableContainer>
                        <MemberTable members={members} />
                    </TableContainer>
                </CategoryContainer>
                <ButtonContainer>
                    <Button onClick={handleDelCompany} title="회사 삭제" theme="red"></Button>
                    <Button1 title="설정완료"></Button1>
                </ButtonContainer>

                <ConfirmationModal isOpen={isModalOpen}
                                   onCancel={handleModalCancel}
                                   onConfirm={handleModalConfirm}
                                    message={"회사를 삭제하시겠습니까?"}/>

                <ConfirmationModal isOpen={isModalOpen2}
                                   onCancel={handleInviteModalCancel}
                                   onConfirm={handleInviteModalConfirm}
                                   message={projectDetail+"님을 초대하시겠습니까?"}/>
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

export const CategoryContainer = styled.div`
display: flex;
flex-direction: row;
//align-items: center;
margin-bottom: 2rem;
`;

export const TableContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 35rem;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 35rem;
`;

export const ProjectManageTitle= styled(Title1)`
  margin-bottom: 4.69rem;
`;

export const CategoryTitle1 = styled(CategoryTitle)`
  min-width: 12rem;
  margin-top: 0.4rem;
`;

export const CategoryTitle2 = styled(CategoryTitle)`
  min-width: 12rem;
  margin-top: 1.5rem;
`;

export const ProjectOwner1 = styled(OwnerName)`
  min-width: 35rem;
  margin-top: 0.4rem;
`;

export const ToggleImg = styled.img`
width: 3.75rem;
height: 3.75rem;
cursor: pointer; //누르면 바꾸기
`

export const ToggleContainer = styled.div`
    min-width: 35rem;
    margin-top: 0.7rem;
`

export const ButtonContainer = styled.div`
  display: flex;
    align-self: flex-end;
  margin-top: 3rem;
  margin-bottom: 5rem;
`;

export const Button1 = styled(Button)`
    margin-left: 1.88rem;
`

export const Button2 = styled(Button)`
  margin-left: 1.0rem;
  height: 3.5rem;
`
