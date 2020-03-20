import styled, { css } from 'styled-components';

import { colors } from '#root/style';

const wrapperStyles = css`
  margin: 0 auto;
  max-width: 500px;
`;

export const Form = styled.form`
  ${wrapperStyles}

  & .lineItems {
    margin-bottom: 2.5rem;
  }
`;

export const Wrapper = styled.div`
  ${wrapperStyles}
`;

export const Title = styled.div`
  color: ${colors.dark.fade(0.3)};
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  text-align: center;
`;
