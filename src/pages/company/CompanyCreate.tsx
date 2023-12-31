import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import {useState} from "react"
import { CategoryTitle, Title1 } from "../../components/Text/Title";
import toggleOff from "../../img/ri_toggle-line.png"
import toggleOn from "../../img/ri_toggle-fill.png"
import COLORS from "../../constants/color";
import LogoContainer from "../../components/AddFile";
import AddFile from "../../components/AddFile";
import { createCompany } from "../../api/company";
import { useNavigate } from "react-router";
import PATH from "../../constants/path";

export default function CompanyCreate() {
    const [companyName, setCompanyName] = useState("");
    const [companyImgFile, setCompanyImgFile] = useState<string | null>(null);
    const navigate = useNavigate();
    const defaultImgUrl = "https://doklib.s3.ap-northeast-2.amazonaws.com/company/default";

    const handleChangeName = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setCompanyName(e.target.value);
    }

    const handleAddFile = (img: string) => { //AddFile에서 imgfile 형식으로 받아옴
      setCompanyImgFile(img)
    }

    const handleCreate = () => {
        const formData = new FormData();
        const companyImgFileOptional = companyImgFile === null ? defaultImgUrl : companyImgFile;
        formData.append('image', companyImgFileOptional);
        formData.append('name', companyName);

        const createMyCompany = async () => {
          try {
            const data = await createCompany(formData);
            console.log("create company", data);
            navigate(PATH.MYCOMPANY);
          } catch (error) {
            console.error("Error creating company:", error);
          }
        };
        createMyCompany();
    }

    const handleBack = () => {
      navigate(-1);
    }

  return (
    <Container>
      <MainContainer>
        <CompanyCreateTitle>회사 생성하기</CompanyCreateTitle>
        <CategoryContainer>
            <CategoryTitle1>회사명</CategoryTitle1>
            <Input value={companyName} onChange={handleChangeName}></Input>
        </CategoryContainer>
        <CategoryContainer>
            <CategoryTitle1>회사 로고</CategoryTitle1>
            <AddFile onImageUpload={handleAddFile}/>
        </CategoryContainer>
        <ButtonContainer>
          <Button1 title="취소하기" onClick={handleBack}></Button1>
          <Button title="생성하기" theme="blue" onClick={handleCreate}></Button>
        </ButtonContainer>
      </MainContainer>
    </Container>
  );
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MainContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 3.31rem;
`;

export const CategoryContainer = styled.div`
display: flex;
flex-direction: row;
// align-items: center;
margin-bottom: 2rem;
`;

export const CompanyCreateTitle = styled(Title1)`
  margin-bottom: 4.69rem;
`;

export const CategoryTitle1 = styled(CategoryTitle)`
  min-width: 12rem;
  margin-top: 0.4rem;
`;

export const CategoryTitle2 = styled(CategoryTitle)`
  min-width: 12rem;
  margin-bottom: 18.5rem;
`;

// export const LogoContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     min-width: 35rem;
// `

// export const AddButton = styled.div`
// display: flex;
//   justify-content: center;
//   align-items: center;
//     width: 7.3rem;
//     height: 2.6rem;
//     color: #000;
// font-family: Inter;
// font-size: 1.2rem;
// font-style: normal;
// font-weight: 400;
// line-height: normal;
// border: 0.1rem solid ${COLORS.GREY[600]};
// margin-bottom: 0.88rem;
// `
// export const AddContainer = styled.div`
// min-width: 35rem;
// width: 35rem;
// height: 17.625rem;
// border-radius: 0.625rem;
// border: 0.1rem solid ${COLORS.GREY[300]};
// `;

export const ButtonContainer = styled.div`
  display: flex;
    align-self: flex-end;
  margin-top: 3rem;
`;

export const Button1 = styled(Button)`
    margin-right: 1.88rem;
`

