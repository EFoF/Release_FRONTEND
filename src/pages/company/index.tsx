import styled from "styled-components";
import backImg from "../../img/Rectangle 36.png";
import eagle from "../../img/icon-park-outline_eagle.png";
import COLORS from "../../constants/color";
import search from "../../img/material-symbols_search.png";
import naver from "../../img/naver.png";

export default function Company() {
  const categories = [
    {name: "개발 프로세스", intro: "카카오 i 플랫 서비스를 활용할 수 있도록 개발에 필요한 기본적인 개념 및 상세 설명을 제공합니다."},
    {name: "API", intro: "카카오 i 플랫폼과 연동하여 다양한 IoT 디바이스에서 AI 음성 서비스를 활용할 수 있도록 개발에 필요한 기본적인 개념 및 상세 설명을 제공합니다."},
  ]

  return (
    <Container>
      <CompanyContainer>
        <CompanyName>Kakao i Account </CompanyName>
        <CompanyIntro> 
            인공지능(AI), 클라우드, 검색 등 오랜 시간 동안 축적한 IT 기업을 지향합니다.
        </CompanyIntro>
      </CompanyContainer>
      
      <CategoryContainer>
        <CategoryName></CategoryName>
        <CategoryIntro>

        </CategoryIntro>
      </CategoryContainer>
      <CategoryContainer>
        <CategoryName></CategoryName>
        <CategoryIntro>
            
        </CategoryIntro>
      </CategoryContainer>
    </Container>
  );
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const CompanyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  margin-left: 3.8rem;
`;

export const CompanyName = styled.div`
color: #000;
font-family: Inter;
font-size: 3rem;
font-style: normal;
font-weight: 600;
line-height: normal;
`;

export const CompanyIntro = styled.div`
color: #000;
font-family: Inter;
font-size: 1.5rem;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CategoryName = styled.div`
  display: flex;
  flex-direction: column;
  color: #000;
font-family: Inter;
font-size: 2.25rem;
font-style: normal;
font-weight: 600;
line-height: normal;
`;

export const CategoryIntro = styled.div`
  display: flex;
  flex-direction: column;
  color: #000;
font-family: Inter;
font-size: 1.5rem;
font-style: normal;
font-weight: 400;
line-height: normal;
`;
