import { cleanup, fireEvent } from '@testing-library/react';
import React from 'react';

import { renderWithContext } from '#root/lib/test';

import Alert from './Alert';

const TEST_ID = 'alert';

describe('Alert', () => {
  it('should render the close button when `closable` prop is provided', () => {
    const { getByTestId } = renderWithContext(<Alert closable />);
    const alert = getByTestId(TEST_ID);
    const closeButton = getByTestId('alertCloseButton');
    expect(alert).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(alert).not.toBeInTheDocument();
  });

  it('should render the provided description', () => {
    const descriptionText = 'corona bla';
    const { getByText } = renderWithContext(<Alert description={descriptionText} />);
    expect(getByText(descriptionText)).toBeInTheDocument();
    cleanup();

    const testId = 'testElement';
    const descriptionElement = <span data-testid={testId} />;
    const { getByTestId } = renderWithContext(<Alert description={descriptionElement} />);
    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render the provided icon', () => {
    const testId = 'icon';
    const icon = <span data-testid={testId} />;
    const { getByTestId } = renderWithContext(<Alert icon={icon} />);
    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a default icon when the `icon` prop is set to true', () => {
    const { getByTestId } = renderWithContext(<Alert icon />);
    expect(getByTestId('alertIcon')).toBeInTheDocument();
  });

  it('should render the provided message', () => {
    const messageText = 'corona bla';
    const { getByText } = renderWithContext(<Alert message={messageText} />);
    expect(getByText(messageText)).toBeInTheDocument();
    cleanup();

    const testId = 'testElement';
    const messageElement = <span data-testid={testId} />;
    const { getByTestId } = renderWithContext(<Alert message={messageElement} />);
    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render with the provided type', () => {
    const types = ['warning', 'error', 'success'] as const;
    types.forEach((type) => {
      const { getByTestId } = renderWithContext(<Alert type={type} />);
      expect(getByTestId(TEST_ID)).toHaveClass(type);
      cleanup();
    });
  });
});
