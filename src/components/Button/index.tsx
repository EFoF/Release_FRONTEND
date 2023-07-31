import styled from "styled-components";
import COLORS from "../../constants/color";

type ButtonTheme =
  | "original"
  | "blue"
  | "red";

type ButtonType = "button" | "submit" | "reset";

type ButtonProps = {
    /** 버튼 안의 내용 */
    title: string;
    /** 버튼의 테마 */
    theme?: ButtonTheme;
    /** 버튼 활성화 여부 */
    disabled?: boolean;
    /** 버튼 너비 */
    width?: string;
    /** 버튼 타입 */
    type?: ButtonType;
    /** 클릭했을 때 호출할 함수 */
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
};

const StyledButton = styled.button<{
    ButtonTheme: ButtonTheme;
    disabled: boolean;
    width: string;
    className?: string;
}>`
${({ButtonTheme, width, disabled}) => ` 
    width: ${width};
    background-color: ${
        {
            original: "transparent",
            blue: COLORS.BLUE,
            red: COLORS.RED,
        }[ButtonTheme]
    };
    font-weight: ${
        (ButtonTheme === "original" ? "400" : "600")
    };
    border: ${ 
        ButtonTheme === "original" ? "1px solid rgba(128, 128, 128, 0.5)" : "none"
    };
    color: ${
        {
            original: COLORS.BLACK,
            blue: COLORS.WHITE,
            red: COLORS.WHITE,
        }[ButtonTheme]
    };
    &:hover{
        background-color: ${
            {
                original: COLORS.WHITE,
                blue: COLORS.BLUE_HOVER,
                red: COLORS.RED_HOVER,
            }[ButtonTheme]
        }
    }
`}
  height: 4.4375rem;
  border-radius: 1.875rem;
  font-family: S-Regular;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`
export default function Button({
    title,
    theme = "original",
    disabled=false,
    width = "11.3125rem",
    type = "button",
    onClick,
    className,
}:ButtonProps) {
    return (
        <StyledButton
            ButtonTheme={theme}
            disabled={disabled}
            width={width}
            type={type}
            onClick={onClick}
            className={className}
        >
            {title}
        </StyledButton>
    )
}

// 초기 버전 - 이 방법으로는 쓸 때 마다 addStyle을 길게 써줘야 했지만 위 방법에서는 테마 하나 적어주면 그에 해당하는 스타일 연출 가능
// interface PropsType {
//   type?: string;
//   addStyle?: {
//     opacity: string;
//     backgroundColor: string;
//     color: string;
//     border: string;
//   };
//   contents: string;
//   onClick?: () => void;
// }

// interface PropsType {
//     addStyle?: {
//       backgroundColor: string;
//       color: string;
//       border?: string;
//       width: string;
//     };
//     contents: string;
//     onClick?: () => void;
//   }

// const StyledButton = styled.button`
//   width: 11.3125rem;
//   height: 4.4375rem;
//   background-color: ${COLORS.BLUE};
//   border-radius: 1.875rem;
//   border: none;
//   // border : 1px solid #000;
//   color: #fff;
//   font-family: S-Regular;
//   font-size: 1.5rem;
//   font-style: normal;
//   font-weight: 600;
//   line-height: normal;
//   &:hover {
//     opacity: 70%;
//   }
// `;