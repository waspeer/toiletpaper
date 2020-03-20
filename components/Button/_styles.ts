import styled, { css, keyframes } from 'styled-components';

import { colors } from '#root/style';

export const IconWrapper = styled.span`
  display: inline-block;
  margin-right: 0.6em;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  animation: ${rotate} 1s linear infinite;
  border-color: ${colors.background} rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
  border-radius: 50%;
  border-style: solid;
  border-width: 0.15em;
  display: inline-block;
  height: 1em;
  width: 1em;
`;

const buttonStyle = css`
  cursor: pointer;
  display: inline-block;
  padding: 0.3rem 1rem;
  position: relative;
  touch-action: manipulation;
  transition: all 0.2s;
  user-select: none;

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    background-color: rgba(255, 255, 255, 0);
    transition: background-color 0.2s;
  }

  &.block {
    width: 100%;
  }

  &.large {
    padding: 0.5rem 1rem;
    font-size: 1.1rem;
  }

  &.loading {
    cursor: default;
    pointer-events: none;

    &::after {
      background-color: white;
      border-radius: inherit;
      bottom: -1px;
      content: '';
      left: -1px;
      opacity: 0.35;
      position: absolute;
      right: -1px;
      top: -1px;
    }
  }

  &.small {
    padding: 0.15rem 0.25rem;
  }

  span {
    position: relative;
    vertical-align: middle;
  }
`;

export const StyledButton = styled.button`
  background-color: transparent;
  border-color: ${colors.dark.fade(0.3)};
  border-radius: 0.2rem;
  border-style: solid;
  border-width: 1px;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
  color: ${colors.dark.fade(0.3)};
  font-style: italic;
  font-weight: bold;
  overflow: hidden;

  &:hover {
    background-color: ${colors.background};
    border-color: ${colors.primary};
    color: ${colors.primary};

    &::before {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  &:active {
    &::before {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  &.primary {
    background-color: ${colors.primary};
    border-color: ${colors.primary};
    color: ${colors.background};

    &:hover {
      border-color: ${colors.primary};
      color: ${colors.background};
    }
  }

  &:disabled {
    background-color: rgba(0, 0, 0, 0.1);
    border-color: grey;
    color: grey;
    cursor: not-allowed;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      border-color: grey;
      color: grey;

      &::before {
        content: none;
      }
    }
  }

  ${buttonStyle}
`;

export const StyledLink = styled.a`
  color: ${colors.primary};

  &:hover {
    filter: brightness(120%);
  }

  &:active {
    filter: brightness(80%);
  }

  &.disabled {
    color: grey;
    cursor: not-allowed;

    &:hover {
      filter: none;
    }
  }

  ${buttonStyle}
`;
