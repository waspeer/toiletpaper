import { down } from 'styled-breakpoints';
import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  text-align: justify;
  text-align-last: center;

  ${down('md')} {
    padding: 0 1rem;
  }

  h1 {
    text-align: center;
  }
`;
