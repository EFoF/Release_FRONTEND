import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/home";
import MainLayout from "./components/Layout/MainLayout";
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import HomeLayout from "./components/Layout/HomeLayout";
import DevLayout from "./components/Layout/DevLayout";
import Company from "./pages/company";
import MarkDown from "./pages/company/markdown";
import ProjectCreate from "./pages/company/ProjectCreate";
import ProjectEdit from "./pages/project/ProjectEdit";
import ProjectManage from "./pages/project/ProjectManage";
import MyCompanies from "./pages/company/myCompanies";
import MyProjects from "./pages/company/myProjects";
import ReleaseCreate from "./pages/release/ReleaseCreate";
import NoCompany from "./pages/company/NoCompany";
import NoProject from "./pages/company/NoProject";
import CompanyManage from "./pages/company/CompanyManage";
import Member from "./pages/member";
import PasswordChange from "./pages/member/passwordChange";
import Withdrawal from "./pages/member/withdrawal";
import CompanyCreate from "./pages/company/CompanyCreate";
import CategoryCreate from "./pages/category/CategoryCreate";
import Release from "./pages/release";
import PATH from "./constants/path";
import Login from "./pages/login";
import Signup from "./pages/signup";

const queryClient = new QueryClient();	//쿼리 인스턴스 생성 (react-query)

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path={PATH.COMPANYMAIN} element={<Company />} />
            <Route path={PATH.RELEASECREATE} element={<ReleaseCreate />} />
            <Route path={PATH.PROJECTCREATE} element={<ProjectCreate />} />
            <Route path={PATH.COMPANYCREATE} element={<CompanyCreate />} />
            <Route path={PATH.CATEGORYEDIT} element={<CategoryCreate />} />
            <Route path={PATH.PROJECTEDIT} element={<ProjectEdit />} />
            <Route path={PATH.NOCOMPANY} element={<NoCompany />} />
            <Route path={PATH.NOPROJECT} element={<NoProject />} />
            <Route path={PATH.MYCOMPANY} element={<MyCompanies />} />
            <Route path={PATH.MYPROJECT} element={<MyProjects />} />
            <Route path={PATH.MYINFO} element={<Member />} />
            <Route path={PATH.PASSWORDCHANGE} element={<PasswordChange />} />
            <Route path={PATH.WITHDRAWAL} element={<Withdrawal />} />
            <Route path={PATH.PROJECTMANAGE} element={<ProjectManage />} />
            <Route path={PATH.COMPANYMANAGE} element={<CompanyManage />} />
            <Route path={PATH.RELEASE} element={<Release />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
