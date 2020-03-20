/* eslint-disable import/prefer-default-export */
import styled, { keyframes } from 'styled-components';

import { colors } from '#root/style';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const ListWrapper = styled.div`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li,
  .footer,
  .header {
    padding: 0.75rem 0;
  }

  &.large {
    li,
    .footer,
    .header {
      padding: 1rem 0;
    }
  }

  &.small {
    li,
    .footer,
    .header {
      padding: 0.5rem 0;
    }
  }

  &.split,
  &.bordered {
    .footer {
      border-top: 1px solid grey;
    }

    li,
    .footer,
    .header {
      border-bottom: 1px solid grey;
    }
  }

  &.bordered {
    border: 1px solid grey;
    border-radius: 0.2rem;

    li,
    .footer,
    .header {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }

    &.large {
      li,
      .footer,
      .header {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
      }
    }

    &.small {
      li,
      .footer,
      .header {
        padding-left: 1rem;
        padding-right: 1rem;
      }
    }
  }

  &.split li:last-child,
  &.bordered li:last-child {
    border-bottom: none;
  }

  &.loading {
    .loadContainer {
      position: relative;

      &::before {
        background: rgba(255, 255, 255, 0.4);
        bottom: 0;
        content: '';
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 2;
      }

      &::after {
        animation: ${rotate} 1s linear infinite;
        border-color: ${colors.primary} rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
        border-radius: 50%;
        border-style: solid;
        border-width: 0.15em;
        content: '';
        display: inline-block;
        height: 2em;
        left: 50%;
        margin-left: -1em;
        margin-top: -1em;
        position: absolute;
        top: 50%;
        width: 2em;
        z-index: 3;
      }
    }
  }
`;

export const NoItemsWrapper = styled.div`
  text-align: center;
  padding: 1rem;
  opacity: 0.75;

  span {
    display: block;
    font-size: 4rem;
    margin-bottom: 1rem;
  }
`;
