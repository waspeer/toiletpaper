import React from 'react';

import { StyledLabel } from './_styles';

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Label = ({ children, style }: Props) => {
  return <StyledLabel style={style}>{children}</StyledLabel>;
};

export default Label;
