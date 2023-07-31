import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import {useState} from "react"
import { CategoryTitle, Title1 } from "../../components/Text/Title";
import toggleOff from "../../img/ri_toggle-line.png"
import toggleOn from "../../img/ri_toggle-fill.png"


export default function ProjectCreate() {
    const [projectName, setProjectName] = useState("");
    const [projectDetail, setProjectDetail] = useState("");

    const handleChangeName = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setProjectName(e.target.value)
    }

    const handleChangeDetail = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setProjectDetail(e.target.value)
    }

  return (
    <Container>
      <MainContainer>
        <ProjectCreateTitle>프로젝트 생성하기</ProjectCreateTitle>
        <CategoryContainer>
            <CategoryTitle1>프로젝트명</CategoryTitle1>
            <Input value={projectName} onChange={handleChangeName}></Input>
        </CategoryContainer>
        <CategoryContainer>
            <CategoryTitle1>프로젝트 설명</CategoryTitle1>
            <Input value={projectDetail} onChange={handleChangeDetail}></Input>
        </CategoryContainer>
        <CategoryContainer>
            <CategoryTitle1>공개 여부</CategoryTitle1>
            <ToggleContainer>
                <ToggleImg src={toggleOff}/>
            </ToggleContainer>
        </CategoryContainer>
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
align-items: center;
margin-bottom: 2rem;
`;

export const ProjectCreateTitle = styled(Title1)`
  margin-bottom: 4.69rem;
`;

export const CategoryTitle1 = styled(CategoryTitle)`
  min-width: 12rem;
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