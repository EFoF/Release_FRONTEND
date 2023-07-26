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
  padding-bottom: 4.3rem;
`;

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout() {
  return (
    <Full>
      <Header />
      <Inner>
        <Outlet />
      </Inner>
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
