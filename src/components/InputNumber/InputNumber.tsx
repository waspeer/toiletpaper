/* eslint-disable react/jsx-props-no-spreading */
import RcInputNumber from 'rc-input-number';
import React from 'react';

import { Wrapper } from './_styles';

type Props = Parameters<typeof RcInputNumber>[0];

const InputNumber = (props: Props) => {
  return (
    <Wrapper>
      <RcInputNumber {...props} />
    </Wrapper>
  );
};

export default InputNumber;
