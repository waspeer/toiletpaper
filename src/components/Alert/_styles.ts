import styled from 'styled-components';

import { colors } from '#root/style';

const Icon = styled.div`
  height: 1.5715rem;
  position: relative;
  width: 1.5715rem;

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
    border-radius: 0.5rem;
  }

  &::after {
    color: white;
    font-size: 0.7rem;
    line-height: 0.88rem;
    text-align: center;
  }
`;

const IconError = styled(Icon)`
  &::before {
    background-color: #ff4d4f;
  }

  &::after {
    content: '𝗫';
    font-size: 0.6rem;
  }
`;

const IconInfo = styled(Icon)`
  &::before {
    background-color: ${colors.secondary.fade(0.6)};
  }

  &::after {
    content: 'i';
  }
`;

const IconSuccess = styled(Icon)`
  &::before {
    background-color: #52c41a;
  }

  &::after {
    content: '✓';
  }
`;

const IconWarning = styled(Icon)`
  &::before {
    background-color: #faad14;
  }

  &::after {
    content: '!';
  }
`;

export const CloseButton = styled(Icon)`
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &::before {
    background-color: grey;
  }

  &::after {
    color: white;
    content: '𝗫';
  }
`;

export const DefaultIcons = {
  error: IconError,
  info: IconInfo,
  success: IconSuccess,
  warning: IconWarning,
};

export const Content = styled.div`
  flex: 1;
  padding: 0 0.5rem;
`;

export const Message = styled.div``;

export const Wrapper = styled.div`
  align-items: flex-start;
  background-color: whitesmoke;
  border: 1px solid ${colors.secondary.fade(0.6)};
  border-radius: 2px;
  box-sizing: border-box;
  color: ${colors.dark.fade(0.3)};
  display: flex;
  font-feature-settings: 'tnum';
  font-size: 0.875rem;
  font-variant: tabular-nums;
  line-height: 1.5715;
  margin-bottom: 1rem;
  padding: 0.5rem;
  word-wrap: break-word;

  &.error {
    background-color: #fff2f0;
    border-color: #ffccc7;
  }

  &.success {
    background-color: #f6ffed;
    border-color: #b7eb8f;
  }

  &.warning {
    background-color: #fffbe6;
    border-color: #ffe58f;
  }

  &.with-description ${Message} {
    margin-bottom: 0.25rem;
    color: ${colors.dark.fade(0.2)};
    font-size: 1rem;
  }
`;
