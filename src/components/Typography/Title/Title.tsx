import React from 'react';

import { Header1, Header2, Header3, Header4 } from './_styles';

interface Props {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
  secondary?: string;
}

const HeaderElements = new Map([
  [1, Header1],
  [2, Header2],
  [3, Header3],
  [4, Header4],
]);

const Title = ({ children, level = 1, secondary }: Props) => {
  const HeaderElement = HeaderElements.get(level) as any;
  return (
    <HeaderElement>
      {children}
      {secondary && <small data-testid="secondaryTitle">{secondary}</small>}
    </HeaderElement>
  );
};

export default Title;
