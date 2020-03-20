import styled, { withTheme } from 'styled-components';

import { colors } from '#root/style';

export const ClearButton = styled.div`
  cursor: pointer;
  display: flex;
  opacity: 0.5;
  position: relative;
  transition: opacity 0.2s;
  width: 2rem;

  &:hover {
    opacity: 1;
  }

  &::after,
  &::before {
    content: '';
    height: 0.88rem;
    left: 50%;
    margin-left: -0.44rem;
    margin-top: -0.44rem;
    position: absolute;
    top: 50%;
    width: 0.88rem;
  }

  &::before {
    background-color: grey;
    border-radius: 0.5rem;
  }

  &::after {
    content: '𝗫';
    color: white;
  }
`;

export const InputWrapper = withTheme(styled.div`
  align-items: stretch;
  background-color: white;
  border: 1px solid grey;
  border-radius: 2px;
  box-sizing: border-box;
  color: ${colors.dark};
  display: flex;
  flex-flow: row nowrap;
  font-feature-settings: 'tnum';
  font-size: 0.875rem;
  line-height: 1.5715;
  position: relative;
  touch-action: manipulation;
  transition: all 0.3s;
  width: 100%;

  &.disabled {
    background-color: whitesmoke;
    color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;

    &:hover {
      border-color: grey;
    }
  }

  &:hover {
    border-color: ${colors.primary};
  }

  &:focus,
  &.focus {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px ${colors.primary.fade(0.8)};
    outline: 0;
  }

  &.large {
    font-size: 1rem;
    padding: 0.4rem 0.65rem;
  }

  &.prefix input {
    padding-left: 0;
  }

  &.small input {
    padding: 0 0.5rem;
  }

  &.suffix input {
    padding-right: 0;
  }
`);

export const Prefix = styled.div`
  align-items: center;
  color: ${colors.dark.fade(0.35)};
  display: flex;
  padding: 0 0.25rem 0 0.7rem;
`;

export const StyledInput = withTheme(styled.input`
  appearance: none;
  background: none;
  border: none;
  color: ${colors.dark};
  font-family: inherit;
  font-feature-settings: 'tnum';
  font-size: inherit;
  font-variant: tabular-nums;
  touch-action: manipulation;
  line-height: inherit;
  margin: 0;
  padding: 0.25rem 0.7rem;
  width: 100%;

  &:disabled {
    color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
  }

  &:focus {
    outline: 0;
  }

  &::placeholder {
    color: grey;
    text-overflow: ellipsis;
  }
`);

export const Suffix = styled.div`
  align-items: center;
  color: ${colors.dark.fade(0.35)};
  display: flex;
  padding: 0 0.7rem 0 0.25rem;
`;
