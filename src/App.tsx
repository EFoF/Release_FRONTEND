import React from "react";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Home from "./pages/home";
import Sidebar from "./components/Sidebar";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
