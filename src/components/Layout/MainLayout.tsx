import React, { ReactNode, useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import Home from "../../img/ant-design_home-outlined.png";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Outlet,
  useNavigate,
} from "react-router-dom";
import CompanySide from "../Sidebar/CompanySide";
import PATH from "../../constants/path";
import MySide from "../Sidebar/MySide";

export const Full = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Inner = styled.div`
  width: 100%;
  display: flex;
  padding-top: 5.56rem; // header 높이만큼 padding 설정, 이후 사이드바 고려
  flex-direction: row;
  min-height: calc(100vh - 4.3125rem); // footer 높이
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
`;

const OutletWithFooter = styled.div`
  // flex: 1;
  position: relative;
  width: 100%;
`;

export default function MainLayout() {
  const [isCompanyBool, setIsCompanyBool] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname);

  useEffect(() => {
    if (location.pathname === "/company") {
      setIsCompanyBool(true);
    }
  }, []);
  console.log("isCompanyBool", isCompanyBool);

  const handleFloatingClick = () => {
    navigate(PATH.HOME);
  };

  return (
    <Full>
      <Header isDev={false} isCompany={isCompanyBool} />
      <Inner>
        <CompanySide /> {/*<MySide />*/}
        <OutletWithFooter>
          <Outlet /> 
          <Footer /> 
        </OutletWithFooter>
      </Inner>
      <FloatingHomeButton onClick={handleFloatingClick}>
        <HomeImg src={Home} />
      </FloatingHomeButton>
    </Full>
  );
}







// import React, { ReactNode, useState, useEffect } from "react";
// import styled from "styled-components";
// import Header from "./Header";
// import Footer from "./Footer";
// import Home from "../../img/ant-design_home-outlined.png";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   useLocation,
//   Outlet,
//   useNavigate,
// } from "react-router-dom";
// import CompanySide from "../Sidebar/CompanySide";
// import PATH from "../../constants/path";
// import MySide from "../Sidebar/MySide";

// export const Full = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// export const Inner = styled.div`
//   width: 100%;
//   display: flex;
//   padding-top: 5.56rem; // header, footer 높이만큼 padding 설정, 이후 사이드바 고려
//   flex-direction: row;
//   min-height: calc(100vh - 4.3125rem); //footer 높이
//   // flex: 1;
//   // padding-bottom: 4.3rem;
//   // position: relative; // 이의 존재이유?
// `;

// export const FloatingHomeButton = styled.div`
//   position: fixed;
//   bottom: 1.5rem;
//   right: 1.5rem;
//   margin-bottom: 4rem;
//   background-color: #007bff;
//   color: white;
//   padding: 1rem;
//   border-radius: 50%;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 1.5rem;
//   box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
// `;

// const HomeImg = styled.img`
//   width: 3rem;
// `;

// export default function MainLayout() {
//   const [isCompanyBool, setIsCompanyBool] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   console.log(location.pathname);

//   useEffect(() => {
//     if (location.pathname === "/company") {
//       setIsCompanyBool(true);
//     }
//   }, []);
//   console.log("isCompanyBool", isCompanyBool);

//   const handleFloatingClick = () => {
//     navigate(PATH.HOME);
//   };

//   return (
//     <Full>
//       <Header isDev={false} isCompany={isCompanyBool} />
//       <Inner>
//         <MySide /> 
//         <Outlet />
//       </Inner>
//       <FloatingHomeButton onClick={handleFloatingClick}>
//         <HomeImg src={Home} />
//       </FloatingHomeButton>
//       <Footer />
//     </Full>
//   );
// }

// // interface MainLayoutProps {
// //   children: ReactNode;
// // }

// // export default function MainLayout({ children }: MainLayoutProps) {
// //   return (
// //     <Full>
// //       <Header />
// //       <Inner>{children}</Inner>
// //       <Footer />
// //     </Full>
// //   );
// // }
