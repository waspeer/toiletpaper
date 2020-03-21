import getSymbolFromCurrency from 'currency-symbol-map';
import React, { memo } from 'react';

import InputNumber from '#root/components/InputNumber';
import Party from '#root/components/Party';
import { Paragraph } from '#root/components/Typography';

import { DonationLabel, FormWrapper, InputWrapper, Symbol, Wrapper } from './_styles';

interface Props {
  disabled: boolean;
  currencyCode: string;
  onChange: (value: number) => void;
  value: number;
}

const message: Map<'INITIAL' | 'DONATING', JSX.Element> = new Map([
  [
    'INITIAL',
    <>
      There are no products in you cart yet!
      <br />
      If you&apos;d like, it&apos;s also possible to donate without buying something from the store.
      Our love would be endless :)
    </>,
  ],
  [
    'DONATING',
    <strong>
      <span role="img" aria-label="heart">
        ♥️
      </span>{' '}
      WE LOVE YOU!!{' '}
      <span role="img" aria-label="heart">
        ♥️
      </span>{' '}
    </strong>,
  ],
]);

const DonationForm = ({ disabled, currencyCode, onChange, value }: Props) => {
  const currencySymbol = getSymbolFromCurrency(currencyCode);

  return (
    <Wrapper>
      <Paragraph>{message.get(value ? 'DONATING' : 'INITIAL')}</Paragraph>
      <FormWrapper>
        <DonationLabel htmlFor="donation">Donation</DonationLabel>
        <InputWrapper>
          <InputNumber
            disabled={disabled}
            id="donation"
            min={0}
            onChange={onChange}
            precision={2}
            style={{ paddingLeft: '1.5rem' }}
            value={value}
          />
          <Symbol>{currencySymbol || currencyCode}</Symbol>
        </InputWrapper>
      </FormWrapper>
      {!!value && <Party donation={value} />}
    </Wrapper>
  );
};

DonationForm.whyDidYouRender = true;

export default memo(DonationForm);
