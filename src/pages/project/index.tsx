import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import {useState} from "react"
import pencil from "../../img/pencil.png";
import minus from "../../img/minus.png";
import {Title1, Title2} from "../../components/Text/Title";
import {Container1} from "../../components/Container";

interface EditButtonProps {
    imageUrl: string;
}
export default function Company() {
  const categories = [
        {name: "개발 프로세스", intro: "카카오 i 서비스 시스템에서 카카오 i 계정(Kakao i Account)은 카카오 i 계정을 기반으로 제공되는 다양한 카카오 i 서비스들(카카오워크, 카카오 i 클라우드 등)과 연동하여 사용자 인증/권한 관리 등과 같은 통합 계정 관리와 계정의 생성, 변경, 삭제와 같은 계정의 라이프 사이클을 관리하고 리소스 접근에 대한 권한을 제어합니다."},
        {name: "API", intro: "카카오 i 플랫폼과 연동하여 다양한 IoT 디바이스에서 AI 음성 서비스를 활용할 수 있도록 개발에 필요한 기본적인 개념 및 상세 설명을 제공합니다. 카카오 i 플랫 서비스를 활용할 수 있도록 개발에 필요한 기본적인 개념 및 상세 설명을 제공합니다. "},
        {name: "부록", intro: "카카오 i 계정 서비스를 좀 더 편리하게 사용할 수 있도록 관리자 서비스 페이지를 제공합니다.        "},
  ]
  const [inputValue, SetInputValue] = useState("");

  return (
    <Container>
      <CompanyContainer>
        <CompanyName>Kakao i Account</CompanyName>
        <CompanyIntro> 
            카카오 i 서비스 시스템(Kakao i Service System)은 카카오 i 서비스의 백엔드 체계를 나타내며, 카카오 i 계정, 카카오워크, 카카오 i 클라우드 등의 여러 ‘카카오 i 서비스’들과 이들의 계정을 상호 연동해주는 ‘Adapter 서버’로 구성됩니다.
        </CompanyIntro>
      </CompanyContainer>
        <DetailContainer>
          <CategoryContainers>
            {categories.map((category, index)=>(
                <CategoryContainer>
                    <EditCategoryContainer>
                        <CategoryName>{category.name}</CategoryName>
                        <ButtonContainer>
                            <EditButton imageUrl={pencil}></EditButton>
                            <EditButton imageUrl={minus}></EditButton>
                        </ButtonContainer>
                    </EditCategoryContainer>
                    <CategoryIntro>
                        {category.intro}
                    </CategoryIntro>
                </CategoryContainer>
            ))}
          </CategoryContainers>
        </DetailContainer>

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
`;

export const EditCategoryContainer = styled.div`
    display: flex;
  flex-direction: row;
`
export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 3rem;
`

export const EditButton = styled.div<EditButtonProps>`
  background-image: url(${props => props.imageUrl});
  background-repeat: no-repeat;
  background-size: contain;
  width: 24px;
  height: 24px;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;