import styled from 'styled-components';
import { colors } from '#root/style';

export const Label = styled.div`
  font-weight: bold;
  min-width: 5rem;
  text-align: right;
`;

export const Value = styled.div`
  min-width: 5rem;
`;

export const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  margin-bottom: 0.5rem;

  &.total {
    font-size: 1.2rem;
    margin-top: 1.5rem;
    text-transform: uppercase;
  }

  ${Label},
  ${Value} {
    padding: 0 1rem;
  }
`;

export const Wrapper = styled.div`
  color: ${colors.dark.fade(0.3)};
  font-size: 0.9rem;
  font-variant: 'tabular-nums';
  margin-bottom: 2.5rem;
  margin-top: 1rem;
`;
