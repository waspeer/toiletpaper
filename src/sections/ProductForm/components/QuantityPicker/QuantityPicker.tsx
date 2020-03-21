import React, { memo } from 'react';

import InputNumber from '#root/components/InputNumber';

import { Title, Wrapper } from './_styles';

interface Props {
  disabled: boolean;
  value: number;
  onChange: (value: number) => void;
}

const QuantityPicker = ({ disabled, onChange, value }: Props) => {
  return (
    <Wrapper>
      <Title>Quantity</Title>
      <InputNumber defaultValue={1} disabled={disabled} min={1} value={value} onChange={onChange} />
    </Wrapper>
  );
};

QuantityPicker.whyDidYouRender = true;

export default memo(QuantityPicker);
