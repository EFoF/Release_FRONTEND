import styled from "styled-components";
import React, { useState, useEffect } from "react";
import backImg from "../../img/Rectangle 36.png";
import eagle from "../../img/icon-park-outline_eagle.png";
import kakaoenter from "../../img/kakao-enter.jpg";
import kakaopay from "../../img/kakao-pay.jpg";
import kakaotaxi from "../../img/kakao-taxi.jpg";
import facebook from "../../img/facebook.png";
import kakaonavi from "../../img/kakao-navi.jpg";
import kakaobank from "../../img/kakao-brain.png";
import kakaogames from "../../img/kakao-games.jpg";
import kakaobrain from "../../img/kakao-brain.png";
import COLORS from "../../constants/color";
import search from "../../img/material-symbols_search.png";
import naver from "../../img/naver.png";
import { useNavigate } from "react-router-dom";
import PATH from "../../constants/path";
import "../../styles/font.css";
import { searchCompany } from "../../api/company";
import { useRecoilState } from "recoil";
import { companyIdState } from "../../states/companyState";

interface Company {
  name: string;
  imageUrl: string;
  id: number;
}

export default function Home() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [companyID, setCompanyID] = useRecoilState<number>(companyIdState);

  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState("");

  const handleCompanyClick = (companyId: number) => {
    setCompanyID(companyId);
    navigate(PATH.COMPANYMAIN, {state: companyId});
  };

  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchKey(e.target.value);
  };

  const handleClickSearch = () => {
    const fetchAllCompanies = async () => {
      try {
        const {content} = await searchCompany();
        console.log("companies", content);
        setCompanies(content);
      } catch(error) {
        console.error("Error fetching companies:", error);
      }
    }
    fetchAllCompanies();
  }

  return (
    <Containers>
      <HomeContainer>
        <ServiceName>DOKLIB</ServiceName>
        <MainInputContainer>
          <MainInput
            placeholder="회사명을 검색해보세요"
            value={searchKey}
            onChange={handleInputChange}
          />
          <SearchButton>
            <SearchIcon src={search} onClick={handleClickSearch}/>
          </SearchButton>
        </MainInputContainer>
      </HomeContainer>
      <CompanyContainer>
        <CompanyListContainer>
          {companies
            .filter((c) => c.name.includes(searchKey))
            .map((company, index) => (
              <CompanyCard key={index} onClick={()=>handleCompanyClick(company.id)}>
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

export const ProjectContainer = styled.div`
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

export const ProjectListContainer = styled.div`
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

export const ProjectCard = styled.div`
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

export const ProjectImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 1.25rem;
`;

export const CompanyName = styled.div`
  margin-top: 1.38rem;
  color: #000;
  font-family: S-Regular;
  font-size: 1.625rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const ProjectName = styled.div`
  margin-top: 1.38rem;
  color: #000;
  font-family: S-Regular;
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
