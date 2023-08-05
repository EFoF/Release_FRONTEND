const PATHHEADER = {
  MYPAGE: "/mypage",
  COMPANY: "/company",
  DEV: "/dev",
}

const PATH = {
    LOGIN: "/login",
    SIGNUP: "/signup",
    HOME: "/",
    PROJECTCREATE: `${PATHHEADER.DEV}/project-create`,
    NOPROJECT: `${PATHHEADER.DEV}/noproject`,
    COMPANYMANAGE: `${PATHHEADER.DEV}/company-manage`,
    PROJECTMANAGE: `${PATHHEADER.DEV}/project-manage`,
    RELEASECREATE: `${PATHHEADER.DEV}/release-create`,
    CATEGORYEDIT: `${PATHHEADER.DEV}/category-edit`,
    PROJECTEDIT: `${PATHHEADER.DEV}/project-edit`,
    COMPANYMAIN: `${PATHHEADER.COMPANY}`,
    RELEASE: `${PATHHEADER.COMPANY}/`,
    CATEGORY: `${PATHHEADER.COMPANY}/:category`,
    NOCOMPANY: `${PATHHEADER.MYPAGE}/nocompany`,
    COMPANYCREATE: `${PATHHEADER.MYPAGE}/company-create`,
    MYCOMPANY: `${PATHHEADER.MYPAGE}/mycompany`,
    MYPROJECT: `${PATHHEADER.MYPAGE}/myproject`,
    MYINFO: `${PATHHEADER.MYPAGE}/myinfo`,
    PASSWORDCHANGE: `${PATHHEADER.MYPAGE}/password-change`,
    WITHDRAWAL: `${PATHHEADER.MYPAGE}/withdrawal`,
} as const;
  
export default PATH;
  