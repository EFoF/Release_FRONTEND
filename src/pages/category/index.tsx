import styled from "styled-components";
import Button from "../../components/Button";
import { Title1, Title2 } from "../../components/Text/Title";
import { Container1 } from "../../components/Container";
import markdown from "../company/markdown";
import { useEffect, useRef, useState } from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchOneCategory } from "../../api/category";

const CustomList = ({ children }: any) => (
  <>
    <li style={{ marginLeft: '2rem' }}>{children}</li>
  </>
);


interface Category {
  id: number;
  title: string;
  detail: string;
  description: string;
}

export default function Category() {
  const [markdown, setMarkdown] = useState("");
  const [category, setCategory] = useState<Category>();

  const location = useLocation();
  const navigate = useNavigate();

  const {categoryId, projectId} = location.state;

  console.log("here category Id", categoryId);

  const components = {
    li: CustomList,
  };

  useEffect(()=>{
    async function fetchCategory() {
      try{
        const data = await fetchOneCategory(categoryId, false);
        setCategory(data);
        setMarkdown(data.detail)
      }catch(error){
        console.error("fetch one category fail", error)
      }
    }
    fetchCategory();
  }, [categoryId])

  return (
    <Container>
      <CategoryContainer>
        <CategoryName>{category?.title}</CategoryName>
        <CategoryIntro>
          {category?.description}
        </CategoryIntro>
      </CategoryContainer>
      <MarkDownPreviewContainer>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{markdown}</ReactMarkdown>
      </MarkDownPreviewContainer>
    </Container>
  );
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 3rem 3.8rem;
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  // margin-top: 3rem;
  // margin-left: 3.8rem;
  width: 80rem;
`;

export const CategoryName = styled.div`
  display: flex;
  flex-direction: column;
  color: #000;
  font-family: S-Bold;
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 1.5rem;
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
  white-space: pre-wrap;
  word-break: break-all;
`;

export const MarkDownPreviewContainer = styled.div`
  // border: 1px solid #ccc;
  // border-radius: 5px;
  margin-top: 3rem;
  // min-height: 20rem;
  outline: none;
  font-size: 1.6rem;
`;