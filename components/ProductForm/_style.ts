import { down, up } from 'styled-breakpoints';
import styled from 'styled-components';

import { colors } from '#root/style';

export const Wrapper = styled.div`
  display: grid;
  margin: 0 auto;
  max-width: 960px;

  ${up('md')} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ColLeft = styled.div`
  align-items: center;
  display: flex;
  overflow: hidden;

  ${up('md')} {
    margin-right: 0.5rem;
  }
`;

export const ColRight = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0.5rem;
  text-align: center;

  ${down('md')} {
    margin-left: 0;
    text-align: center;
  }
`;

export const Info = styled.div`
  color: ${colors.dark};
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;

export const Form = styled.div`
  max-width: 400px;
  width: 100%;
`;
