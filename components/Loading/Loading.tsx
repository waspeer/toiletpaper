import styled, { keyframes } from 'styled-components';
import React from 'react';

import { colors } from '#root/style';

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

const Loader = styled.div`
  display: block;
  position: relative;
  width: 5rem;
  height: 5rem;
  transform: rotate(45deg);
  transform-origin: 2.5rem 2.5rem;
  margin: 0 auto;
`;

const Heart = styled.div`
  top: 32px;
  left: 32px;
  position: absolute;
  width: 32px;
  height: 32px;
  background: ${colors.primary};
  animation: ${heartbeat} 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);

  &::after,
  &::before {
    content: ' ';
    position: absolute;
    display: block;
    width: 32px;
    height: 32px;
    background: ${colors.primary};
  }
  &::before {
    left: -24px;
    border-radius: 50% 0 0 50%;
  }
  &::after {
    top: -24px;
    border-radius: 50% 50% 0 0;
  }
`;

const Loading = () => {
  return (
    <Loader>
      <Heart />
    </Loader>
  );
};

export default Loading;
