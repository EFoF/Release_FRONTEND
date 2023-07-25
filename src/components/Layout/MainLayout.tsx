import React, { ReactNode } from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

export const Full = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Inner = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  padding-top: 5.56rem; // header, footer 높이만큼 padding 설정, 이후 사이드바 고려
`;

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  <Full>
    <Header />
    <Inner>{children}</Inner>
    <Footer />
  </Full>;
}
