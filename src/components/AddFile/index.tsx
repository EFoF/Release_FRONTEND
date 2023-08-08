import styled from "styled-components";
import COLORS from "../../constants/color";
import React, { useState } from "react";
import ConfirmationModal from "../../components/Modal";

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
`;

const AddContainer = styled.img`
  width: 24rem;
  height: 24rem;
  border-radius: 0.625rem;
  border: 0.1rem solid ${COLORS.GREY[100]};
`;

const DeleteButton = styled.button`
  margin-top: 0.5rem;
  width: 8rem;
`;

interface AddfileProps {
  onImageUpload?: (imageFile: File) => void;
}

export default function AddFile({ onImageUpload }: AddfileProps) {
  const [imageSrc, setImageSrc]: any = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    if (onImageUpload) {
      onImageUpload(file);
    }

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null);
        resolve();
      };
    });
  };

  const onDelete = () => {
    // if (window.confirm("삭제하시겠습니까?")) {
    //   setImageSrc(null);
    // }
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    setImageSrc(null);
    setIsModalOpen(false);
};

const handleModalCancel = () => {
    setIsModalOpen(false);
};

  return (
    <>
    <LogoContainer>
      <AddButton type="file" accept="image/*" onChange={onUpload} />
      {imageSrc && <AddContainer src={imageSrc} />}
      {imageSrc && <DeleteButton onClick={onDelete}>이미지 삭제</DeleteButton>}
    </LogoContainer>
    
    <ConfirmationModal isOpen={isModalOpen}
      onCancel={handleModalCancel}
      onConfirm={handleModalConfirm}
      message={"이미지를 삭제하시겠습니까?"}/>
    </>
  );
}
