import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../../styles/font.css";
import setting from "../../img/setting1.png"
import Button from "../Button";
import { useLocation, useNavigate } from "react-router-dom";
import PATH from "../../constants/path";
import { useRecoilValue } from 'recoil';
import { companyIdState } from '../../states/companyState';
import { fetchProject } from "../../api/project";
import { fetchCategories } from "../../api/category";
import {getReleases} from "../../api/release";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   background-color: white;
//   // height: calc(100vh); //58.44rem
//   width: 30rem; //20.75rem;
//   position: sticky; //fixed;
//   top: 5.56rem;;
//   border-right: 0.0625rem solid rgba(0, 0, 0, 0.2);
// `;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 65rem; //일단 맞춤 
  // min-height: calc(100vh - 5.56rem);
  width: 30rem; //20.75rem;
  position: sticky;
  top: 5.56rem;
  border-right: 0.0625rem solid rgba(0, 0, 0, 0.2);
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2.08rem;
  margin-top: 2.38rem;
`;

const SidebarItem = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: row;
  color: #000;
  font-family: S-Bold;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const SidebarArrow = styled.span`
  margin-left: 1rem;
`;

const SubMenuContainer = styled.div`
  margin-top: 0.5rem;
  margin-left: 0.5rem;
`;

const SubMenuItem = styled.div`
  color: #000;
  font-family: S-Light;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 400;
  // line-height: normal;
  margin-top: 0.5rem;
  cursor: pointer;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  position: absolute;
  width: 100%;
  // border-top: 0.0625rem solid rgba(0, 0, 0, 0.2);
  bottom: 2rem; /* 버튼과 하단 간격 조절 */
  left: 50%; /* 가운데 정렬을 위해 왼쪽 위치 조절 */
  transform: translateX(-50%); /* 가운데 정렬을 위해 가로 방향으로 이동 */
`

const CompanySetting = styled.img`
    width: 3.8rem;
    height: 3.8rem;
    margin-top: 0.5rem;
    cursor: pointer;
    margin-bottom: 0.65rem;
`

interface Project {
  id: number;
  title: string;
  scope: boolean;
  description: string;
}

interface Category {
  id: number;
  title: string;
  description: string;
}

export default function CompanySide() {
  const companyId = useRecoilValue(companyIdState);
  console.log("companyId", companyId)
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [projectId, setProjectId] = useState();
  const [categories, setCategories] = useState<Category[] | null>(null);
  const navigate = useNavigate();
  const [activeProject, setActiveProject] = useState(null);
  const [isDev, setIsDev] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    setIsDev(location.pathname.includes("mypage") || location.pathname.includes("dev"));
  }, [location.pathname]);
  console.log("isDev", isDev)

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const {projectList} = await fetchProject(companyId); 
        console.log("fetched project", projectList);
        setProjects(projectList); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [companyId])

  const handleProjectClick = async (index: any, projectId: number) => {
    setActiveProject(activeProject === index ? null : index);
    
    if (activeProject !== index) {
      try {
        const { categoryEachDtoList: categories } = await fetchCategories(projectId);
        console.log("fetched categories", categories); 
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    if(isDev) {
      navigate(PATH.PROJECTEDIT, {state: projectId}); //해당 프로젝트 클릭 시 그 프로젝트 edit 페이지 - id를 통해 fetching
    } else {
      navigate(PATH.COMPANYMAIN, {state: projectId})
    }
  };  

  const handleCategoryClick = () => {

  }

  const handleButtonClick = () => {
    navigate(PATH.PROJECTCREATE, {state: companyId})
  }

  const handleReleaseClick = async (projectId: number, projectTitle: string) => {
    console.log("project Id", projectId);
    try {
      const {projectReleasesDto: releases} = await getReleases(projectId);
      console.log("release", releases);
    }
    catch (error){
      console.error("Error getting releases:", error);
    }
    if(isDev){
      // TODO: 릴리즈 수정 부분
      navigate(PATH.RELEASE, {state: {projectId: projectId, projectTitle: projectTitle}})
    }
    else {
      navigate(PATH.RELEASE, {state: {projectId: projectId, projectTitle: projectTitle}})
    }
  }

  return (
    <Container>
      {projects !== null &&
        projects.map((project, index) => (
        <SidebarContainer key={index}>
          <SidebarItem onClick={() => handleProjectClick(index, project.id)}>
            {project.title}
            <SidebarArrow>{activeProject === index ? "-" : "+"}</SidebarArrow>
          </SidebarItem>
          {activeProject === index && (
            <SubMenuContainer>
              {categories !== null &&
                categories.map((category, subIndex) => (
                <SubMenuItem key={subIndex} onClick={handleCategoryClick}>{category.title}</SubMenuItem>
              ))}
              <SubMenuItem onClick={() =>handleReleaseClick(project.id, project.title)}>Release Note</SubMenuItem>
            </SubMenuContainer>
          )}
        </SidebarContainer>
      ))}
      {isDev && <BottomContainer> 
        <CompanySetting src={setting} onClick={()=>navigate(PATH.COMPANYMANAGE)}/>
        <Button title="프로젝트 생성하기" theme="blue" width="12.68rem" onClick={handleButtonClick}/>
      </BottomContainer>}
    </Container>
  );
}
