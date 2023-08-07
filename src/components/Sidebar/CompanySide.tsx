import React, { useState } from "react";
import styled from "styled-components";
import "../../styles/font.css";
import setting from "../../img/setting1.png"
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import PATH from "../../constants/path";

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

export default function CompanySide() {
  const [projects, setProjects] = useState([
    {
      name: "Kakao i Acoount",
      subMenu: ["개발 프로세스", "API", "부록"],
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

  const navigate = useNavigate();
  const [activeProject, setActiveProject] = useState(null);

  const handleProjectClick = (index: any) => {
    setActiveProject(activeProject === index ? null : index);
  };

  const handleButtonClick = () => {
    navigate(PATH.PROJECTCREATE)
  }

  const handleReleaseClick = () => {
    navigate(PATH.RELEASE)
  }

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
              <SubMenuItem onClick={handleReleaseClick}>Release Note</SubMenuItem>
            </SubMenuContainer>
          )}
        </SidebarContainer>
      ))}
      <BottomContainer>
        <CompanySetting src={setting}/>
        <Button title="프로젝트 생성하기" theme="blue" width="12.68rem" onClick={handleButtonClick}/>
      </BottomContainer>
    </Container>
  );
}
