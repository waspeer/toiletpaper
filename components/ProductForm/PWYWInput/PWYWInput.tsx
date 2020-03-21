import styled from 'styled-components';
import getSymbolFromCurrency from 'currency-symbol-map';
import React, { memo } from 'react';

import { DISCOUNT } from '#root/lib/constants';
import InputNumber from '#root/components/InputNumber';
import { Paragraph } from '#root/components/Typography';
import { colors } from '#root/style';

interface Props {
  currencyCode: string;
  price: number;
  onChange: (value: number) => void;
  value: number;
}

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const Wrapper = styled.div`
  margin-bottom: 1.25rem;
`;

export const Title = styled.div`
  color: ${colors.dark.fade(0.3)};
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;

const Symbol = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  font-feature-settings: 'tnum';
  font-size: 1rem;
  font-variant: tabular-nums;
  color: ${colors.dark};
  justify-content: center;
  width: 2rem;
  flex-direction: column;
  pointer-events: none;
`;

export const OldPrice = styled.div`
  color: ${colors.dark.fade(0.5)};
  font-weight: bold;
  margin-right: 0.5rem;
  text-decoration: line-through;
  transform: rotate(-5deg);

  &::after {
    content: '→';
    display: inline-block;
    margin-left: 0.5rem;
    text-decoration: none;
    transform: rotate(5deg);
  }
`;

const PWYWInput = ({ currencyCode, price, onChange, value }: Props) => {
  const currencySymbol = getSymbolFromCurrency(currencyCode);

  const minPrice = price * DISCOUNT;

  const formatPriceAmount = new Intl.NumberFormat('nl-Nl', {
    style: 'currency',
    currency: currencyCode,
  }).format;

  return (
    <Wrapper>
      <Title>Amount</Title>
      <Paragraph>
        You can choose the amount you want to pay with a minimum of {formatPriceAmount(minPrice)}.
        Our special discount has already been applied.{' '}
        <strong>Everything you decide to add to this will help us out a lot! ♥</strong>
      </Paragraph>
      <div style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
        <OldPrice>{formatPriceAmount(price)}</OldPrice>
        <InputWrapper>
          <InputNumber
            min={minPrice}
            onChange={onChange}
            precision={2}
            style={{ paddingLeft: '1.5rem' }}
            value={value}
          />
          <Symbol>{currencySymbol || currencyCode}</Symbol>
        </InputWrapper>
      </div>
    </Wrapper>
  );
};

PWYWInput.whyDidYouRender = true;

export default memo(PWYWInput);
