import React from 'react';

import { P } from './_styles';

interface Props {
  children: React.ReactNode;
}

const Paragraph = ({ children }: Props) => {
  return <P>{children}</P>;
};

export default Paragraph;
