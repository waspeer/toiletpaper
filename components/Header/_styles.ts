import styled from 'styled-components';

import { colors } from '#root/style';

export const Wrapper = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');

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
    border-image: url('/paper-border2.png') 160 160 160 160 repeat repeat;
  }
`;

export const Menu = styled.ul`
  list-style: none;

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
