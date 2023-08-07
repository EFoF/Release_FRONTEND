import styled from "styled-components";
import COLORS from "../../constants/color";
import React, { useState } from "react";

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 35rem;
`;

const AddButton = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-family: Inter;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 0.88rem;
  // cursor: pointer;
  // border: 0.1rem solid ${COLORS.GREY[600]};
  // width: 7.3rem;
  // height: 2.6rem;
`;

const AddContainer = styled.img`
  // min-width: 35rem;
  width: 24rem;
  height: 24rem;
  border-radius: 0.625rem;
  border: 0.1rem solid ${COLORS.GREY[100]};
`;

interface AddfileProps {
  onImageUpload?: (imageFile: File) => void;
}
 
export default function AddFile({onImageUpload}: AddfileProps) {
  // TODO: 회사 관리에서 이전 이미지 가져오는 로직 추가해야 - addfile 파라미터로? 
  const [imageSrc, setImageSrc]: any = useState(null); 

    const onUpload = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        if(onImageUpload) {
          // const imageUrl = URL.createObjectURL(file) //로컬에서의 이미지 url - 수정의 여지 
          onImageUpload(file) //부모에 file 넘김 
        }

        return new Promise<void>((resolve) => { 
            reader.onload = () => {	
                setImageSrc(reader.result || null); // 미리보기 위한 
                resolve();
            };
        });
        
    }

  return (
    <LogoContainer>
      <AddButton type="file" accept="image/*" onChange={onUpload}/>
      <AddContainer src={imageSrc}></AddContainer>
    </LogoContainer>
  );
}
