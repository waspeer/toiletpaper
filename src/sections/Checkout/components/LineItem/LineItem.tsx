import React, { memo } from 'react';

import { useCart } from '#root/lib/cart';
import { createPriceFormatter } from '#root/lib/helpers';
import { ProductVariant } from '#root/lib/shopify/types';

import { DeleteButton, Details, Donation, ImageWrapper, Wrapper } from './_styles';

interface Props {
  priceAmount: number;
  currencyCode: string;
  id: ProductVariant['id'];
  image: ProductVariant['image'];
  selectedOptions: ProductVariant['selectedOptions'];
  title: ProductVariant['title'];
  quantity: number;
}

const LineItem = ({
  priceAmount,
  currencyCode,
  id: variantId,
  image,
  selectedOptions,
  title,
  quantity,
}: Props) => {
  const { removeItemFromCart } = useCart();

  const formattedOptions = selectedOptions
    .filter(({ value }) => value !== 'Default Title')
    .map(({ name, value }) => `${name}: ${value}`);

  const handleDelete = () => removeItemFromCart(variantId);

  const formatPriceAmount = createPriceFormatter(currencyCode);

  return (
    <Wrapper>
      <ImageWrapper>
        <img src={image.src} alt={image.altText} />
      </ImageWrapper>
      <Details>
        <strong>{title}</strong>
        <br />
        <i>{formattedOptions}</i> x {quantity}
      </Details>
      <Donation>{formatPriceAmount(priceAmount)}</Donation>
      <DeleteButton onClick={handleDelete} />
    </Wrapper>
  );
};

LineItem.whyDidYouRender = true;

export default memo(LineItem);
