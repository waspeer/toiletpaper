import classNames from '@sindresorhus/class-names';
import React, { useState } from 'react';

import { Inner, StyledInput, Wrapper } from './_styles';

interface Props {
  /** Specifies whether the checkbox is selected. */
  checked?: boolean;

  /** Specifies the initial state: whether or not the checkbox is selected. */
  defaultChecked?: boolean;

  /** Disable checkbox */
  disabled?: boolean;

  /** The ID of the input element */
  id?: string;

  /** The callback function that is triggered when the state changes. */
  onChange?: (value: boolean) => void;
}

const Checkbox = ({
  checked,
  defaultChecked = false,
  disabled,
  id,
  onChange: pushChange,
}: Props) => {
  const [checkedUncontrolled, setCheckedUncontrolled] = useState(defaultChecked);
  const checkedState = typeof checked === 'undefined' ? checkedUncontrolled : checked;

  const classes = classNames({ checked: checkedState, disabled });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (pushChange) pushChange(event.target.checked);
    if (!checked) setCheckedUncontrolled((value) => !value);
  };

  return (
    <Wrapper className={classes}>
      <StyledInput
        checked={checkedState}
        data-testid="checkbox"
        disabled={disabled}
        id={id}
        onChange={onChange}
        readOnly={checked}
        type="checkbox"
      />
      <Inner />
    </Wrapper>
  );
};

export default Checkbox;
