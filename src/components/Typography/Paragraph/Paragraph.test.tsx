import React from 'react';

import { renderWithContext } from '#root/lib/test';

import Paragraph from './Paragraph';

describe('Paragraph', () => {
  it('should render the provided children', () => {
    const text = 'Blah';
    const { getByText } = renderWithContext(<Paragraph>{text}</Paragraph>);
    expect(getByText(text)).toBeInTheDocument();

    const elementTestId = 'element';
    const { getByTestId } = renderWithContext(
      <Paragraph>
        <span data-testid={elementTestId} />
      </Paragraph>,
    );
    expect(getByTestId(elementTestId)).toBeInTheDocument();
  });
});
