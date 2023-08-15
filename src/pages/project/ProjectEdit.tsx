import styled from "styled-components";
import Button from "../../components/Button";
import React, {useEffect, useRef, useState} from "react"
import pencil from "../../img/pencil.png";
import minus from "../../img/minus.png";
import plus from "../../img/plus.png";
import check from "../../img/check.png";
import clear from "../../img/clear.png";
import {CategoryTitle, Title1, Title2} from "../../components/Text/Title";
import {Container1} from "../../components/Container";
import { Toggle } from "typescript-toggle";
import ConfirmationModal from "../../components/Modal";
import Input from "../../components/Input";
import PATH from "../../constants/path";
import {useLocation, useNavigate} from "react-router-dom";
import { editProject, fetchProject } from "../../api/project";
import { addCategory, deleteCategory, fetchCategories, updateCategory } from "../../api/category";
import { useRecoilValue } from "recoil";
import { companyIdState } from "../../states/companyState";
import NoProject from "../company/NoProject";

interface EditButtonProps {
    imageUrl: string;
    width: number;
    height: number;
}

interface Category {
    id?: number;
    detail : string;
    title: string;
    description: string;
}

interface CategoryData {
    categoryEachDtoList: Category[];
}

interface Project {
    title: string;
    description: string;
    scope: boolean;
    id: number;
}

export default function ProjectEdit() {
    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState<Boolean[]>([]);
    const [isTitleEdit, setIsTitleEdit] = useState<Boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [isModifyModalOpen, setIsModifyModalOpen] = useState<boolean>(false);
    const [index, setIndex] = useState<number>();
    const [isPlusButtonOn, setIsPlusButtonOn] = useState<boolean>(false);
    const [categoryName, setCategoryName] = useState<string>("");
    const [projectDescription, setProjectDescription] = useState("");
    const [categoryDescription, setCategoryDescription] = useState<string>("");
    const categoryDescriptionRef = useRef('');
    const projectDescriptionRef = useRef('');
    const categoryTitleRef = useRef('');
    const [categoryTitle, setCategoryTitle] = useState("");

    
    const [categoryId, setCategoryId] = useState(0);
    const [categories, setCategories] = useState<Category[]>([]);
    const [projectList, setProjectList] = useState<Project[] | null>(null);
  const [projectId, setProjectId] = useState(0); //디폴트 화면 띄우기 위해 0번째
  const [project, setProject] = useState<Project>();
  const companyId = useRecoilValue(companyIdState);
  
  const location = useLocation();
//   const companyId = location.state.companyId;
   useEffect(()=> {
    console.log("location.state", location.state)
    if (typeof location.state !== 'object' && location.state !== null) {
      const PID = location.state;
      setProjectId(PID);  
      console.log("1234projectId", projectId)
    } 
    console.log("projectList", projectList)
    projectList && projectId===0 && setProject(projectList[0]); //현 pid로 현재의 project 할당 
    projectList && projectId!==0 && setProject(projectList.find(project => project.id === projectId)); 
  
    console.log("companyId, projectId", companyId, projectId);
    console.log("currentProject", project);
  }, [companyId, location.state, project, projectId, projectList])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {projectList: projects} = await fetchProject(companyId);
        console.log("fetched project", projects);
        setProjectList(projects);
        console.log("projectId", projectId)

        // setProjectId가 완료된 후에 fetchCategories 실행
        if(projectId) fetchCategoriesAfterSettingProjectId(projectId)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    const fetchCategoriesAfterSettingProjectId = async (projectId: number) => {
      try {
        console.log("projectId2", projectId)
        const { categoryEachDtoList: categories } = await fetchCategories(projectId);
        console.log("fetched categories", categories);
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchData();
  }, [companyId, projectId]);
    

    const handleProjectDescriptionChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        projectDescriptionRef.current = e.target.value;
    }

    const handleOnBlurProjectDescriptionChange = () => {
        setProjectDescription(projectDescriptionRef.current);
    }

    const handleCategoryTitleChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        categoryTitleRef.current = e.target.value;
        // setCategoryTitle(e.target.value)
    }

    const handleOnBlurCategoryTitle = () => {
        setCategoryTitle(categoryTitleRef.current)
        // setCategoryTitle(categoryTitle)
    }

    const handleTitleCheckClick = () => {
        setIsTitleEdit(!isTitleEdit);
        const projectData = {
            "description": projectDescription,
            "scope": project?.scope,
            "title": project?.title,
        }
        console.log("!!!", projectId, project);

        const editTitleDescription = async () => {
            try {
                const fetchedData = await editProject(projectId, projectData);
                console.log("editTitleDescription", fetchedData);
                setProject((prevProject) => {
                    if (prevProject) {
                        return {
                            ...prevProject,
                            description: projectDescriptionRef.current,
                        };
                    }
                    return prevProject;
                });
            } catch(error) {
                console.error("Error edit project:", error);
            }
        }
        editTitleDescription();
    }

    const handleCategoryEditClick = (index:number) => {
        const updatedList = [...isEditMode];
        updatedList[index] = !updatedList[index];
        setIsEditMode(updatedList);
    }

    const handleAddNewCategory = () => {
        setIsAddModalOpen(true);
    }

    const handleTitleEditClick = () => {
        setIsTitleEdit(!isTitleEdit);
    }

    const handleRemoveButton = (index:number, categoryID: number | undefined) => {
        setIsDeleteModalOpen(true);
        // 몇번째 인덱스의 리스트를 지울지 따로 저장해줘야 함
        setIndex(index);
        categoryID && setCategoryId(categoryID);
    }

    const handleModalCancel = () => {
        // 모달 닫기
        setIsDeleteModalOpen(false);
    };

    const handlePlusButton = () => {
        setIsPlusButtonOn(!isPlusButtonOn);
    }

    const handleConfirmAddModal = async () => {
        // 새 카테고리를 서버로 보내는 API 요청을 수행
        const newCategoryData = {
            "description": categoryDescription,
            "detail": "",
            "title": categoryName,
        };

        try {
            const data = await addCategory(projectId, newCategoryData);
            console.log("addCategory", data)
            setCategories((prevCategories) => [...prevCategories, newCategoryData]); 
            setIsAddModalOpen(false); // 모달 닫기

            setIsPlusButtonOn(!isPlusButtonOn);

            setCategoryName("");
        } catch(error) {
            console.error("Error add category:", error);
        }
    };

    const handleCancelAddModal = () => {
        setIsAddModalOpen(false);
    }

    const handleCancelCategoryAdd = () => {
        setIsPlusButtonOn(!isPlusButtonOn);
    }

    const handleCategoryNameChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setCategoryName(e.target.value);
    }

    const handleCategoryDescriptionChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        categoryDescriptionRef.current = e.target.value;
    }

    const handleOnBlurCategoryDescription = () => {
        setCategoryDescription(categoryDescriptionRef.current);
    }

    const handleEditConfirmButton = (index:number, categoryID: number | undefined) => {
        categoryID && setCategoryId(categoryID); //확정은 아니지만 현재 action을 취하고 있는 category 잡고 있음 
        setIndex(index); //현재 index 기억해두기 
        setIsModifyModalOpen(true);
    }

    const handleCancelModifyModal = () => {
        setIsModifyModalOpen(false);
    }

    const handleConfirmModifyModal = async () => {
        const newCategoryData = {
            "description": categoryDescription,
            "detail": "",
            "title": categoryTitle,
        };

        try {
            const data = await updateCategory(projectId, categoryId, newCategoryData);
            console.log("newCategoryData", newCategoryData);
            console.log("updateCategory", data);
            
            //수정한 원소 반영 
            setCategories((prevCategories) => {
                const updatedCategories = [...prevCategories];
                if (typeof index === 'number') updatedCategories[index] = newCategoryData;
                return updatedCategories;
            });

             //isEdit 모드 해제 
             const updatedList = [...isEditMode];
             if (typeof index === 'number') {
                 updatedList[index] = !updatedList[index];
             }
             setIsEditMode(updatedList);

             setIsAddModalOpen(false); // 모달 닫기
             setCategoryName("");
        } catch(error) {
            console.error("Error adding new category:", error);
        }
        setIsModifyModalOpen(false);
    }

    const handleReleaseButton = () => {
        navigate(PATH.RELEASE)
    }

    const handleToggleChange = async () => {        
        const projectData = {
            "description": project?.description,
            "scope": !project?.scope,
            "title": project?.title,
        }
        console.log("!!!", projectId, project);

        const editProjectToggle = async () => {
            try {
                const fetchedData = await editProject(projectId, projectData);
                console.log("editTitleDescription", fetchedData);
                setProject((prevProject) => {
                    if (prevProject) {
                        return {
                            ...prevProject,
                            scope: !prevProject.scope
                        };
                    }
                    return prevProject;
                });
            } catch(error) {
                console.error("Error edit project:", error);
            }
        }
        editProjectToggle();
    }
    
    const handleConfirmDelete = () => {
        // TODO: 인덱스에 해당하는 카테고리 지우고 디비에 반영
        setCategories((prevCategories) =>
            prevCategories.filter((_, categoryIndex) => categoryIndex !== index)
        );

        try{
            const data = deleteCategory(projectId, categoryId);
            console.log("deleteCategory", data);
        } catch(error) {
            console.error("Error delete category:", error);
        }
        
        setIsDeleteModalOpen(false);
    };

    useEffect(() => {
        const newBooleanList = new Array(categories?.length).fill(false);
        setIsEditMode(newBooleanList);
    }, [categories])

    return (
        <Container>
            {projectList === null || projectList?.length === 0 ? (
        <NoProject isDev={true}/>
      ) : (
        <>
            <Scope>
                <CompanyContainer>
                    <EditContainer>
                        {projectList !== null && <CompanyName>{project?.title}</CompanyName>}
                        {isTitleEdit ?
                            (<EditButtonContainer>
                                <EditButton imageUrl={check} width={24} height={24} onClick={handleTitleCheckClick} />
                                <EditButton imageUrl={clear} width={24} height={24} onClick={handleTitleEditClick} />
                            </EditButtonContainer>) :
                            <EditButton imageUrl={pencil} width={24} height={24} onClick={handleTitleEditClick}></EditButton>
                        }
                    </EditContainer>
                    <CompanyIntro>
                    {isTitleEdit ? <TextInput defaultValue={project?.description} onChange={handleProjectDescriptionChange} onBlur={handleOnBlurProjectDescriptionChange}/>
                     : project?.description}
                    </CompanyIntro>
                </CompanyContainer>
                <ToggleContainer>
                    <EditContainer>
                        <ScopeText>
                            공개 여부
                        </ScopeText>
                        {project && (<Toggle isOn={project.scope} handleChange={handleToggleChange} />)}
                    </EditContainer>
                </ToggleContainer>
            </Scope>
            <ButtonContainer>
                <Button1 title="프로젝트 관리" onClick={()=>navigate(PATH.PROJECTMANAGE)}></Button1>
                <Button1 title="Release Note" onClick={handleReleaseButton}></Button1>
            </ButtonContainer>
            <DetailContainer>
                <CategoryContainers>
                    {categories!==null &&
                        categories.map((category, index)=>(
                        <CategoryContainer>
                                {!isEditMode[index] ? (
                                    <EditContainer>
                                        <CategoryName>{category.title}</CategoryName>
                                        <EditButtonContainer>
                                            <EditButton imageUrl={pencil} width={24} height={24} onClick={()=>handleCategoryEditClick(index)} />
                                            <EditButton imageUrl={minus} width={24} height={24} onClick={()=>handleRemoveButton(index, category.id)}/>
                                        </EditButtonContainer>
                                    </EditContainer>
                                ) : (
                                    <EditContainer>
                                        <TextInput defaultValue={category.title} onChange={handleCategoryTitleChange} onBlur={handleOnBlurCategoryTitle} />
                                        <EditButtonContainer>
                                            <EditButton imageUrl={check} width={24} height={24} onClick={()=>handleEditConfirmButton(index, category.id)} />
                                            <EditButton imageUrl={clear} width={24} height={24} onClick={()=>handleCategoryEditClick(index)} />
                                        </EditButtonContainer>
                                    </EditContainer>
                                )}
                            {!isEditMode[index] ?
                                <CategoryIntro>{category.description}</CategoryIntro> :
                                <TextInput placeholder={"설명을 입력해주세요"} defaultValue={category.description} onChange={handleCategoryDescriptionChange} onBlur={handleOnBlurCategoryDescription} />
                            }
                        </CategoryContainer>
                    ))}
                    {!isPlusButtonOn ? (
                        <CategoryContainer>
                            <CenteredContent>
                                <EditButton imageUrl={plus} width={57} height={57} onClick={handlePlusButton}/>
                            </CenteredContent>
                        </CategoryContainer>
                    ) : (
                        <CategoryContainer>
                            <EditContainer>
                                <Input placeholder={"제목을 입력해주세요"} value={categoryName} onChange={handleCategoryNameChange} />
                                <EditButtonContainer>
                                    <EditButton imageUrl={check} width={24} height={24} onClick={handleAddNewCategory} />
                                    <EditButton imageUrl={clear} width={24} height={24} onClick={handleCancelCategoryAdd} />
                                </EditButtonContainer>
                            </EditContainer>
                            <TextInput placeholder={"설명을 입력해주세요"} onChange={handleCategoryDescriptionChange} onBlur={handleOnBlurCategoryDescription} />
                        </CategoryContainer>
                    )
                    }
                </CategoryContainers>
            </DetailContainer>
            <ConfirmationModal isOpen={isDeleteModalOpen} onCancel={handleModalCancel} onConfirm={handleConfirmDelete}
                               message={"삭제하시겠습니까?"}/>
            <ConfirmationModal isOpen={isAddModalOpen} onCancel={handleCancelAddModal} onConfirm={handleConfirmAddModal}
                               message={"새 카테고리를 추가 하시겠습니까?"}/>
            <ConfirmationModal isOpen={isModifyModalOpen} onCancel={handleCancelModifyModal} onConfirm={handleConfirmModifyModal}
                               message={"변경내역을 반영하시겠습니까?"}/>
            </>
      )}
        </Container>
    );
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const DetailContainer = styled.div`
    width: 100%;
    background-color: #F6F6F6;
`

export const CompanyContainer = styled(Container1)`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  margin-left: 5rem;
  width: 80rem;
  height: 20rem;

`;

export const CompanyName = styled(Title1)`

`;

export const CompanyIntro = styled.div`
color: #000;
font-family: S-Light;
font-size: 1.5rem;
font-style: normal;
font-weight: 500;
line-height: normal;
margin-top: 3rem;  
`;


export const CategoryContainers = styled(Container1)`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  //margin-left: 5.5rem;
  width: 80rem;
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  //margin-left: 5rem;
`;

export const CategoryName = styled(Title2)`
    
`;

export const CategoryIntro = styled.div`
  display: flex;
  flex-direction: column;
  color: #000;
  font-family: S-Light;
  font-size: 1.5rem;
font-style: normal;
font-weight: 400;
line-height: normal;
  margin-top: 3rem;
`;

export const EditContainer = styled.div`
    display: flex;
  justify-content: space-between;
  flex-direction: row;
`

export const EditButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 3rem;
`

export const EditButton = styled.div<EditButtonProps>`
  background-image: url(${props => props.imageUrl});
  background-repeat: no-repeat;
  background-size: contain;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  margin-left: 1.5rem;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 3rem;
  margin-left: 70rem;
  margin-bottom: 3rem;
`;

export const Button1 = styled(Button)`
    margin-right: 1.88rem;
  width: 13rem;
  height: 7rem;
`

export const Scope = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 3rem;
`;

export const ToggleContainer = styled.div`
  margin-top: 3rem;
  margin-left: 10rem;
`;

export const ScopeText = styled.h3`
  font-family: S-medium;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-right: 1.5rem;
  display: flex;
  align-items: center; /* 수직 가운데 정렬 */
`;

export const CenteredContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextInput = styled.textarea`
  padding: 10px;
  color: #808080;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 20rem;
  outline: none;
  font-size: 1.4rem;
  resize: none;
  min-width: 50rem;
`;