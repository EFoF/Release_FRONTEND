import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainLayout from "./components/Layout/MainLayout";
import HomeLayout from "./components/Layout/HomeLayout";
import PATH from "./constants/path";

const Home = lazy(() => import("./pages/home"));
const ProjectCreate = lazy(() => import("./pages/company/ProjectCreate"));
const ProjectEdit = lazy(() => import("./pages/project/ProjectEdit"));
const ProjectManage = lazy(() => import("./pages/project/ProjectManage"));
const MyCompanies = lazy(() => import("./pages/company/myCompanies"));
const MyProjects = lazy(() => import("./pages/company/myProjects"));
const ReleaseCreate = lazy(() => import("./pages/release/ReleaseCreate"));
const NoCompany = lazy(() => import("./pages/company/NoCompany"));
const NoProject = lazy(() => import("./pages/company/NoProject"));
const CompanyManage = lazy(() => import("./pages/company/CompanyManage"));
const Member = lazy(() => import("./pages/member"));
const PasswordChange = lazy(() => import("./pages/member/passwordChange"));
const Withdrawal = lazy(() => import("./pages/member/withdrawal"));
const CompanyCreate = lazy(() => import("./pages/company/CompanyCreate"));
const CategoryCreate = lazy(() => import("./pages/category/CategoryCreate"));
const Release = lazy(() => import("./pages/release"));
const Login = lazy(() => import("./pages/login"));
const Signup = lazy(() => import("./pages/signup"));
const Company = lazy(() => import("./pages/company"));
const Category = lazy(() => import("./pages/category"));

const queryClient = new QueryClient(); //쿼리 인스턴스 생성 (react-query)

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
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
              <Route path={PATH.NOPROJECT} element={<NoProject isDev />} />
              <Route path={PATH.MYCOMPANY} element={<MyCompanies />} />
              <Route path={PATH.MYPROJECT} element={<MyProjects />} />
              <Route path={PATH.MYINFO} element={<Member />} />
              <Route path={PATH.PASSWORDCHANGE} element={<PasswordChange />} />
              <Route path={PATH.WITHDRAWAL} element={<Withdrawal />} />
              <Route path={PATH.PROJECTMANAGE} element={<ProjectManage />} />
              <Route path={PATH.COMPANYMANAGE} element={<CompanyManage />} />
              <Route path={PATH.RELEASE} element={<Release />} />
              <Route path={PATH.CATEGORY} element={<Category />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
