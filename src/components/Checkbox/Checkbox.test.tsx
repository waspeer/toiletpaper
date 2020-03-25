import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import Checkbox from './Checkbox';

const TEST_ID = 'checkbox';

describe('Checkbox', () => {
  it('should be checked when the checked prop is provided', () => {
    const { getByTestId } = render(<Checkbox checked />);
    expect(getByTestId(TEST_ID)).toBeChecked();
  });

  it('should be checked by default when the defaultChecked property is provided', () => {
    const { getByTestId } = render(<Checkbox defaultChecked />);
    expect(getByTestId(TEST_ID)).toBeChecked();
  });

  it('should be disabled when the disabled prop is provided', () => {
    const { getByTestId } = render(<Checkbox disabled />);
    expect(getByTestId(TEST_ID)).toBeDisabled();
  });

  it('should call the onChange handler when the value is changed', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<Checkbox onChange={onChange} />);
    fireEvent.click(getByTestId(TEST_ID));
    expect(onChange).toHaveBeenCalled();
  });
});
