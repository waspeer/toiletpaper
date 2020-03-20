import { cleanup, fireEvent } from '@testing-library/react';
import React, { useState } from 'react';

import { renderWithContext } from '#root/lib/test';

import Input from './Input';

const TEST_ID = 'input';

describe('Input', () => {
  it('should render the defaultValue', () => {
    const defaultValue = 'corona';
    const { getByTestId } = renderWithContext(<Input defaultValue={defaultValue} />);
    expect(getByTestId(TEST_ID)).toHaveValue(defaultValue);
  });

  it('should render a disabled input when disabled prop is provided', () => {
    const { getByTestId } = renderWithContext(<Input disabled />);
    expect(getByTestId(TEST_ID)).toBeDisabled();
  });

  it('should pass on the provided id', () => {
    const id = 'corona';
    const { getByTestId } = renderWithContext(<Input id={id} />);
    expect(getByTestId(TEST_ID)).toHaveAttribute('id', id);
  });

  it('should enforce the provided maxLength prop', () => {
    const maxLength = 5;
    const value = 'aaaaaaaaaa';
    const { getByTestId } = renderWithContext(<Input value={value} maxLength={maxLength} />);
    const input = getByTestId(TEST_ID);
    expect(input).toHaveAttribute('maxLength', String(maxLength));
    expect(input).toHaveValue(value.substring(0, maxLength));
  });

  it('should render the provided prefix', () => {
    const prefixString = 'C';
    const { getByText } = renderWithContext(<Input prefix={prefixString} />);
    expect(getByText(prefixString)).toBeInTheDocument();
    cleanup();

    const testId = 'testElement';
    const prefixElement = <span data-testid={testId} />;
    const { getByTestId } = renderWithContext(<Input prefix={prefixElement} />);
    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render the provided suffix', () => {
    const suffixString = 'C';
    const { getByText } = renderWithContext(<Input suffix={suffixString} />);
    expect(getByText(suffixString)).toBeInTheDocument();
    cleanup();

    const testId = 'testElement';
    const suffixElement = <span data-testid={testId} />;
    const { getByTestId } = renderWithContext(<Input suffix={suffixElement} />);
    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should pass on the provided htmlType', () => {
    const types = ['email', 'password', 'tel', 'text', 'url'] as const;

    types.forEach((type) => {
      const { getByTestId } = renderWithContext(<Input htmlType={type} />);
      expect(getByTestId(TEST_ID)).toHaveAttribute('type', type);
      cleanup();
    });
  });

  it('should call the onChange function on a change', () => {
    const onChange = jest.fn();
    const { getByTestId } = renderWithContext(<Input onChange={onChange} />);
    fireEvent.change(getByTestId(TEST_ID), { target: { value: 'corona' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('should call the onPressEnter function when the enter key is pressed', () => {
    const onPressEnter = jest.fn();
    const { getByTestId } = renderWithContext(<Input onPressEnter={onPressEnter} />);
    fireEvent.keyDown(getByTestId(TEST_ID), { key: 'Enter', code: 13 });
    expect(onPressEnter).toHaveBeenCalled();
  });

  it('should add the readOnly attribute when a value is provided but no onChange handler', () => {
    const { getByTestId } = renderWithContext(<Input value="corona" />);
    expect(getByTestId(TEST_ID)).toHaveAttribute('readOnly');
  });

  it('should add the provided className to the wrapper element', () => {
    const className = 'corona';
    const { container } = renderWithContext(<Input className={className} />);
    expect(container.querySelector(`.${className}`)).toBeInTheDocument();
  });

  it('should focus the input on mount when the autoFocus prop is present', () => {
    const { getByTestId } = renderWithContext(<Input autoFocus />);
    expect(getByTestId(TEST_ID)).toHaveFocus();
  });

  describe('allowClear=true', () => {
    const CLEAR_BUTTON_TEST_ID = 'inputClearButton';

    it('should not render a clear button when the input is empty', () => {
      const { queryByTestId } = renderWithContext(<Input allowClear />);
      expect(queryByTestId(CLEAR_BUTTON_TEST_ID)).not.toBeInTheDocument();
    });

    it('should render a clear button when a value is provided to the input', () => {
      const { getByTestId } = renderWithContext(<Input allowClear value="corona" />);
      expect(getByTestId(CLEAR_BUTTON_TEST_ID)).toBeVisible();
    });

    it('should render a clear button when a defaultValue is provided to the input', () => {
      const { getByTestId } = renderWithContext(<Input allowClear defaultValue="corona" />);
      expect(getByTestId(CLEAR_BUTTON_TEST_ID)).toBeVisible();
    });

    it('clicking the clear button should clear the input on a uncontrolled input', () => {
      const { getByTestId } = renderWithContext(<Input allowClear />);
      const input = getByTestId(TEST_ID);
      fireEvent.change(getByTestId(TEST_ID), { target: { value: 'corona' } });
      expect(input).toHaveValue();
      fireEvent.click(getByTestId(CLEAR_BUTTON_TEST_ID));
      expect(input).not.toHaveValue();
    });

    it('clicking the clear button should clear the input on a controlled input', () => {
      const Container = () => {
        const [value, setValue] = useState('');
        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
        return <Input allowClear value={value} onChange={onChange} />;
      };
      const { getByTestId } = renderWithContext(<Container />);
      const input = getByTestId(TEST_ID);
      fireEvent.change(input, { target: { value: 'corona' } });
      expect(input).toHaveValue();
      fireEvent.click(getByTestId(CLEAR_BUTTON_TEST_ID));
      expect(input).not.toHaveValue();
    });
  });
});
