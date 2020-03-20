import React, { memo } from 'react';

import { createPriceFormatter } from '#root/lib/helpers';

import { Label, Row, Value, Wrapper } from './_styles';

interface Props {
  currencyCode: string;
  donation: number;
  productTotal: number;
  shippingCosts: number;
}

const OrderSummary = ({ currencyCode, donation, productTotal, shippingCosts }: Props) => {
  const formatPriceAmount = createPriceFormatter(currencyCode);

  const total = donation + productTotal + shippingCosts;

  return (
    <Wrapper>
      <Row>
        <Label>Subtotal:</Label>
        <Value>{formatPriceAmount(productTotal + donation)}</Value>
      </Row>

      <Row>
        <Label>Shipping:</Label>
        <Value>{formatPriceAmount(shippingCosts)}</Value>
      </Row>

      <Row className="total">
        <Label>Total:</Label>
        <Value>{formatPriceAmount(total)}</Value>
      </Row>
    </Wrapper>
  );
};

OrderSummary.whyDidYouRender = true;

export default memo(OrderSummary);
