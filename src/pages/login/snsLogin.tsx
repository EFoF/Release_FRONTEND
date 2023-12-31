import styled from "styled-components";
import React from "react";
import {useNavigate} from "react-router-dom";
import COLORS from "../../constants/color";
import API from "../../api/config";

const Container = styled.div`
  font-size: 1.4rem;
  text-align: center;
  color: ${COLORS.GREY[500]};
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 41rem; //70%;
  border-top: 0.1rem solid ${COLORS.GREY[300]};
  padding-top: 3.5rem;
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 5rem;
  gap: 1.7rem;
  color: ${COLORS.GREY[300]};

  a {
    width: 4rem;
    height: 4rem;
    padding: 0;
  }

  padding-top: 0.8rem;
  flex-direction: column;
`;
const SNSIMG = styled.img`
  border-radius: 5rem;
  width: 5rem;
  height: 5rem;
`;
const SNSWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;
const Label = styled.div`
  font-weight: 300;
  font-size: 1.3rem;
  cursor: pointer;
`;

export default function SNSLogin() {
    const navigate = useNavigate();

    const handleGOOGLELoginClick = () => {
        navigate("/oauth2/authorization/google");
    };

    return (
        <Container>
            SNS로 간편하게 로그인
            <SNSWrapper>
                <ImgWrapper>
                    <SNSIMG
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/320px-Google_%22G%22_Logo.svg.png"/>
                    <Label onClick={handleGOOGLELoginClick}>Google</Label>
                </ImgWrapper>
                {/* <ImgWrapper>
                    <SNSIMG src="https://cdn.imweb.me/upload/S20210304872ba49a108a8/89a68d1e3674a.png"/>
                    <Label>Kakao </Label>
                </ImgWrapper> */}
            </SNSWrapper>
        </Container>
    );
}
