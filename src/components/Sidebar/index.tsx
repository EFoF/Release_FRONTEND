import React, { useState } from "react";
import styled from "styled-components";
import "../../styles/font.css"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 58.44rem;
  width: 30rem; //20.75rem;
  position: sticky;
  top: 0;
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

`

export default function Sidebar() {
  const [projects, setProjects] = useState([
    {
      name: "Kakao i Acoount",
      subMenu: ["개발 프로세스", "API", "부록", "Release Note"],
    },
    {
      name: "Kakao i Agent",
      subMenu: ["카테고리4", "카테고리5"],
    },
    {
      name: "Kakao i Connect Li",
      subMenu: ["카테고리4", "카테고리5"],
    },
    {
      name: "Kakao i Acoount2",
      subMenu: ["카테고리1", "카테고리2", "카테고리3"],
    },
  ]);

  const [activeProject, setActiveProject] = useState(null);

  const handleProjectClick = (index: any) => {
    setActiveProject(activeProject === index ? null : index);
  };

  return (
    <Container>
      {projects.map((project, index) => (
        <SidebarContainer key={index}>
          <SidebarItem onClick={() => handleProjectClick(index)}>
            {project.name}
            <SidebarArrow>{activeProject === index ? "-" : "+"}</SidebarArrow>
          </SidebarItem>
          {activeProject === index && (
            <SubMenuContainer>
              {project.subMenu.map((item, subIndex) => (
                <SubMenuItem key={subIndex}>{item}</SubMenuItem>
              ))}
            </SubMenuContainer>
          )}
        </SidebarContainer>
      ))}
    </Container>
  );
}
