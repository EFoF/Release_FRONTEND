import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import React, {useState, useEffect} from "react"
import { CategoryTitle, Title1 } from "../../components/Text/Title";
import {OwnerName} from "../../components/Text/Owner";
import MemberTable from "../../components/Table/memberTable";
import AddFile from "../../components/AddFile";
import ConfirmationModal from "../../components/Modal";
import PATH from "../../constants/path";
import {useNavigate} from "react-router-dom";
import { useRecoilValue } from "recoil";
import { companyIdState, companyNameState } from "../../states/companyState";
import { addCompanyMembers, deleteCompany, getCompanyMembers, getMyCompanies, updateCompany } from "../../api/company";
import axios from "axios";

interface Person {
    id: number,
    name: string,
    email: string,
}

export default function CompanyManage() {
    const [projectName, setProjectName] = useState("");
    const [memberEmail, setMemberEmail] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const [members, setMembers] = useState<Person[] | null>(null);
    const navigate = useNavigate();
    const companyId = useRecoilValue(companyIdState);
    const companyName = useRecoilValue(companyNameState);
    const [compName, setCompName] = useState(companyName);
    const [companyImgFile, setCompanyImgFile] = useState<string | null>(null);
    const [companyImgSrc, setCompanyImgSrc] = useState<string>("https://doklib.s3.ap-northeast-2.amazonaws.com/company/default");
    const defaultImgUrl = "https://doklib.s3.ap-northeast-2.amazonaws.com/company/default";
    const handleChangeName = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setCompName(e.target.value)
    }

    const handleChangeEmail = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setMemberEmail(e.target.value)
    }

    // ===================================

    // 회사 삭제 모달
    const handleModalConfirm = () => {
        const delCompany = async() => {
            try{
                const data = deleteCompany(companyId)
                console.log("delete company ", data);
                navigate(PATH.MYCOMPANY);                       
            }catch(error){
                if (axios.isAxiosError(error)) {
                    // AxiosError 타입이라면 Axios에서 정의한 에러 객체
                    alert(error.response?.data); // 에러 응답 데이터 출력
                }
                console.error("Error delete company:", error);
            }
        }
        delCompany();
        setIsModalOpen(false);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
    };

    const handleDelCompany = () => {
        setIsModalOpen(true);
    };

    // ===================================

    // 초대 확인 모달
    const handleInviteModal = () => {
        setIsModalOpen2(true);
    };

    const handleInviteModalConfirm = () => {
        // 입력한 이메일을 배열에 추가
        // 여기서 받은 responseDto 에서 name과 email 추가하기!

        const addCompanyMember = async () => {
            try {
                const {name: newMemberName} = await addCompanyMembers(companyId, {email:memberEmail});
                console.log("add member! ", newMemberName);
                if (memberEmail.trim() !== "") {
                    const newMember = {
                        id: members ? members.length + 1 : 1, // members가 null인 경우 id를 1로 초기화
                        name: newMemberName, // members가 null인 경우 이름을 "이름1"로 초기화
                        email: memberEmail,
                    };
            
                    setMembers(members ? [...members, newMember] : [newMember]);
            
                    setMemberEmail(""); // 초대 입력창 비우기
                }
            } catch(error) {
                if (axios.isAxiosError(error)) {
                    // AxiosError 타입이라면 Axios에서 정의한 에러 객체
                    alert(error.response?.data); // 에러 응답 데이터 출력
                }
                console.error("Error add members:", error);
            }
        }
        addCompanyMember();       

        setMemberEmail("");
        setIsModalOpen2(false);
    };

    const handleInviteModalCancel = () => {
        setIsModalOpen2(false);
    };

    // ===================================

    // 설정 완료 모달
    const handleConfirm = () => {
        setIsModalOpen3(true);
    }
    const handleModalConfirm3 = () => { //모든거 완료 시 회사명과 로고만 올라감 
        const handleCreate = () => {
            const formData = new FormData();
            const companyImgFileOptional = companyImgFile === null ? defaultImgUrl : companyImgFile;
            formData.append('image', companyImgFileOptional);
            formData.append('name', compName);
            
            const modifyCompany = async() => {
                try{
                    const data = updateCompany(companyId, formData)
                    console.log("updata company ", data);
                    navigate(PATH.MYCOMPANY); //왜 /company로 가지                        
                }catch(error){
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
        navigate(PATH.MYCOMPANY);
    };
    const handleModalCancel3 = () => {
        setIsModalOpen3(false);
    };

    // ===================================
    const handleAddFile = (img: string) => { //AddFile에서 imgfile 형식으로 받아옴
        setCompanyImgFile(img)
    }

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const { content } = await getMyCompanies();
                const company = content.find((item: { id: number; }) => item.id === companyId);
                
                if (company) {
                    setCompanyImgSrc(company.imageUrl);
                    console.log("Company imageUrl:", company.imageUrl);
                } else {
                    console.log("Company not found for companyId:", companyId);
                }
            } catch (error) {
                console.error("Error fetching company:", error);
            }
        };
        fetchCompany();
    }, [companyId]);
    
    
    useEffect(()=>{
        const fetchCompanyMembers = async () => {
            try {
                const companyMembers = await getCompanyMembers(companyId);
                setMembers(companyMembers);
                console.log("companyMembers", companyMembers)
            } catch(error) {
                console.error("Error fetching members:", error);
            }
        }
        fetchCompanyMembers();        
    }, [companyId])

    console.log("compName", compName)

    return (
        <Container>
            <MainContainer>
                <ProjectManageTitle>회사 관리</ProjectManageTitle>
                <CategoryContainer>
                    <CategoryTitle1>회사명</CategoryTitle1>
                    <Input value={compName} onChange={handleChangeName} placeholder={companyName}></Input>
                </CategoryContainer>
                <CategoryContainer>
                    <CategoryTitle1>회사 오너</CategoryTitle1>
                    <ProjectOwner1>{members && `${members[0].name} (${members[0].email})`}</ProjectOwner1>
                </CategoryContainer>
                <CategoryContainer>
                    <CategoryTitle1>회사 로고</CategoryTitle1>
                    <AddFile imageUrl={companyImgSrc} onImageUpload={handleAddFile}/>
                </CategoryContainer>
                <CategoryContainer>
                    <CategoryTitle1>초대원 이메일</CategoryTitle1>
                    <Input value={memberEmail} size={22.8} onChange={handleChangeEmail}></Input>
                    <Button2 onClick={handleInviteModal} title="초대하기"></Button2>
                </CategoryContainer>
                <CategoryContainer>
                    <CategoryTitle2>회사 멤버</CategoryTitle2>
                    <TableContainer>
                        <MemberTable members={members} projectId={1}/>
                    </TableContainer>
                </CategoryContainer>
                <ButtonContainer>
                    <Button onClick={handleDelCompany} title="회사 삭제" theme="red"></Button>
                    <Button1 onClick={handleConfirm} title="설정완료"></Button1>
                </ButtonContainer>

                <ConfirmationModal isOpen={isModalOpen}
                                   onCancel={handleModalCancel}
                                   onConfirm={handleModalConfirm}
                                    message={"회사를 삭제하시겠습니까?"}/>

                <ConfirmationModal isOpen={isModalOpen2}
                                   onCancel={handleInviteModalCancel}
                                   onConfirm={handleInviteModalConfirm}
                                   message={memberEmail+"님을 초대하시겠습니까?"}/>

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
