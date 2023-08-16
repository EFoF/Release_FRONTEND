const PATHHEADER = {
  MYPAGE: "/mypage",
  COMPANY: "/company",
  DEV: "/dev",
}

const PATH = {
    HOME: "/",  
    LOGIN: "/login",
    SIGNUP: "/signup",

    COMPANYMAIN: `${PATHHEADER.COMPANY}`, //회사 메인은 자동으로 가장 먼저있는 프로젝트 화면 보여줌 
    RELEASE: `${PATHHEADER.COMPANY}/release`,
    CATEGORY: `${PATHHEADER.COMPANY}/category`,

    PROJECTCREATE: `${PATHHEADER.DEV}/project-create`,
    NOPROJECT: `${PATHHEADER.DEV}/noproject`,
    COMPANYMANAGE: `${PATHHEADER.DEV}/company-manage`,
    PROJECTMANAGE: `${PATHHEADER.DEV}/project-manage`,
    RELEASECREATE: `${PATHHEADER.DEV}/release-create`,
    CATEGORYEDIT: `${PATHHEADER.DEV}/category-edit`,
    PROJECTEDIT: `${PATHHEADER.DEV}/project-edit`,

    NOCOMPANY: `${PATHHEADER.MYPAGE}/nocompany`,
    COMPANYCREATE: `${PATHHEADER.MYPAGE}/company-create`,
    MYCOMPANY: `${PATHHEADER.MYPAGE}/mycompany`,
    MYPROJECT: `${PATHHEADER.MYPAGE}/myproject`,
    MYINFO: `${PATHHEADER.MYPAGE}/myinfo`,
    PASSWORDCHANGE: `${PATHHEADER.MYPAGE}/password-change`,
    WITHDRAWAL: `${PATHHEADER.MYPAGE}/withdrawal`,
} as const;
  
export default PATH;
