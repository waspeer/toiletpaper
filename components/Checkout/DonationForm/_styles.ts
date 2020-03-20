import styled from 'styled-components';

import { colors } from '#root/style';

export const DonationLabel = styled.label`
  color: ${colors.dark.fade(0.5)};
  display: none;
  font-weight: bold;
  height: 2rem;
  margin-right: 0.5rem;
  margin-top: -1rem;
  position: absolute;
  right: 100%;
  top: 70%;
  transform: rotate(-5deg);
  width: 6rem;

  &::after {
    content: '→';
    display: inline-block;
    margin-left: 0.5rem;
    text-decoration: none;
    transform: rotate(5deg);
  }
`;

export const FormWrapper = styled.div`
  margin: 0 auto;
  position: relative;
  width: 50%;
`;

export const InputWrapper = styled.div`
  flex: 1;
  margin-bottom: 1.25rem;
  position: relative;
`;

export const Symbol = styled.div`
  bottom: 0;
  color: ${colors.dark};
  display: flex;
  flex-direction: column;
  font-feature-settings: 'tnum';
  font-size: 1rem;
  font-variant: tabular-nums;
  justify-content: center;
  left: 0;
  pointer-events: none;
  position: absolute;
  text-align: center;
  top: 0;
  width: 2rem;
`;

export const Wrapper = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;
