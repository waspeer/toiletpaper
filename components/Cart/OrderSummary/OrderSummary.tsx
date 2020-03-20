import React from 'react';

import { Label, Row, Value, Wrapper } from './_styles';

interface Props {
  currencyCode: string;
  donation: number;
  productTotal: number;
  shippingCosts: number;
}

const OrderSummary = ({ currencyCode, donation, productTotal, shippingCosts }: Props) => {
  const formatPriceAmount = new Intl.NumberFormat('nl-Nl', {
    style: 'currency',
    currency: currencyCode,
  }).format;

  const total = donation + productTotal + shippingCosts;

  return (
    <Wrapper>
      <Row>
        <Label>Subtotal:</Label>
        <Value>{formatPriceAmount(productTotal)}</Value>
      </Row>

      <Row>
        <Label>Donation:</Label>
        <Value>{formatPriceAmount(donation)}</Value>
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

export default OrderSummary;
