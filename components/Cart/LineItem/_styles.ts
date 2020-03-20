import styled from 'styled-components';

import { colors } from '#root/style';

export const DeleteButton = styled.button`
  line-height: 2rem;
  background-color: whitesmoke;
  border-radius: 50%;
  border: 1px solid grey;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  color: ${colors.dark.fade(0.3)};
  cursor: pointer;
  display: inline-block;
  font-size: 1rem;
  font-weight: 400;
  height: 2rem;
  position: relative;
  text-align: center;
  touch-action: manipulation;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  white-space: nowrap;
  width: 2rem;

  &::before {
    content: '🚽';
  }

  &:hover {
    border-color: ${colors.primary};
    color: ${colors.primary};
  }

  &:active {
    border-color: ${colors.primary.darken(0.2)};
    color: ${colors.primary.darken(0.2)};
  }
`;

export const Details = styled.div`
  color: ${colors.dark.fade(0.3)};
  flex: 1;
  font-size: 0.9rem;
  font-variant: tabular-nums;
  font-feature-settings: 'tnum';
  line-height: 1.5;
  margin-left: 1rem;
`;

export const ImageWrapper = styled.div`
  height: 4rem;
  width: 4rem;

  & img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;

export const Wrapper = styled.article`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
`;
