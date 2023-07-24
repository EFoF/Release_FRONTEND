import styled from "styled-components";
import backImg from "../../img/Rectangle 36.png";
import eagle from "../../img/icon-park-outline_eagle.png";
import COLORS from "../../constants/color";
import search from "../../img/material-symbols_search.png";

export default function Home() {
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
    </Containers>
  );
}

export const Containers = styled.div`
  width: 100%;
  height: 100%;
  overflow: visible;
  padding-top: 5.56rem; //나중에 inner에 넣어줘야함
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