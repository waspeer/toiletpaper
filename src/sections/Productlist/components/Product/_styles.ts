import styled from 'styled-components';
import { colors } from '#root/style';

export const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 1.25rem;
  position: relative;

  & img {
    max-width: 100%;
  }

  & h3 {
    text-align: center;
  }
`;

export const ImageWrapper = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

export const OldPrice = styled.span`
  display: inline;
  text-decoration: line-through;
  margin: 0.5rem;
`;

export const NewPrice = styled.span`
  display: inline-block;
  font-weight: bold;
  font-size: 1rem;
  color: ${colors.dark};
  margin: 0.5rem;
  transform: rotate(-5deg);
`;

export const PriceWrapper = styled.div`
  font-size: 0.825rem;
  color: ${colors.dark.fade(0.3)};
  text-align: center;
`;
