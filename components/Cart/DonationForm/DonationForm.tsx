import getSymbolFromCurrency from 'currency-symbol-map';
import React, { memo } from 'react';

import InputNumber from '#root/components/InputNumber';
import Party from '#root/components/Party';
import { Paragraph } from '#root/components/Typography';

import { DonationLabel, FormWrapper, InputWrapper, Symbol, Wrapper } from './_styles';

interface Props {
  disabled: boolean;
  currencyCode: string;
  initialDonation: number;
  onChange: (value: number) => void;
  value: number;
}

type Status = 'INITIAL' | 'LOWERED' | 'NOT_YET' | 'REMOVED' | 'TOPPED' | 'UNKNOWN';

const calculateStatus = ({
  initialDonation,
  value,
}: Pick<Props, 'initialDonation' | 'value'>): Status => {
  if (initialDonation !== 0 && value === 0) return 'REMOVED';
  if (initialDonation === 0 && value === 0) return 'NOT_YET';
  if (initialDonation === value) return 'INITIAL';
  if (initialDonation > value) return 'LOWERED';
  if (initialDonation < value) return 'TOPPED';
  return 'UNKNOWN';
};

const message: Map<Status, JSX.Element> = new Map([
  [
    'INITIAL',
    <>
      OMG!{' '}
      <span role="img" aria-label="heart">
        ♥️
      </span>{' '}
      You&apos;re the best for helping us out with this donation.
      <br /> You can edit your donation below.
    </>,
  ],
  ['LOWERED', <>Thank you for supporting us! :)</>],
  [
    'NOT_YET',
    <>
      Thank you for supporting us! :)
      <br /> Please consider adding a donation to keep us going.{' '}
    </>,
  ],
  [
    'REMOVED',
    <>
      Aah.. no donation this time.
      <br /> We still love you and we hope you&apos;ll enjoy your order! :)
    </>,
  ],
  [
    'TOPPED',
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
  ['UNKNOWN', <>Thank you for supporting us! :) </>],
]);

const DonationForm = ({ disabled, currencyCode, initialDonation, onChange, value }: Props) => {
  const status = calculateStatus({ initialDonation, value });

  const currencySymbol = getSymbolFromCurrency(currencyCode);

  return (
    <Wrapper>
      <Paragraph>{message.get(status)}</Paragraph>
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
      {status === 'TOPPED' && <Party donation={value} />}
    </Wrapper>
  );
};

DonationForm.whyDidYouRender = true;

export default memo(DonationForm);
