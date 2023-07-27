import styled from "styled-components";
import backImg from "../../img/Rectangle 36.png";
import eagle from "../../img/icon-park-outline_eagle.png";
import COLORS from "../../constants/color";
import search from "../../img/material-symbols_search.png";
import naver from "../../img/naver.png";
import { useNavigate } from "react-router-dom";
import PATH from "../../constants/path";

export default function Home() {
  const companies = [
    { name: "Company 111111111", imageUrl: eagle },
    { name: "Company 2", imageUrl: naver },
    { name: "Company 3", imageUrl: backImg },
    { name: "Company 4", imageUrl: eagle },
    { name: "Company 5", imageUrl: naver },
    { name: "Company 6", imageUrl: backImg },
    { name: "Company 2", imageUrl: naver },
    { name: "Company 111111111", imageUrl: eagle },
    { name: "Company 2", imageUrl: naver },
    { name: "Company 3", imageUrl: backImg },
    { name: "Company 4", imageUrl: eagle },
    { name: "Company 5", imageUrl: naver },
    { name: "Company 6", imageUrl: backImg },
    { name: "Company 2", imageUrl: naver },
    { name: "Company 111111111", imageUrl: eagle },
    { name: "Company 2", imageUrl: naver },
    { name: "Company 3", imageUrl: backImg },
    { name: "Company 4", imageUrl: eagle },
    { name: "Company 5", imageUrl: naver },
    { name: "Company 6", imageUrl: backImg },
    { name: "Company 2", imageUrl: naver },
  ];

  const navigate = useNavigate();

  const handleCompanyClick = () => {
    navigate(PATH.COMPANY)
  }

  return (
    <Containers>
      <HomeContainer>
        <ServiceName>독수리 플랫폼</ServiceName>
        <MainInputContainer>
          <MainInput placeholder="회사명을 검색해보세요"></MainInput>
          <SearchButton>
            <SearchIcon src={search} />
          </SearchButton>
        </MainInputContainer>
      </HomeContainer>
      <CompanyContainer>
        <CompanyListContainer>
          {companies.map((company, index) => (
            <CompanyCard key={index} onClick={handleCompanyClick}>
              <CompanyImage src={company.imageUrl} alt={company.name} />
              <CompanyName>{company.name}</CompanyName>
            </CompanyCard>
          ))}
        </CompanyListContainer>
      </CompanyContainer>
    </Containers>
  );
}

export const Containers = styled.div`
  width: 100%;
  height: 100%;
  overflow: visible;
`;

export const HomeContainer = styled.div`
  width: 100%;
  height: 23rem;
  background-image: url("${backImg}");
  background-repeat: no-repeat;
  background-size: cover; /* 이미지가 컨테이너에 맞게 크기 조정됨 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ServiceName = styled.h1`
  color: #fff;
  font-family: Inter;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 1.63rem;
`;

export const MainInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const MainInput = styled.input`
  width: 52.5rem;
  height: 4.25rem;
  flex-shrink: 0;
  border-radius: 1.875rem;
  border: 1px solid rgba(0, 0, 0, 0.7);
  background: #fff;
  padding: 2rem 0 2rem 2rem;
`;

export const SearchButton = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  margin-left: -4.25rem; /* 버튼을 인풋 안으로 이동시키기 위해 음수 값으로 마진을 설정합니다. */
`;

export const SearchIcon = styled.img`
  width: 3rem;
  height: 3rem;
`;

/////////////////////
export const CompanyContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 4.75rem;
  justify-content: center;
`;

export const CompanyListContainer = styled.div`
  display: flex;
  width: 60%;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const CompanyCard = styled.div`
    flex: 0 0 calc(25% - 1rem); /* 한 줄에 최대 4개 요소, 간격을 제외한 너비 설정 */
    margin: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 3.8rem;
    cursor: pointer;
`;

export const CompanyImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 1.25rem;
`;

export const CompanyName = styled.div`
margin-top: 1.38rem;
color: #000;
font-family: Inter;
font-size: 1.625rem;
font-style: normal;
font-weight: 400;
line-height: normal;
`;
// export const CompanyContainer = styled.div`
//   display: flex;
//   width: 100%;
//   margin-top: 4.75rem;
//   justify-content: center;
// `;

// export const CompanyListContainer = styled.div`
//   display: flex;
//   width: 60%;
//   flex-wrap: wrap;
//   justify-content: flex-start;
// `;

// export const CompanyCard = styled.div`
// //   flex-basis: calc(25% - 6rem);
// //   max-width: 200px;
//   margin-bottom: 3.8rem;
//   display: flex;
//   flex-direction: column;
//   //   justify-content: center;
//   align-items: center;
//    flex-basis: 25%; /* 각 요소들이 부모의 25% 너비를 가집니다. */
//   flex-grow: 1; /* 요소들이 가능한 최대한의 너비를 확장합니다. */
//   box-sizing: border-box;
// `;

// export const CompanyImage = styled.img`
//   width: 5rem;
//   height: 5rem;
//   border-radius: 1.25rem;
// `;

// export const CompanyName = styled.div`
//   text-align: center;
//   margin-top: 1.35rem;
// `;
