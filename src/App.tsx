import React from "react";
import Home from "./pages/home";
import MainLayout from "./components/Layout/MainLayout";
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import HomeLayout from "./components/Layout/HomeLayout";
import DevLayout from "./components/Layout/DevLayout";
import Company from "./pages/company";
import MarkDown from "./pages/company/markdown";
import ProjectCreate from "./pages/company/ProjectCreate";
import ProjectManage from "./pages/project/ProjectManage";
import ProjectEdit from "./pages/project";
import MyCompanies from "./pages/company/myCompanies";
import MyProjects from "./pages/company/myProjects";
import NoCompany from "./pages/company/NoCompany";
import NoProject from "./pages/company/NoProject";
import Member from "./pages/member";
import PasswordChange from "./pages/member/passwordChange";
import Withdrawal from "./pages/member/withdrawal";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/markdown" element={<MarkDown />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/company" element={<Company />} />
          <Route path="/company/projectCreate" element={<ProjectCreate />} />
          <Route path="/project/edit" element={<ProjectEdit />} />
          <Route path="/company/nocompany" element={<NoCompany />} />
          <Route path="/company/noproject" element={<NoProject />} />
        </Route>
        <Route element={<DevLayout />}>
          <Route path="/companies/member/companies" element={<MyCompanies />} />
          <Route path="/companies/company_id/projects" element={<MyProjects />} />
          <Route path="/auth/member/info" element={<Member />} />
          <Route path="/auth/member/info/change-password" element={<PasswordChange />} />
          <Route path="/auth/member/info/withdrawal" element={<Withdrawal />} />
          <Route path="/project/projectManage" element={<ProjectManage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
