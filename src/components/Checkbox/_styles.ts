import styled, { keyframes } from 'styled-components';
import { colors } from '#root/style';

const checkboxEffect = keyframes`
  0% {
    transform: scale(1);
    opacity: .5
  }
  100% {
    transform:scale(1.6);
    opacity: 0
  }
`;

export const StyledInput = styled.input`
  bottom: 0;
  box-sizing: border-box;
  cursor: pointer;
  height: 100%;
  left: 0;
  opacity: 0;
  padding: 0;
  position: absolute;
  right: 0;
  top: 0;
  touch-action: manipulation;
  width: 100%;
  z-index: 1;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const Inner = styled.span`
  background-color: white;
  border-collapse: separate;
  border-radius: 2px;
  border: 1px solid whitesmoke;
  display: block;
  height: 0.9rem;
  left: 0;
  position: relative;
  top: 0;
  transition: all 0.3s;
  width: 0.9rem;

  &::after {
    content: ' ';
    border: 2px solid white;
    border-left: 0;
    border-top: 0;
    display: table;
    height: 0.45rem;
    left: 23%;
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: rotate(45deg) scale(0) translate(-50%, -50%);
    transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
    width: 0.25rem;
  }
`;

export const Wrapper = styled.div`
  box-sizing: border-box;
  color: ${colors.dark.fade(0.3)};
  cursor: pointer;
  display: inline-block;
  font-size: 0.9rem;
  line-height: 1;
  line-height: 1.5715;
  outline: none;
  position: relative;
  top: -0.09em;
  vertical-align: middle;
  white-space: nowrap;

  &::after {
    border-radius: 2px;
    border: 1px solid ${colors.primary};
    box-sizing: border-box;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    visibility: hidden;
    width: 100%;
  }

  &:not(.disabled):hover {
    &::after {
      visibility: visible;
    }

    ${Inner} {
      border-color: ${colors.primary};
    }
  }

  &.checked {
    &::after {
      animation: ${checkboxEffect} 0.36s ease-in-out;
      width: 100%;
    }

    ${Inner} {
      background-color: ${colors.primary};
      border-color: ${colors.primary};

      &::after {
        opacity: 1;
        transform: rotate(45deg) scale(1) translate(-50%, -50%);
      }
    }
  }

  &.disabled {
    cursor: not-allowed;

    ${Inner} {
      background-color: whitesmoke;
      border-color: grey;

      &::after {
        border-color: grey;
      }
    }
  }
`;
