import styled from "styled-components";
import Button from "../../components/Button";
import pencil from "../../img/pencil.png";
import eye from "../../img/eye.png";
import {Title1, Title2} from "../../components/Text/Title";
import {Container1} from "../../components/Container";
import markdown from "../company/markdown";
import {useEffect, useState} from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

interface EditButtonProps {
    imageUrl: string;
    width: number;
    height: number;
}
export default function CategoryCreate() {
  const [isPreview, setIsPreview] = useState(false);
  const [markdown, setMarkdown] = useState("# Title");
  const [isEditMode, setIsEditMode] = useState([]);
  const [categories, setCategories] = useState([
        {name: "개발 프로세스", intro: "카카오 i 서비스 시스템에서 카카오 i 계정(Kakao i Account)은 카카오 i 계정을 기반으로 제공되는 다양한 카카오 i 서비스들(카카오워크, 카카오 i 클라우드 등)과 연동하여 사용자 인증/권한 관리 등과 같은 통합 계정 관리와 계정의 생성, 변경, 삭제와 같은 계정의 라이프 사이클을 관리하고 리소스 접근에 대한 권한을 제어합니다."},
        {name: "API", intro: "카카오 i 플랫폼과 연동하여 다양한 IoT 디바이스에서 AI 음성 서비스를 활용할 수 있도록 개발에 필요한 기본적인 개념 및 상세 설명을 제공합니다. 카카오 i 플랫 서비스를 활용할 수 있도록 개발에 필요한 기본적인 개념 및 상세 설명을 제공합니다. "},
        {name: "부록", intro: "카카오 i 계정 서비스를 좀 더 편리하게 사용할 수 있도록 관리자 서비스 페이지를 제공합니다.        "},
      ]);

  const handleClickPreview = () => {
      setIsPreview(!isPreview);
  }

  const handleChangeText = (e : React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setMarkdown(e.target.value)
  }

  useEffect(() => {

  }, [categories])


  return (
    <Container>
          <CompanyContainer>
              <EditContainer>
                  <Title1>개발 프로세스</Title1>
                  <EditButtonContainer>
                      <EditButton imageUrl={pencil} width={24} height={24}></EditButton>
                  </EditButtonContainer>
              </EditContainer>
            <CompanyIntro>
                카카오 i 서비스 시스템에서 카카오 i 계정(Kakao i Account)은 카카오 i 계정을 기반으로 제공되는 다양한 카카오 i 서비스들(카카오워크, 카카오 i 클라우드 등)과 연동하여 사용자 인증/권한 관리 등과 같은 통합 계정 관리와 계정의 생성, 변경, 삭제와 같은 계정의 라이프 사이클을 관리하고 리소스 접근에 대한 권한을 제어합니다.
            </CompanyIntro>
          </CompanyContainer>
        <MarkdownContainer>
            <PreviewContainer>
                <GuideText>
                    상세 페이지
                </GuideText>
                {isPreview ?
                    <EditButton imageUrl={pencil} width={24} height={24} onClick={handleClickPreview}/> :
                    <EditButton imageUrl={eye} width={24} height={24} onClick={handleClickPreview}/>}
            </PreviewContainer>
            {/*{markdown()}*/}
            {isPreview ?
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown> : <TextInput defaultValue={markdown} />
            }
            <PreviewContainer>
                <Button title="취소하기"></Button>
                <ButtonContainer>
                    <ButtonMargin title="적용하기" ></ButtonMargin>
                    <Button title="삭제하기" theme="red"></Button>
                </ButtonContainer>
            </PreviewContainer>
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

export const ButtonMargin = styled(Button)`
  margin-right: 1.5rem;
`