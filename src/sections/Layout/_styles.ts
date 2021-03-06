import { down } from 'styled-breakpoints';
import styled from 'styled-components';

import { colors } from '#root/style';

export const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  & h1 {
    background-color: ${colors.primary};
    color: ${colors.background};
    font-family: 'Roboto Mono', monospace;
    font-weight: normal;
    font-size: 4rem;
    position: relative;
    border: 10px solid ${colors.background};
    border-style: solid;
    border-width: 10px 10px 10px 10px;
    border-image: url('/paper-border.png') 160 160 160 160 repeat repeat;

    ${down('md')} {
      font-size: 3rem;
    }
  }
`;

export const Menu = styled.ul`
  list-style: none;
  padding: 0;

  ${down('md')} {
    font-size: 0.825rem;
  }

  & a {
    color: ${colors.dark.fade(0.3)};
    text-decoration: none;
    transition: all 0.2s;

    &:hover {
      text-decoration: underline;
      color: ${colors.dark.fade(0.15)};
    }
  }
`;

export const MenuItem = styled.li`
  display: inline-block;
  padding: 0 2rem;
  text-transform: uppercase;
  font-weight: bold;
  font-style: italic;
  position: relative;

  &:not(:last-child)::after {
    content: '🧻';
    position: absolute;
    right: -0.5rem;
    font-style: normal;
    width: 1rem;
  }
`;

export const Ended = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column;
  height: 100vh;
  justify-content: center;
  text-align: center;
`;
