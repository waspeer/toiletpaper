import React from 'react';

import { P } from './_styles';

interface Props {
  children: React.ReactNode;

  /** Additional styling */
  style?: React.CSSProperties;
}

const Paragraph = ({ children, style }: Props) => {
  return <P style={style}>{children}</P>;
};

export default Paragraph;
