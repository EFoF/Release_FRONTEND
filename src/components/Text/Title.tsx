import styled from "styled-components";
import COLORS from "../../constants/color";
import React from 'react';

interface TitleProps {
  color?: string;
  children?: string;
}

const Title1 = styled.h1<TitleProps>`
  color: ${(props) => props.color || '#000'};
  font-family: S-medium;
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Title2 = styled.h1<TitleProps>`
  color: ${(props) => props.color || '#808080'};
  font-family: S-light;
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const CategoryTitle = styled.h1<TitleProps>`
  color: ${(props) => props.color || '#000'};
font-family: S-light;
font-size: 1.75rem;
font-style: normal;
font-weight: 300;
line-height: normal;
`;



// const Title: React.FC<TitleProps> = ({ color, children }) => {
//   return <Title1 color={color}>{children}</Title1>;
// };

export {Title1, Title2, CategoryTitle}