/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { memo } from 'react';

import { Name, Label, OptionsWrapper, InputWrapper, Wrapper } from './_styles';

interface Props {
  name: string;
  onChange: (name: string, value: string) => void;
  value: string;
  values: string[];
}

const OptionPicker = ({ name, onChange: pushChange, value: selectedValue, values }: Props) => {
  return (
    <Wrapper>
      <Name>{name}</Name>
      <OptionsWrapper>
        {values.map((value) => (
          <Label
            className={selectedValue === value ? 'checked' : undefined}
            key={`option-${name}-${value}`}
          >
            <span>{value}</span>
            <InputWrapper>
              <input
                checked={selectedValue === value}
                onChange={() => pushChange(name, value)}
                name={`option-${name}-`}
                type="radio"
                value={value}
              />
            </InputWrapper>
          </Label>
        ))}
      </OptionsWrapper>
    </Wrapper>
  );
};

OptionPicker.whyDidYouRender = true;

export default memo(OptionPicker);
