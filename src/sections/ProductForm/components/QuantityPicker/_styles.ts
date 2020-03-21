import styled from 'styled-components';

import { colors } from '#root/style';

export const Title = styled.div`
  color: ${colors.dark.fade(0.3)};
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;

export const Wrapper = styled.div`
  margin-bottom: 1.25rem;
  width: 100%;
`;
