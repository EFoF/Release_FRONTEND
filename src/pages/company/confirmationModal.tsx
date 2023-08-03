import React, { FC } from "react"; // FC 타입 추가
import ReactModal, { Styles } from "react-modal";
import styled from "styled-components";
import {Title1} from "../../components/Text/Title";
import Button from "../../components/Button";

// 모달 스타일을 지정합니다. 필요한 경우 스타일을 수정해주세요.
const modalStyle: Styles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
    },
    content: {
        width: "400px",
        height: "200px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        backgroundColor: "#fff",
    },
};

interface ConfirmationModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

const ConfirmationModal: FC<ConfirmationModalProps>  = ({ isOpen, onCancel, onConfirm }) => {
    return (
        <ReactModal isOpen={isOpen} onRequestClose={onCancel} style={modalStyle}>
            <InfoTitle>회사를 삭제하시겠습니까?</InfoTitle>
            <ButtonContainer>
                <Button onClick={onCancel} title={"취소"}></Button>
                <Button onClick={onConfirm} theme={"red"} title={"확인"}></Button>
            </ButtonContainer>
        </ReactModal>
    );
};

const InfoTitle = styled(Title1)`
  margin-bottom: 4.69rem;
  //margin-bottom: .69rem;
  //margin-right: 4.69rem;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  & > button {
    margin: 0 15px;
  }
`;

export default ConfirmationModal;