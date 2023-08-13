import styled from "styled-components";
import Button from "../../components/Button";
import { Title1, Title2 } from "../../components/Text/Title";
import { Container1 } from "../../components/Container";
import markdown from "../company/markdown";
import { useEffect, useRef, useState } from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

export default function Category() {


  return (
    <Container>
      <CategoryContainer>
        <CategoryName>카테고리1</CategoryName>
        <CategoryIntro>인트로로 ㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹ</CategoryIntro>
      </CategoryContainer>
      <TextInput defaultValue={markdown} onChange={handleMarkdownChange} onBlur={handleOnBlur}/>
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
`;

export const TextInput = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 1.5rem;
  min-height: 50rem;
  outline: none;
  font-size: 16px;
  resize: none;
`;