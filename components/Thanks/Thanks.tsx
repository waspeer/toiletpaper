import React from 'react';
import { Random } from 'react-animated-text';

import { Paragraph } from '#root/components/Typography';

import { Wrapper } from './_styles';

const Thanks = () => {
  return (
    <Wrapper>
      <Random text="Thank you!! :)" />
      <Paragraph>We received your order. You&apos;re the best!</Paragraph>
    </Wrapper>
  );
};

export default Thanks;
