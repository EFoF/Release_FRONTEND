import styled from "styled-components";
import Button from "../../components/Button";
import pencil from "../../img/pencil.png";
import eye from "../../img/eye.png";
import check from "../../img/check.png";
import clear from "../../img/clear.png";
import upload from "../../img/upload.png";
import {Title1, Title2} from "../../components/Text/Title";
import {Container1} from "../../components/Container";
import {useEffect, useRef, useState} from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteCategory, fetchOneCategory, updateCategory } from "../../api/category";
import PATH from "../../constants/path";
import UploadModal from "../../components/Modal/UploadModal";
import ConfirmationModal from "../../components/Modal";

interface EditButtonProps {
    imageUrl: string;
    width: number;
    height: number;
}

interface Category {
  id: number;
  title: string;
  detail: string;
  description: string;
  lastModifiedTime: string;
  lastModifierName: string;
  lastModifierEmail: string;
}

export default function CategoryCreate() {
  const [isModalOpen, setIsModalOpen] = useState(false); //
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [categoryMarkdown, setCategoryMarkdown] = useState("");
  const markdownRef = useRef('');
  const [isTitleEdit, setIsTitleEdit] = useState<Boolean>(false);
  // const [categoryId, setCategoryId] = useState();
  const [category, setCategory] = useState<Category>();
  const location = useLocation();
  const navigate = useNavigate();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const [categoryDescription, setCategoryDescription] = useState<string>("");
  const categoryDescriptionRef = useRef('');
  const categoryTitleRef = useRef('');
  const [categoryTitle, setCategoryTitle] = useState("");

  const {categoryId, projectId} = location.state;
  console.log("categoryId, projectId", categoryId, projectId)

  useEffect(()=>{
    const fetchCategory = async() => {
      try{
        const data = await fetchOneCategory(categoryId, true);
        setCategory(data);
        console.log("fetchedCate", data);
        setCategoryMarkdown(data.detail)
      }catch(error){
        console.error("fetch one category fail", error)
      }
    }
    fetchCategory();
  }, [categoryId])

  const handleClickPreview = () => {
      setIsPreview(!isPreview);
  }

  const handleTitleCheckClick = () => {
    setIsTitleEdit(!isTitleEdit);
    const updatedCategoryData = {
      "description": categoryDescription,
      "detail": category?.detail,
      "title": categoryTitle,
    }
    const updateCategoryMarkdown = async() => {
      try{
        const data = await updateCategory(projectId, categoryId, updatedCategoryData);
        console.log("fetchedCate", data);
        setCategory(data);
        // navigate(PATH.PROJECTEDIT);
      }catch(error){
        console.error("fetch one category fail", error)
      }
    }
    updateCategoryMarkdown();

  }

    const handleTitleEditClick = () => {
        setIsTitleEdit(!isTitleEdit);
    }

    const handleMarkdownChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        markdownRef.current = e.target.value
    }

    const handleOnBlur = () => {
      if(categoryMarkdown !== markdownRef.current) {
          setCategoryMarkdown(markdownRef.current);
      }
    }

    const handleApply = () => {
      setIsModalOpen2(true);
    }

    const handleModalConfirmApply = () => {
      const updatedCategoryData = {
        "description": category?.description,
        "detail": categoryMarkdown,
        "title": category?.title,
      }
      const updateCategoryMarkdown = async() => {
        try{
          const data = await updateCategory(projectId, categoryId, updatedCategoryData);
          setCategory(data);
          console.log("fetchedCate", data);
          setCategoryMarkdown(data.detail);
        }catch(error){
          console.error("fetch one category fail", error)
        }
      }
      updateCategoryMarkdown();
      navigate(PATH.CATEGORYEDIT, {state: {categoryId, projectId}});
        setIsModalOpen2(false);
    }

    const handleDelete = () => {
      setIsModalOpen(true);
    }

    const handleModalConfirmDelete = () => {
      const deleteOneCategory = async() => {
        try{
          const data = await deleteCategory(projectId, categoryId);
          console.log("fetchedCate", data);
          navigate(PATH.PROJECTEDIT);
        }catch(error){
          console.error("fetch one category fail", error)
        }
      }
      deleteOneCategory();
    }

    const handleImageUpload = () => {
      setIsImageModalOpen(true);
    }

    const handleImageModalCancel = () => {
        setIsImageModalOpen(false);
    }

    const handleCategoryDescriptionChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      categoryDescriptionRef.current = e.target.value;
    }

    const handleOnBlurCategoryDescription = () => {
      setCategoryDescription(categoryDescriptionRef.current);
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

    const formatDate = (dateString?: string): string => {
      if(!dateString) return "";
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };


  return (
    <Container>
          <CompanyContainer>
              <EditContainer>
                  {!isTitleEdit ? (
                    <Title1>{category?.title}</Title1>
                  ) : (
                    <TextInput2 defaultValue={category?.title} onChange={handleCategoryTitleChange} onBlur={handleOnBlurCategoryTitle} />
                  )
                  }
                  {isTitleEdit ? (
                      <EditButtonContainer>
                          <EditButton imageUrl={check} width={24} height={24} onClick={handleTitleCheckClick} />
                          <EditButton imageUrl={clear} width={24} height={24} onClick={handleTitleEditClick} />
                      </EditButtonContainer>
                  ) : <EditButton imageUrl={pencil} width={24} height={24} onClick={handleTitleEditClick} /> }
              </EditContainer>
                {!isTitleEdit?
                    <CategoryIntro>{category?.description}</CategoryIntro> :
                    <TextInput placeholder={"설명을 입력해주세요"} defaultValue={category?.description} onChange={handleCategoryDescriptionChange} onBlur={handleOnBlurCategoryDescription} />
                }                  
          </CompanyContainer>
        <MarkdownContainer>
            <ModifiedInfo>
                {formatDate(category?.lastModifiedTime)}
                <br />
                {category?.lastModifierEmail} ({category?.lastModifierName})
            </ModifiedInfo>
            <PreviewContainer>
                <GuideText>
                    상세 페이지
                </GuideText>
                <UploadButton imageUrl={upload} width={30} height={30} margin-left="auto" onClick={handleImageUpload} />
                {isPreview ?
                    <EditButton imageUrl={pencil} width={24} height={24} onClick={handleClickPreview}/> :
                    <EditButton imageUrl={eye} width={24} height={24} onClick={handleClickPreview}/>}
            </PreviewContainer>
            {isPreview ? (
                <MarkDownPreviewContainer>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{categoryMarkdown}</ReactMarkdown>
                </MarkDownPreviewContainer>
                )
                : <TextInput3 defaultValue={categoryMarkdown} onChange={handleMarkdownChange} onBlur={handleOnBlur}/>
            }
            <PreviewContainer>
                <Button title="취소하기" onClick={()=>navigate(-1)}></Button>
                <ButtonContainer>
                    <Button title="적용하기" theme="blue" onClick={handleApply}></Button>
                    <Button title="삭제하기" theme="red" onClick={handleDelete}></Button>
                </ButtonContainer>
            </PreviewContainer>
            <UploadModal isOpen={isImageModalOpen}
                         onCancel={handleImageModalCancel} />
        </MarkdownContainer>
        <ConfirmationModal isOpen={isModalOpen}
                            onCancel={() => {
                              setIsModalOpen(false);
                            }}
                            onConfirm={handleModalConfirmDelete}
                            message={"카테고리를 정말 삭제 하시겠습니까?"}/>

        <ConfirmationModal isOpen={isModalOpen2}
                            onCancel={() => {
                              setIsModalOpen2(false);
                            }}
                            onConfirm={handleModalConfirmApply}
                            message={"적용하시겠습니까?"}/>
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
  //margin-left: 8rem;
  width: 65rem;
  height: 20rem;
`;

export const MarkdownContainer = styled(Container1)`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  margin-bottom: 10rem;
  //margin-left: 8rem;
  width: 75rem;
  min-height: 30rem;
`


export const CompanyIntro = styled.div`
  color: #000;
  font-family: S-Light;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 3rem;
  white-space: pre-wrap;
  word-break: break-all;
`;

export const ModifiedInfo = styled.text`
  color: #000;
  font-family: S-Light;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: auto;
  margin-bottom: 0.1rem;
  text-align: right;
  display: inline-block;
  white-space: pre-wrap;
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
`;

export const GuideText = styled(Title2)`
  font-size: 1.8rem;
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

export const UploadButton = styled.div<EditButtonProps>`
  margin-left: auto;
  background-image: url(${props => props.imageUrl});
  background-repeat: no-repeat;
  background-size: contain;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }

`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 3rem;
`;

export const TextInput = styled.textarea`
  padding: 10px;
  color: #808080;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 1.5rem;
  min-height: 10rem;
  outline: none;
  font-size: 1.4rem;
  resize: none;
`;

export const TextInput2 = styled.textarea`
  padding: 10px;
  color: #808080;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 1.4rem;
  resize: none;
  min-width: 30rem;
  height: 4rem;
`;

export const TextInput3 = styled.textarea`
  padding: 10px;
  color: #808080;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 1.5rem;
  min-height: 20rem;
  outline: none;
  font-size: 1.4rem;
  resize: none;
`;

export const MarkDownPreviewContainer = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 1.5rem;
  min-height: 20rem;
  outline: none;
  font-size: 16px;
`;

export const ButtonMargin = styled(Button)`
  margin-right: 1.5rem;
`