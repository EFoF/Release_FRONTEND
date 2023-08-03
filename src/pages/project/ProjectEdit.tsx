import styled from "styled-components";
import Button from "../../components/Button";
import React, {useEffect, useState} from "react"
import pencil from "../../img/pencil.png";
import minus from "../../img/minus.png";
import plus from "../../img/plus.png";
import check from "../../img/check.png";
import clear from "../../img/clear.png";
import {Title1, Title2} from "../../components/Text/Title";
import {Container1} from "../../components/Container";
import { Toggle } from "typescript-toggle";
import ConfirmationModal from "../../components/Modal";

interface EditButtonProps {
    imageUrl: string;
    width: number;
    height: number;
}

interface Category {
    id : number;
    title: string;
    description: string;
}

interface CategoryData {
    categoryEachDtoList: Category[];
}

interface Project {
    title: string;
    description: string;
    scope: boolean;
}

export default function ProjectEdit() {
  const [isEditMode, setIsEditMode] = useState<Boolean[]>([]);
  const [isTitleEdit, setIsTitleEdit] = useState<Boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<Number>();
  const [project, setProject] = useState<Project>(
      {
          "description": "카카오 i 서비스 시스템에서 카카오 i 계정(Kakao i Account)은 카카오 i 계정을 기반으로 제공되는 다양한 카카오 i 서비스들(카카오워크, 카카오 i 클라우드 등)과 연동하여 사용자 인증/권한 관리 등과 같은 통합 계정 관리와 계정의 생성, 변경, 삭제와 같은 계정의 라이프 사이클을 관리하고 리소스 접근에 대한 권한을 제어합니다.",
          "scope": true,
          "title": "Owen-Choi Project"
      }
  )
  const [categories, setCategories] = useState<CategoryData>(
      {
          categoryEachDtoList: [
              {
                  id: 1,
                  title: "test category",
                  description: "test category description"
              },
              {
                  id: 2,
                  title: "test category",
                  description: "test category description"
              },
              {
                  id: 3,
                  title: "test category",
                  description: "test category description"
              }
          ]
      }
  )


  const [inputValue, SetInputValue] = useState("");

  const handleCategoryEditClick = (index:number) => {
      const updatedList = [...isEditMode];
      updatedList[index] = !updatedList[index];
      setIsEditMode(updatedList);
  }

  const handleTitleEditClick = () => {
      setIsTitleEdit(!isTitleEdit);
  }

  const handleRemoveButton = (index:number) => {
      setIsModalOpen(true);
      // 몇번째 인덱스의 리스트를 지울지 따로 저장해줘야 함
      setIndex(index);
  }

    const handleModalCancel = () => {
        // 모달 닫기
        setIsModalOpen(false);
    };

    const handleModalConfirm = () => {
        // TODO: 인덱스에 해당하는 카테고리 지우고 디비에 반영
        // JSON 데이터 수정
        setCategories((categories) => ({
            ...categories,
            categoryEachDtoList : categories.categoryEachDtoList.filter(
                (category, categoryIndex) => categoryIndex !== index
            )
        }))
        // 모달 닫기
        setIsModalOpen(false);
    };

  useEffect(() => {
        const newBooleanList = new Array(categories.categoryEachDtoList.length).fill(false);
        setIsEditMode(newBooleanList);
  }, [categories])

  return (
    <Container>
        <Scope>
          <CompanyContainer>
              <EditContainer>
                  <CompanyName>{project.title}</CompanyName>
                  {isTitleEdit ?
                      (<EditButtonContainer>
                          <EditButton imageUrl={check} width={24} height={24} onClick={handleTitleEditClick} />
                          <EditButton imageUrl={clear} width={24} height={24} onClick={handleTitleEditClick} />
                      </EditButtonContainer>) :
                      <EditButton imageUrl={pencil} width={24} height={24} onClick={handleTitleEditClick}></EditButton>
                  }
              </EditContainer>
            <CompanyIntro>
                {project.description}
            </CompanyIntro>
          </CompanyContainer>
            <ToggleContainer>
                <EditContainer>
                    <ScopeText>
                        공개 여부
                    </ScopeText>
                    <Toggle isOn={project.scope} handleChange={() => setProject((project) => ({
                        ...project,
                        scope: !project.scope
                    }))}/>
                </EditContainer>
            </ToggleContainer>
        </Scope>
        <ButtonContainer>
            <Button1 title="프로젝트 관리"></Button1>
            <Button1 title="Release Note"></Button1>
        </ButtonContainer>
        <DetailContainer>
          <CategoryContainers>
            {categories.categoryEachDtoList.map((category, index)=>(
                <CategoryContainer>
                    <EditContainer>
                            <CategoryName>{category.title}</CategoryName>
                        {!isEditMode[index] ? (
                            <EditButtonContainer>
                                <EditButton imageUrl={pencil} width={24} height={24} onClick={()=>handleCategoryEditClick(index)} />
                                <EditButton imageUrl={minus} width={24} height={24} onClick={()=>handleRemoveButton(index)}/>
                            </EditButtonContainer>
                        ) : (
                            <EditButtonContainer>
                                <EditButton imageUrl={check} width={24} height={24} onClick={()=>handleCategoryEditClick(index)} />
                                <EditButton imageUrl={clear} width={24} height={24} onClick={()=>handleCategoryEditClick(index)} />
                            </EditButtonContainer>
                        )}
                    </EditContainer>
                    <CategoryIntro>
                        {category.description}
                    </CategoryIntro>
                </CategoryContainer>
            ))}
              <CategoryContainer>
                  <CenteredContent>
                    <EditButton imageUrl={plus} width={57} height={57}/>
                  </CenteredContent>
              </CategoryContainer>
          </CategoryContainers>
        </DetailContainer>
        <ConfirmationModal isOpen={isModalOpen} onCancel={handleModalCancel} onConfirm={handleModalConfirm}
                           message={"삭제하시겠습니까?"}/>
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
  margin-left: 5rem;
  width: 80rem;
  height: 20rem;

`;

export const CompanyName = styled(Title1)`

`;

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
  //margin-left: 5rem;
`;

export const CategoryName = styled(Title2)`
    
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
  margin-top: 3rem;
  margin-left: 70rem;
  margin-bottom: 3rem;
`;

export const Button1 = styled(Button)`
    margin-right: 1.88rem;
  width: 13rem;
  height: 7rem;
`

export const Scope = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 3rem;
`;

export const ToggleContainer = styled.div`
  margin-top: 3rem;
  margin-left: 10rem;
`;

export const ScopeText = styled.h3`
  font-family: S-medium;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-right: 1.5rem;
  display: flex;
  align-items: center; /* 수직 가운데 정렬 */
`;

export const CenteredContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;