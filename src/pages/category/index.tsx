import styled from "styled-components";
import Button from "../../components/Button";
import { Title1, Title2 } from "../../components/Text/Title";
import { Container1 } from "../../components/Container";
import markdown from "../company/markdown";
import { useEffect, useRef, useState } from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

const CustomList = ({ children }: any) => (
  <>
    <li style={{ marginLeft: '2rem' }}>{children}</li>
  </>
);

const markdownExample = `
  # 카카오페이 기술지원 담당자
  &nbsp;

  카카오페이는 ***모든 사람을 이롭게 하는 금융 서비스***를 제공한다건 건 다들 아시죠? 카카오페이 기술지원 담당자들은 금융 서비스의 시작부터 끝까지 IT 전문가로서 기술적인 모든 이슈를 해결하는 만능 엔터테이너예요. 😎
  카카오페이에서는 만능 엔터테이너인 기술지원 담당자들을 이렇게 정의하고 있어요.

  &nbsp;
  \nYou can also create [카카오페이 개발자 센터](https://tech.kakaopay.com/post/tam-introduction).

  &nbsp;
  ## Lists

  &nbsp;

  카카오페이 기술지원 담당자의 주요 업무와 역할:
  - 파트너사 관리
  - 시스템 연동 관리
  - 시스템 운영 이슈 대응 및 장애 관리

  &nbsp;

  필수는 아니지만 이런 경험까지 있다면 더 좋아요:
  1. 금융서비스나 핀테크 서비스에 대한 업무 경험이 있으신 분
  2. 서버 개발 또는 클라이언트 개발(앱이나 웹) 경험이 있으신 분
  3. 계정 기반 연동(OAuth 등), 보안규격 통신(TLS인증서), 네트워크 트러블 슈팅(VPN/전용선 등) 경험이 있으신 분
`

export default function Category() {
  const [markdown, setMarkdown] = useState("");

  const components = {
    li: CustomList,
  };

  return (
    <Container>
      <CategoryContainer>
        <CategoryName>카카오페이</CategoryName>
        <CategoryIntro>
          카카오 i 서비스 시스템에서 카카오 i 계정(Kakao i Account)은 카카오 i 계정을 기반으로 제공되는 다양한 카카오 i 서비스들(카카오워크, 카카오 i 클라우드 등)과 연동하여 사용자 인증/권한 관리 등과 같은 통합 계정 관리와 계정의 생성, 변경, 삭제와 같은 계정의 라이프 사이클을 관리하고 리소스 접근에 대한 권한을 제어합니다.
        </CategoryIntro>
      </CategoryContainer>
      <MarkDownPreviewContainer>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{markdown}</ReactMarkdown>
      </MarkDownPreviewContainer>
    </Container>
  );
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 3rem 3.8rem;
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  // margin-top: 3rem;
  // margin-left: 3.8rem;
  width: 80rem;
`;

export const CategoryName = styled.div`
  display: flex;
  flex-direction: column;
  color: #000;
  font-family: S-Bold;
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 1.5rem;
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

export const MarkDownPreviewContainer = styled.div`
  // border: 1px solid #ccc;
  // border-radius: 5px;
  margin-top: 3rem;
  // min-height: 20rem;
  outline: none;
  font-size: 1.6rem;
`;