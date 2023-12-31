import React from "react";
import styled from "styled-components";
import COLORS from "../../constants/color";

const Wrapper = styled.div``;
const Label = styled.div`
  font-size: 1.3rem;
  color: ${COLORS.GREY[500]};
  padding-bottom: 1rem;
  padding-left: 0.2rem;
`;

const InputWrapper = styled.input<{ size: number }>`
  ${({ size }) => `
    width: ${size}rem;
`}
  padding: 1.5rem 1.2rem;
  height: 2.5rem;
  border-radius: 0.625rem;
  border: 0.1rem solid ${COLORS.GREY[300]};
  color: ${COLORS.GREY[500]};
  font-size: 1.5rem;
  &::placeholder {
    color: ${COLORS.GREY[300]};
    font-weight: 400;
  }
  &:focus {
    border-color: ${COLORS.BLUE};
    outline: none; /* 커서가 focus 되었을 때의 기본 아웃라인 스타일 제거 */
    // box-shadow: 0 0 0 2px ${COLORS.BLUE_HOVER}; /* focus 시에 박스 쉐도우 추가 */
  }
`;

const Message = styled.p`
  font-size: 1.1rem;
  padding-top: 1rem;
  color: ${COLORS.BLACK};
`;

type InputProps = {
  /** input 안의 초깃값 */
  value: string | number;
  /** 변화가 일어났을떄 호출되는 함수 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** input type : ex> text,password,checkbox etc. */
  type?: string;
  /** 자리표시자 */
  placeholder?: string | number | null;
  /** label 숨길지 여부 */
  labelHidden?: boolean;
  /** label 내용 */
  label?: string;
  /** input 너비 */
  size?: number;
  /** 필수로 채워야하는 필드 */
  required?: boolean;
  /** 읽기 전용 */
  readOnly?: boolean;
  /** input의 입력 조건 */
  message?: string;
  className?: string;
};

export default function Input({
  value,
  onChange,
  type,
  placeholder = "",
  labelHidden = false,
  label,
  size = 35,
  required = false,
  className,
  readOnly = false,
  message = "",
}: InputProps) {
  return (
    <Wrapper className={className}>
      {label && !labelHidden && <Label>{label}</Label>}
      <InputWrapper
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder?.toString()}
        size={size}
        required={required}
        readOnly={readOnly}
      />
      {message.length > 0 && <Message> {message}</Message>}
    </Wrapper>
  );
}
