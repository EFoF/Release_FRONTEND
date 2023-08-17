import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import {useState, useEffect} from "react"
import Dialog from "../../components/Dialog";
import { fetchProject } from "../../api/project";
import { useLocation } from "react-router-dom";
import { fetchCategories } from "../../api/category";
import { companyIdState } from "../../states/companyState";
import {atom, useRecoilValue} from "recoil";
import NoProject from "./NoProject";

interface Project {
  id: number;
  title: string;
  scope: boolean;
  description: string;
}

interface Category {
  title: string;
  description: string;
}

export default function Company() {
  //이쪽 페이지에서 헤더와 사이드바에서 getcompany해서 이름과 id 알아내야함 
  const [categories, setCategories] = useState<Category[] | null>(null);

  const [projectList, setProjectList] = useState<Project[] | null>(null);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [projectId, setProjectId] = useState(0); //디폴트 화면 띄우기 위해 0번째
  const companyIdValue = useRecoilValue(companyIdState);
  const [project, setProject] = useState<Project>();
  const location = useLocation();

  

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

  console.log("companyId, projectId", companyIdValue, projectId);
  console.log("currentProject", project);
}, [companyIdState, location.state, project, projectId, projectList])

  //이전 클릭 이벤트에서 받은 id 통해서 comp 정보 불러오기 
  //inner에서는 일단 프로젝트들 id 저장 / 프로젝트 title, description로 렌더링
  //프로젝트 id 통해서 모든 카테고리 부름 / title과 description

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {projectList: projects} = await fetchProject(companyIdValue);
        // 디펜시브가 빠졌다. 여기서 데이터가 없다면 프로젝트 만들기 화면을 띄워줘야 함.
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
  }, [companyIdValue, projectId]);

  useEffect(()=>{
      project && setProjectId(project.id)
  }, [project])

  return (
    <Container>
      {projectList === null || projectList?.length === 0 ? (
        <NoProject isDev={false}/>
      ) : (
        <>
        <ProjectContainer>
          <ProjectName>{project?.title}</ProjectName>
          <ProjectIntro> 
            {project?.description}
          </ProjectIntro>
        </ProjectContainer>
        <CategoryContainers>
          {categories!==null &&
            categories.map((category, index)=>(
              <CategoryContainer>
                  <CategoryName>{category.title}</CategoryName>
                  <CategoryIntro>
                      {category.description}
                  </CategoryIntro>
              </CategoryContainer>
          ))}
        </CategoryContainers>
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

export const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  margin-left: 3.8rem;
  width: 80rem;

`;

export const ProjectName = styled.div`
color: #000;
font-family: S-Bold;
font-size: 3rem;
font-style: normal;
font-weight: 600;
line-height: normal;
margin-bottom: 2rem;
`;

export const ProjectIntro = styled.div`
color: #000;
font-family: S-Light;
font-size: 1.5rem;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

export const CategoryContainers = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  margin-left: 5.5rem;
  width: 80rem;
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
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
