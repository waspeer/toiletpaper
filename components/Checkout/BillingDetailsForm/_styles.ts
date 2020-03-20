import { CountryDropdown as UnstyledCountryDropdown } from 'react-country-region-selector';
import styled from 'styled-components';

import { colors } from '#root/style';

export const CountryDropdown = styled(UnstyledCountryDropdown)`
  appearance: none;
  background: whitesmoke
    url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjMiPjxwYXRoIGQ9Im0gMCwxIDEsMiAxLC0yIHoiLz48L3N2Zz4=)
    no-repeat scroll 95% center/10px 15px;
  background-position-x: 95%;
  background-position-y: center;
  background-position: calc(100% - 15px) center;
  border-radius: 2px;
  border: 1px solid grey;
  box-sizing: border-box;
  color: ${colors.dark};
  cursor: pointer;
  font-family: inherit;
  font-feature-settings: 'tnum';
  font-size: 0.875rem;
  font-variant: tabular-nums;
  height: 2.2em;
  line-height: 1.5715;
  padding: 0.25rem 0.7rem;
  transition: all 0.3s;
  width: 100%;

  &:disabled {
    background-color: whitesmoke;
    color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;

    &:hover {
      border-color: grey;
    }
  }
`;

export const Wrapper = styled.div`
  margin-bottom: 2.5rem;

  & > * {
    margin-bottom: 1em;
    background-color: whitesmoke;
  }
`;

export const InputRow = styled.div`
  background-color: transparent;
  display: flex;
  flex-flow: row nowrap;

  & > * {
    background-color: whitesmoke;
    flex: 1;
    margin: 0 0.5rem;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`;
