import React from 'react';

import useCart from '#root/lib/hooks/useCart';
import { ProductVariant } from '#root/lib/shopify/types';

import { DeleteButton, Details, ImageWrapper, Wrapper } from './_styles';

interface Props {
  id: ProductVariant['id'];
  image: ProductVariant['image'];
  selectedOptions: ProductVariant['selectedOptions'];
  title: ProductVariant['title'];
  quantity: number;
}

const LineItem = ({ id: variantId, image, selectedOptions, title, quantity }: Props) => {
  const { removeItemFromCart } = useCart();

  const formattedOptions = selectedOptions
    .filter(({ value }) => value !== 'Default Title')
    .map(({ name, value }) => `${name}: ${value}`);

  const handleDelete = () => removeItemFromCart({ variantId });

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
      <DeleteButton onClick={handleDelete} />
    </Wrapper>
  );
};

LineItem.whyDidYouRender = true;

export default LineItem;
