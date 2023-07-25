import React, { useState } from 'react';
import styled from 'styled-components';

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SidebarArrow = styled.span`
  margin-left: 4px;
`;

const SubMenu = styled.div`
  margin-left: 20px;
`;

export default function Sidebar() {
  const [projects, setProjects] = useState([
    {
      name: '프로젝트1',
      subMenu: ['카테고리1', '카테고리2', '카테고리3'],
    },
    {
      name: '프로젝트2',
      subMenu: ['카테고리4', '카테고리5'],
    },
    {
      name: '프로젝트3',
      subMenu: ['카테고리4', '카테고리5'],
    },
    {
      name: '프로젝트4',
      subMenu: ['카테고리1', '카테고리2', '카테고리3'],
    },
  ]);

  const [activeProject, setActiveProject] = useState(null);

  const handleProjectClick = (index:any) => {
    setActiveProject(activeProject === index ? null : index);
  };

  return (
    <div>
      {projects.map((project, index) => (
        <div key={index}>
          <SidebarItem onClick={() => handleProjectClick(index)}>
            {project.name}
            <SidebarArrow>{activeProject === index ? '⬇' : '>'}</SidebarArrow>
          </SidebarItem>
          {activeProject === index && (
            <SubMenu>
              {project.subMenu.map((item, subIndex) => (
                <div key={subIndex}>{item}</div>
              ))}
            </SubMenu>
          )}
        </div>
      ))}
    </div>
  );
};

