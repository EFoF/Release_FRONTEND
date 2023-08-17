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
}

export default function CategoryCreate() {
  const [isPreview, setIsPreview] = useState(false);
  const [categoryMarkdown, setCategoryMarkdown] = useState("");
  const markdownRef = useRef('');
  const [isTitleEdit, setIsTitleEdit] = useState<Boolean>(false);
  // const [categoryId, setCategoryId] = useState();
  const [category, setCategory] = useState<Category>();
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {categoryId, projectId} = location.state;
  console.log("categoryId, projectId", categoryId, projectId)

  useEffect(()=>{
    const fetchCategory = async() => {
      try{
        const data = await fetchOneCategory(categoryId);
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
          navigate(PATH.PROJECTEDIT);
        }catch(error){
          console.error("fetch one category fail", error)
        }
      }
      updateCategoryMarkdown();
    }

    const handleDelete = () => {
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
      setIsModalOpen(true);
    }

    const handleModalCancel = () => {
        setIsModalOpen(false);
    }

  return (
    <Container>
          <CompanyContainer>
              <EditContainer>
                  <Title1>{category?.title}</Title1>
                  {isTitleEdit ? (
                      <EditButtonContainer>
                          <EditButton imageUrl={check} width={24} height={24} onClick={handleTitleEditClick} />
                          <EditButton imageUrl={clear} width={24} height={24} onClick={handleTitleEditClick} />
                      </EditButtonContainer>
                  ) : <EditButton imageUrl={pencil} width={24} height={24} onClick={handleTitleEditClick} /> }
              </EditContainer>
            <CompanyIntro>
              {category?.description}
            </CompanyIntro>
          </CompanyContainer>
        <MarkdownContainer>
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
                : <TextInput defaultValue={categoryMarkdown} onChange={handleMarkdownChange} onBlur={handleOnBlur}/>
            }
            <PreviewContainer>
                <Button title="취소하기" onClick={()=>navigate(-1)}></Button>
                <ButtonContainer>
                    <ButtonMargin title="적용하기" onClick={handleApply}></ButtonMargin>
                    <Button title="삭제하기" theme="red" onClick={handleDelete}></Button>
                </ButtonContainer>
            </PreviewContainer>
            <UploadModal isOpen={isModalOpen}
                         onCancel={handleModalCancel} />
        </MarkdownContainer>
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
`;

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 3rem;
`;

export const TextInput = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 1.5rem;
  min-height: 20rem;
  outline: none;
  font-size: 16px;
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