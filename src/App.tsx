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
import Company from "./pages/company";
import MarkDown from "./pages/company/markdown";
import ProjectCreate from "./pages/company/ProjectCreate";
import ProjectEdit from "./pages/project";

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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
