import styled from "styled-components";
import COLORS from "../../constants/color";

export const Wrapper = styled.button`
width: 11.3125rem;
height: 4.4375rem;
background-color: ${COLORS.BLUE};
color: #FFF;
font-family: Inter;
font-size: 1.5rem;
font-style: normal;
font-weight: 600;
line-height: normal;
`

export default function Button() {
    return (
        <Wrapper>
            회사 생성하기
        </Wrapper>
    )
}