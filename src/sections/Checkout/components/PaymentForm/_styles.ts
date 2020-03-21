import stripejs from '@stripe/stripe-js';
import styled from 'styled-components';
import { fontFamily } from '#root/style/theme';
import { colors } from '#root/style';

export const MethodOptions = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 1.25rem;

  & > * {
    color: ${colors.dark.fade(0.3)};
    font-size: 0.9rem;
    font-weight: bold;
    flex: 1;
    padding-bottom: 0.75rem;
    text-align: center;
  }

  & *.active {
    border-bottom: 1px solid ${colors.primary};
  }
`;

export const MethodWrapper = styled.div`
  background: whitesmoke;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  border: 1px solid grey;
  border-radius: 4px;
  margin-bottom: 1em;
  padding: 1rem;
  transition: all 0.2s;

  &:hover {
    border-color: ${colors.primary};
  }

  &.focus {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px ${colors.primary.fade(0.8)};
    outline: 0;
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.7;

    &:hover {
      border-color: grey;
    }

    & * {
      pointer-events: none;
    }
  }
`;

export const STRIPE_CARD_STYLE: stripejs.StripeCardElementOptions['style'] = {
  base: {
    color: '#32325D',
    fontWeight: '500',
    fontFamily,
    fontSize: '16px',
    fontSmoothing: 'antialiased',
    fontVariant: 'tabular-nums',

    '::placeholder': {
      color: '#CFD7DF',
    },
  },
  invalid: {
    color: '#E25950',
  },
};

export const Wrapper = styled.div`
  margin-bottom: 2.5rem;
`;
