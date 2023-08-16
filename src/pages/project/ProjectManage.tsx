import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import React, {useState, useEffect} from "react"
import {CategoryTitle, Title1} from "../../components/Text/Title";
import {OwnerName} from "../../components/Text/Owner";
import MemberTable from "../../components/Table/memberTable";
import ConfirmationModal from "../../components/Modal";
import PATH from "../../constants/path";
import {useLocation, useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {companyIdState, companyNameState} from "../../states/companyState";
import axios from "axios";
import {addProjectMembers, editProject, getProjectMembers} from "../../api/project";

interface Person {
    id: number,
    name: string,
    email: string,
}

interface Project {
    title: string;
    description: string;
    scope: boolean;
    id?: number;
}

export default function ProjectManage() {
    const [projectName, setProjectName] = useState("");
    const [memberEmail, setMemberEmail] = useState("");     // 초대원 이메일
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const companyId = useRecoilValue(companyIdState);
    const companyName = useRecoilValue(companyNameState);
    const [compName, setCompName] = useState(companyName);
    const [members, setMembers] = useState<Person[] | null>(null);
    const [project, setProject] = useState<Project>();
    const location = useLocation();
    const projectId = location.state.projectId;
    const projectObject: Project = location.state.projectObject;

    useEffect(() => {
        setProject(projectObject);
        project && setProjectName(project.title);
        console.log("project", project);
    }, [project, projectId, projectObject])


    const navigate = useNavigate();

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setProjectName(e.target.value)
    }

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setMemberEmail(e.target.value)
    }

    // ===================================
    // 프로젝트 삭제 모달
    const handleModalConfirm = () => {
        setIsModalOpen1(false);
        navigate(PATH.COMPANYMAIN);
    };

    const handleModalCancel = () => {
        setIsModalOpen1(false);
    };

    const handleDelProject = () => {
        // 모달 열기
        setIsModalOpen1(true);
    };

    // ===================================
    // 초대 확인 모달
    const handleInviteModalConfirm = () => {
        // 입력한 이메일을 배열에 추가
        // 여기서 받은 responseDto 에서 name과 email 추가하기!
        const addCompanyMember = async () => {
            try {
                const data = await addProjectMembers(projectId, {email: memberEmail});
                console.log("add member! ", data);
                if (memberEmail.trim() !== "") {
                    const newMember = {
                        id: members ? members.length + 1 : 1, // members가 null인 경우 id를 1로 초기화
                        name: `이름${members ? members.length + 1 : 1}`, // members가 null인 경우 이름을 "이름1"로 초기화
                        email: memberEmail,
                    };

                    setMembers(members ? [...members, newMember] : [newMember]);

                    setMemberEmail(""); // 초대 입력창 비우기
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    // AxiosError 타입이라면 Axios에서 정의한 에러 객체
                    alert(error.response?.data); // 에러 응답 데이터 출력
                }
                console.error("Error add members:", error);
            }
        }
        setMemberEmail("");
        addCompanyMember();
        setIsModalOpen2(false);
    };

    const handleInviteModal = () => {
        setIsModalOpen2(true);
    };

    const handleInviteModalCancel = () => {
        // 모달 닫기
        setIsModalOpen2(false);
    };

    // ===================================
    // 설정 완료 모달
    const handleConfirm = () => {
        setIsModalOpen3(true);
    }

    const handleModalCancel3 = () => {
        setIsModalOpen3(false);
    };

    const handleModalConfirm3 = () => {
        const handleCreate = () => {

            const modifyCompany = async () => {
                try {
                    const newProjectObject = {
                        "description": project?.description,
                        "scope": project?.scope,
                        "title": projectName,
                    }
                    const data = editProject(projectId, newProjectObject)
                    console.log("updata company ", data);
                    // navigate(PATH.MYCOMPANY);                        
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        // AxiosError 타입이라면 Axios에서 정의한 에러 객체
                        alert(error.response?.data); // 에러 응답 데이터 출력
                    }
                    console.error("Error fetching company:", error);
                }
            }
            modifyCompany();

        }
        handleCreate();
        setIsModalOpen3(false);
        navigate(PATH.COMPANYMAIN);
    };

    // ===================================

    //기존 멤버 받아오기 
    useEffect(() => {
            const fetchCompanyMembers = async () => {
                try {
                    const {memberListDTOS} = await getProjectMembers(projectId); //받아와야..
                    setMembers(memberListDTOS);
                    console.log("projectMembers", memberListDTOS)
                } catch (error) {
                    console.error("Error fetching members:", error);
                }
            }
            fetchCompanyMembers();
    }, [projectId])

    return (
        <Container>
            <MainContainer>
                <ProjectManageTitle>프로젝트 관리</ProjectManageTitle>
                <CategoryContainer>
                    <CategoryTitle1>프로젝트명</CategoryTitle1>
                    <Input value={projectName} onChange={handleChangeName} placeholder={project?.title}></Input>
                </CategoryContainer>
                <CategoryContainer>
                    <CategoryTitle1>프로젝트 오너</CategoryTitle1>
                    <ProjectOwner1>{members && `${members[0].name} (${members[0].email})`}</ProjectOwner1>
                </CategoryContainer>
                <CategoryContainer>
                    <CategoryTitle1>초대원 이메일</CategoryTitle1>
                    <Input value={memberEmail} size={22.8} onChange={handleChangeEmail}></Input>
                    <Button2 onClick={handleInviteModal} title="초대하기"></Button2>
                </CategoryContainer>
                <CategoryContainer>
                    <CategoryTitle2>프로젝트 멤버</CategoryTitle2>
                    <TableContainer>
                        <MemberTable members={members}/>
                    </TableContainer>
                </CategoryContainer>
                <ButtonContainer>
                    <Button onClick={handleDelProject} title="프로젝트 삭제" theme="red"></Button>
                    <Button1 onClick={handleConfirm} title="설정완료"></Button1>
                </ButtonContainer>
                <ConfirmationModal isOpen={isModalOpen1}
                                   onCancel={handleModalCancel}
                                   onConfirm={handleModalConfirm}
                                   message={"프로젝트를 삭제하시겠습니까?"}/>

                <ConfirmationModal isOpen={isModalOpen2}
                                   onCancel={handleInviteModalCancel}
                                   onConfirm={handleInviteModalConfirm}
                                   message={memberEmail + "님을 초대하시겠습니까?"}/>

                <ConfirmationModal isOpen={isModalOpen3}
                                   onCancel={handleModalCancel3}
                                   onConfirm={handleModalConfirm3}
                                   message={"설정을 완료하시겠습니까?"}/>
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

export const ProjectManageTitle = styled(Title1)`
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
