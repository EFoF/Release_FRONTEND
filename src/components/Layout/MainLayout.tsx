import React, { ReactNode } from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Outlet,
  useNavigate,
} from "react-router-dom";
import Sidebar from "../Sidebar";

export const Full = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Inner = styled.div`
  width: 100%;
  display: flex;
  // position: relative; // 이의 존재이유
  padding-top: 5.56rem; // header, footer 높이만큼 padding 설정, 이후 사이드바 고려
  padding-bottom: 4.3rem;
  flex-direction: row;
`;

export const FloatingHomeButton = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  margin-bottom: 4rem;
  background-color: #007bff;
  color: white;
  padding: 1rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
`;


export default function MainLayout() {
  return (
    <Full>
      <Header />
      <Inner>
        <Sidebar />
        <Outlet />
      </Inner>
      <FloatingHomeButton>홈</FloatingHomeButton>
      <Footer />
    </Full>
  );
}


// interface MainLayoutProps {
//   children: ReactNode;
// }

// export default function MainLayout({ children }: MainLayoutProps) {
//   return (
//     <Full>
//       <Header />
//       <Inner>{children}</Inner>
//       <Footer />
//     </Full>
//   );
// }
