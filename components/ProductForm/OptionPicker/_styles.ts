import styled from 'styled-components';
import { colors } from '#root/style';

export const Name = styled.div`
  color: ${colors.dark.fade(0.3)};
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;

export const Label = styled.label`
  background-color: whitesmoke;
  border: 1px solid grey;
  border-right-width: 0;
  box-sizing: border-box;
  color: ${colors.dark.fade(0.3)};
  cursor: pointer;
  display: inline-block;
  flex: 1;
  font-feature-settings: 'tnum';
  font-size: 1rem;
  font-variant: tabular-nums;
  height: 2.5rem;
  line-height: 2.5rem;
  margin: 0;
  padding: 0 1rem;
  position: relative;
  touch-action: manipulation;
  transition: all 0.2s;

  &:hover {
    color: ${colors.primary};
  }

  &:first-child {
    border-bottom-left-radius: 2px;
    border-top-left-radius: 2px;
  }

  &:last-child {
    border-bottom-right-radius: 2px;
    border-top-right-radius: 2px;
    border-right-width: 1px;
  }

  &.checked {
    background-color: ${colors.primary};
    border-color: ${colors.primary};
    color: whitesmoke;

    &:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 0;
      right: -1px;
      bottom: 0;
      width: 1px;
      background-color: ${colors.primary};
      z-index: 1;
    }
  }
`;

export const InputWrapper = styled.div`
  width: 0;
  height: 0;
  overflow: hidden;
`;

export const Wrapper = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 1rem;
  width: 100%;
`;

export const OptionsWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
`;
