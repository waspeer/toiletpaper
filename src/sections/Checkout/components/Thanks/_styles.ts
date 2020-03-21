import styled from 'styled-components';

export const Wrapper = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin-top: 5rem;
  text-transform: uppercase;
  text-align: center;

  & > *:first-child {
    margin-bottom: 2.5rem;
  }
`;
