import React, { ReactNode } from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import Home from "../../img/ant-design_home-outlined.png"
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
  min-height: calc(100vh - 4.3125rem); //footer 높이
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

const HomeImg = styled.img`
  width: 3rem;
`

export default function HomeLayout() {
  return (
    <Full>
      <Header isDev={false}/>
      <Inner>
        <Outlet />
      </Inner>
      <FloatingHomeButton>
        <HomeImg src={Home} />
      </FloatingHomeButton>
      <Footer />
    </Full>
  );
}

