import styled from "styled-components";
import COLORS from "../../constants/color";
import React from 'react';

interface TitleProps {
    color?: string;
    children: string | React.ReactNode;
}

const OwnerName = styled.h1<TitleProps>`
  color: ${(props) => props.color || '#000'};
  font-family: S-Medium;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export {OwnerName}