import styled, { keyframes } from 'styled-components';

const heartbeat = keyframes`
  from {
    transform: scale(1);
    transform-origin: center center;
    animation-timing-function: ease-out;
  }
  10% {
    transform: scale(0.91);
    animation-timing-function: ease-in;
  }
  17% {
    transform: scale(0.98);
    animation-timing-function: ease-out;
  }
  33% {
    transform: scale(0.87);
    animation-timing-function: ease-in;
  }
  45% {
    transform: scale(1);
    animation-timing-function: ease-out;
  }
`;

const jello = keyframes`
  0% {
    transform: scale3d(1, 1, 1);
  }
  30% {
    transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
`;

const vibrate = keyframes`
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-1px, 1px);
  }
  40% {
    transform: translate(-1px, -1px);
  }
  60% {
    transform: translate(1px, 1px);
  }
  80% {
    transform: translate(1px, -1px);
  }
  100% {
    transform: translate(0);
  }
`;

export const Wrapper = styled.div`
  margin-bottom: 1.25rem;
  min-height: 1.5rem;
`;

export const Emoji = styled.span`
  display: inline-block;
  font-size: 1.5rem;
  padding: 0 0.5rem;

  &:nth-child(3n + 1) {
    animation: ${vibrate} 0.3s infinite;
  }

  &:nth-child(3n + 2) {
    animation: ${jello} 0.9s infinite;
  }

  &:nth-child(3n) {
    animation: ${heartbeat} 1.5s infinite;
  }
`;
