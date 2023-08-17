import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import {useState, useEffect} from "react"
import { CategoryTitle, Title1 } from "../../components/Text/Title";
import toggleOff from "../../img/ri_toggle-line.png"
import toggleOn from "../../img/ri_toggle-fill.png"
import { useLocation, useNavigate } from "react-router-dom";
import PATH from "../../constants/path";
import { createProject } from "../../api/project";
import { useRecoilState } from "recoil";
import { companyIdState } from "../../states/companyState";


export default function ProjectCreate() {
  const [projectName, setProjectName] = useState("");
  const [projectDetail, setProjectDetail] = useState("");
  const [toggleState, setToggleState] = useState(false);
  const [companyId, setCompanyId] = useRecoilState<number>(companyIdState);

  const navigate = useNavigate();

  // 여기 코드 떄문에 companyId가 이상해진 것 같음 (추측)
  // const {state} = useLocation();
  // useEffect(()=>{
  //   setCompanyId(state);
  // }, [setCompanyId, state])

  const handleChangeName = (e : React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setProjectName(e.target.value)
  }

  const handleChangeDetail = (e : React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setProjectDetail(e.target.value)
  }

  const handleToggleClick = () => {
      setToggleState((prevState) => !prevState);
  }

  const handleBack = () => {
    navigate(-1);
  }

  const handleClickCreate = () => {
    //com id 가져와야함 이 페이지에 
    const projectData = {
      description: projectDetail,
      scope: toggleState, 
      title: projectName,
    }
    const createMyProject = async () => {
      try {
        const data = await createProject(companyId, projectData);
        console.log("create project", data);
        navigate(PATH.MYPROJECT);
      } catch (error) {
        console.error("Error creating project:", error);
      }
    };
    createMyProject();
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
                <ToggleImg src={toggleState ? toggleOn : toggleOff} onClick={handleToggleClick}/>
            </ToggleContainer>
        </CategoryContainer>
        <ButtonContainer>
          <Button1 title="취소하기" onClick={handleBack}></Button1>
          <Button title="생성하기" theme="blue" onClick={handleClickCreate}></Button>
        </ButtonContainer>
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

interface ToggleContainerProps {
    toggleState: boolean;
  }

export const ToggleContainer = styled.div`
    min-width: 35rem;
    margin-top: 0.7rem;
  border-radius: 1.875rem;
`

export const ButtonContainer = styled.div`
  display: flex;
    align-self: flex-end;
  margin-top: 3rem;
`;

export const Button1 = styled(Button)`
    margin-right: 1.88rem;
`