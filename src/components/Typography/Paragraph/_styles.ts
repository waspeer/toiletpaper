import styled from 'styled-components';

import { colors } from '#root/style';

export const P = styled.p`
  color: ${colors.dark.fade(0.3)};
  margin-bottom: 1rem;
  font-size: 0.9rem;
  font-variant: tabular-nums;
  line-height: 1.5715;
  font-feature-settings: 'tnum';
`;
