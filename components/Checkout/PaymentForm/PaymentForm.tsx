import classNames from '@sindresorhus/class-names';
import { CardElement, IdealBankElement } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent, StripeIdealBankElementChangeEvent } from '@stripe/stripe-js';
import React, { memo, useState } from 'react';

import Button from '#root/components/Button';

import { MethodOptions, MethodWrapper, STRIPE_CARD_STYLE, Wrapper } from './_styles';
import Alert from '#root/components/Alert';

type PaymentMethod = 'card' | 'ideal';

interface Props {
  disabled: boolean;
  method: PaymentMethod;
  onChange: (event: { isValid?: boolean; method?: PaymentMethod }) => void;
  showError: boolean;
}

const PaymentForm = ({ disabled, method, onChange: pushChange, showError }: Props) => {
  const [focus, setFocus] = useState(false);

  const classes = classNames({ focus, disabled });

  const onBlur = () => setFocus(false);

  const onMethodChange = (newMethod: PaymentMethod) =>
    pushChange({ method: newMethod, isValid: false });

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
      {showError && <Alert message="Please provide a valid payment method" type="error" />}
    </Wrapper>
  );
};

PaymentForm.whyDidYouRender = true;

export default memo(PaymentForm);
