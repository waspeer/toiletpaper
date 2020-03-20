import styled from 'styled-components';

import { colors } from '#root/style';

export const Wrapper = styled.div`
  width: 100%;

  & .rc-input-number {
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

    &.rc-input-number-disabled {
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

    &.rc-input-number-focused {
      border-color: ${colors.primary};
      box-shadow: 0 0 0 2px ${colors.primary.fade(0.8)};
      outline: 0;
    }

    &.large {
      font-size: 1rem;
      padding: 0.4rem 0.65rem;
    }

    &.small input {
      padding: 0 0.5rem;
    }

    & .rc-input-number-input-wrap {
      flex: 1;
    }

    & input {
      appearance: none;
      background: none;
      border: none;
      color: ${colors.dark};
      font-family: inherit;
      font-feature-settings: 'tnum';
      font-size: 1rem;
      font-variant: tabular-nums;
      line-height: inherit;
      margin: 0;
      padding: 0.25rem 0.7rem;
      padding: 0.4rem 0.65rem;
      touch-action: manipulation;
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
    }

    & .rc-input-number-handler-wrap {
      display: flex;
      flex-direction: column;
      background: white;
      border-left: 1px solid whitesmoke;
      border-radius: 0 2px 2px 0;
      height: 100%;
      opacity: 0;
      position: absolute;
      right: 0;
      top: 0;
      transition: opacity 0.24s linear 0.1s;
      width: 1.5rem;

      &:hover {
        opacity: 1;
      }

      & .rc-input-number-handler {
        flex: 1;
        position: relative;
        display: block;
        width: 100%;
        overflow: hidden;
        color: ${colors.dark.fade(0.5)};
        font-weight: bold;
        line-height: 0;
        text-align: center;
        transition: all 0.1s linear;
        cursor: pointer;

        &:hover {
          color: ${colors.dark.fade(0.3)};
          flex: 1.2;
        }

        & span {
          display: none;
        }
      }

      & .rc-input-number-handler-up {
        &::after {
          content: '˰';
        }
      }

      & .rc-input-number-handler-down {
        border-top: 1px solid whitesmoke;

        &::after {
          content: '˯';
        }
      }
    }
  }
`;

export const Prefix = styled.div`
  align-items: center;
  color: ${colors.dark.fade(0.35)};
  display: flex;
  padding: 0 0.25rem 0 0.7rem;
`;
