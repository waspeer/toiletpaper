import classNames from '@sindresorhus/class-names';
import React from 'react';

import { Spinner, StyledButton, IconWrapper, StyledLink } from './_styles';

interface Props {
  /**
   * Renders the button full-width.
   */
  block?: boolean;

  /**
   * Button children.
   */
  children?: React.ReactNode;

  /**
   * Classname to be passed on
   */
  className?: string;

  /**
   * Disables the button.
   */
  disabled?: boolean;

  /**
   * Sets the href attribute of the link button.
   */
  href?: string;

  /**
   * Passed to the button's `type` attribute.
   * See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type
   */
  htmlType?: 'button' | 'reset' | 'submit';

  /**
   * Renders an icon to the left of the button children.
   */
  icon?: React.ReactNode;

  /**
   * Disables the button and shows a spinner.
   */
  loading?: boolean;

  /**
   * The handler to the `click` event.
   */
  onClick?: (...params: any[]) => any;

  /**
   * Sets the size of the button
   */
  size?: 'large' | 'small';

  /**
   * Sets the testId on the button
   */
  testId?: string;

  /**
   * Sets the type of the button
   */
  type?: 'primary' | 'link';
}

const TEST_ID = 'button';

const Button = ({
  block,
  children,
  className,
  disabled = false,
  href,
  htmlType = 'button',
  icon,
  loading = false,
  onClick,
  size,
  testId,
  type,
}: Props) => {
  const classes = classNames(
    {
      block,
      disabled: type === 'link' && disabled,
      large: size === 'large',
      loading,
      primary: type === 'primary',
      small: size === 'small',
    },
    className,
  );

  const buttonContent = (
    <>
      {(loading || icon) && <IconWrapper>{loading ? <Spinner /> : icon}</IconWrapper>}
      <span>{children}</span>
    </>
  );

  if (type === 'link') {
    return (
      <StyledLink
        className={classes}
        data-testid={testId || TEST_ID}
        href={disabled || loading ? undefined : href}
        onClick={disabled || loading ? undefined : onClick}
      >
        {buttonContent}
      </StyledLink>
    );
  }

  return (
    <StyledButton
      className={classes}
      data-testid={testId || TEST_ID}
      disabled={disabled || loading}
      onClick={onClick}
      type={htmlType}
    >
      {buttonContent}
    </StyledButton>
  );
};

export default Button;
