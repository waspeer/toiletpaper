import styled from 'styled-components';

import { colors } from '#root/style';

export const StyledLabel = styled.label`
  color: ${colors.dark.fade(0.3)};
  display: block;
  font-size: 0.9rem;
  margin-bottom: 1.25rem;

  *:first-child {
    margin-right: 0.5rem;
  }
`;
