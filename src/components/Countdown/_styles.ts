import styled from 'styled-components';

import { colors } from '#root/style';

export const Wrapper = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 2px;
  border: 1px solid ${colors.secondary};
  color: ${colors.secondary};
  display: inline-block;
  font-family: Arial, Helvetica, sans-serif;
  font-feature-settings: 'tnum';
  font-size: 1.5rem;
  font-variant: tabular-nums;
  font-weight: bold;
  opacity: 0.8;
  padding: 0.5rem 1rem;

  p {
    margin: 0 0 0.5rem 0;
  }

  span:first-child {
    margin-right: 0.5em;
  }

  span:last-child {
    margin-left: 0.5em;
  }
`;
