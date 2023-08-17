import React, { FC, useEffect, useState } from "react";
import ReactModal, { Styles } from "react-modal";
import styled from "styled-components";
import { Title1 } from "../Text/Title";
import COLORS from "../../constants/color";
import clear from "../../img/clear.png";
import {uploadImage} from "../../api/category";

interface UploadModalProps {
    isOpen: boolean;
    onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const UploadModal: FC<UploadModalProps> = ({ isOpen, onCancel }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [uploadResult, setUploadResult] = useState<string | null>(null);
    const defaultImgUrl = "https://objectstorage.kr-gov-central-1.kakaoicloud-kr-gov.com/v1/1b55083b5da94de389197c75704231f6/doklib/company/default.png";

    useEffect(() => {
        if (isOpen) {
            setImageSrc(null);
            setUploadResult(null);
        }
    }, [isOpen]);

    const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                const loadedImageSrc = reader.result as string || null;
                setImageSrc(loadedImageSrc);

                if (loadedImageSrc) {
                    const formData = new FormData();
                    formData.append("image", file);

                    uploadImage(formData).then((fetchedData) => {
                        if (fetchedData === defaultImgUrl) {
                            setUploadResult(null);
                        }
                        else {
                            setUploadResult(fetchedData);
                        }
                        console.log("upload success", fetchedData);
                    });
                }
            };
        }
    };

    const onDelete = () => {
        setImageSrc(null);
        setUploadResult(null);
    };

    const handleCloseClick = (event: React.MouseEvent) => {
        onCancel(event as React.MouseEvent<HTMLButtonElement, MouseEvent>);
    };

    const copyToClipboard = async (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        if (uploadResult) {
            try {
                await navigator.clipboard.writeText(uploadResult);
                alert("링크가 클립보드에 복사되었습니다.");
            } catch (err) {
                console.error("복사 실패", err);
            }
        }
    };

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onCancel} style={modalStyle}>
            <ModalContainer>
                <CloseButton src={clear} onClick={handleCloseClick} />
                <InfoTitle>이미지를 업로드하세요</InfoTitle>
                <ImageContainer>
                    <AddButton type="file" accept="image/*" onChange={onUpload} />
                    {imageSrc && <AddContainer src={imageSrc} />}
                    {uploadResult && (
                        <ResultText href={uploadResult} onClick={copyToClipboard}>
                            {uploadResult}
                        </ResultText>
                    )}
                </ImageContainer>
                <DeleteButton onClick={onDelete}>이미지 삭제</DeleteButton>
            </ModalContainer>
        </ReactModal>
    );
};

const modalStyle: Styles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
    },
    content: {
        width: "45rem",
        height: "65rem",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        backgroundColor: "#fff",
    },
};

const ModalContainer = styled.div`
  margin-top: 3.5rem;
  margin-left: 10rem;
  margin-right: 10rem;
  margin-bottom: auto;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const AddButton = styled.input`
  color: #000;
  font-family: Inter;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const AddContainer = styled.img`
  width: 24rem;
  height: 24rem;
  border-radius: 0.625rem;
  border: 0.1rem solid ${COLORS.GREY[100]};
  margin-top: 1.3rem;
`;

const DeleteButton = styled.button`
  margin-top: 1.3rem;
  width: 8rem;
  align-self: center;
`;

const InfoTitle = styled(Title1)`
  margin-top: 4rem;
  margin-bottom: 4rem;
  text-align: center;
`;

const CloseButton = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const ResultText = styled.a`
  display: inline-block;
  margin-top: 1.2rem;
  font-size: 1.2rem;
  font-weight: bold;
  width: 24rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  cursor: pointer;
  color: inherit;
  text-decoration: none;

  &:hover {
    color: blue;
  }
`;


export default UploadModal;