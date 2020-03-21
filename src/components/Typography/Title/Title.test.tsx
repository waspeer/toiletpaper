import { cleanup } from '@testing-library/react';
import React from 'react';

import { renderWithContext } from '#root/lib/test';

import Title from './Title';

const SECONDARY_TEST_ID = 'secondaryTitle';

describe('Title', () => {
  it('should render provided text', () => {
    const text = 'It all starts with a title';
    const { getByText } = renderWithContext(<Title>{text}</Title>);
    expect(getByText(text)).toBeInTheDocument();
  });

  it('should render the appriotate tag for the provided level', () => {
    const levels = [
      [1, 'h1'],
      [2, 'h2'],
      [3, 'h3'],
      [4, 'h4'],
    ] as const;
    levels.forEach(([level, tagName]) => {
      const { container } = renderWithContext(<Title level={level}>Blah</Title>);
      expect(container.querySelector(tagName)).not.toBeNull();
      cleanup();
    });
  });

  it('should render a secondary heading when provided', () => {
    const secondary = 'you know what i mean?';
    const { getByTestId } = renderWithContext(
      <Title secondary={secondary}>Secondary &gt; Primary</Title>,
    );
    const secondaryElement = getByTestId(SECONDARY_TEST_ID);
    expect(secondaryElement).toBeInTheDocument();
    expect(secondaryElement).toHaveTextContent(secondary);
  });
});
