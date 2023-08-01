import React from "react";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Home from "./pages/home";
import Sidebar from "./components/Sidebar/CompanySide";
import MainLayout from "./components/Layout/MainLayout";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Outlet,
  useNavigate,
} from "react-router-dom";
import HomeLayout from "./components/Layout/HomeLayout";
import DevLayout from "./components/Layout/DevLayout";
import Company from "./pages/company";
import MarkDown from "./pages/company/markdown";
import ProjectCreate from "./pages/company/ProjectCreate";
import MyCompanies from "./pages/company/myCompanies";
import MyProjects from "./pages/company/myProjects";

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
        </Route>
        <Route element={<DevLayout />}>
          <Route path="/companies/member/companies" element={<MyCompanies />} />
          <Route path="/companies/company_id/projects" element={<MyProjects />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
