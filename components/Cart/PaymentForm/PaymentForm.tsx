import classNames from '@sindresorhus/class-names';
import { CardElement, IdealBankElement } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent, StripeIdealBankElementChangeEvent } from '@stripe/stripe-js';
import React, { useState } from 'react';

import Button from '#root/components/Button';

import { MethodOptions, MethodWrapper, STRIPE_CARD_STYLE, Wrapper } from './_styles';

type PaymentMethod = 'card' | 'ideal';

interface Props {
  disabled: boolean;
  method: PaymentMethod;
  onChange: (event: { isValid?: boolean; method?: PaymentMethod }) => void;
}

const PaymentForm = ({ disabled, method, onChange: pushChange }: Props) => {
  const [focus, setFocus] = useState(false);

  const classes = classNames({ focus, disabled });

  const onBlur = () => setFocus(false);

  const onMethodChange = (newMethod: PaymentMethod) => pushChange({ method: newMethod });

  const onSripeChange = (e: StripeCardElementChangeEvent | StripeIdealBankElementChangeEvent) =>
    pushChange({ isValid: e.complete });

  const onFocus = () => setFocus(true);

  return (
    <Wrapper>
      <MethodOptions>
        <Button
          className={method === 'card' ? 'active' : ''}
          type="link"
          onClick={() => onMethodChange('card')}
        >
          Card
        </Button>
        <Button
          className={method === 'ideal' ? 'active' : ''}
          type="link"
          onClick={() => onMethodChange('ideal')}
        >
          iDeal
        </Button>
      </MethodOptions>
      <MethodWrapper className={classes}>
        {method === 'ideal' && (
          <IdealBankElement
            onBlur={onBlur}
            onChange={onSripeChange}
            onFocus={onFocus}
            options={{ iconStyle: 'solid', style: STRIPE_CARD_STYLE }}
          />
        )}
        {method === 'card' && (
          <CardElement
            onBlur={onBlur}
            onChange={onSripeChange}
            onFocus={onFocus}
            options={{ iconStyle: 'solid', style: STRIPE_CARD_STYLE }}
          />
        )}
      </MethodWrapper>
    </Wrapper>
  );
};

PaymentForm.whyDidYouRender = true;

export default PaymentForm;
