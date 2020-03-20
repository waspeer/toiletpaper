import Link from 'next/link';
import React from 'react';

import { Title } from '#root/components/Typography';
import { Product as ShopifyProduct } from '#root/lib/shopify/types';

import { ImageWrapper, OldPrice, Wrapper, NewPrice, PriceWrapper } from './_styles';

interface Props {
  handle: ShopifyProduct['handle'];
  images: ShopifyProduct['images'];
  price: ShopifyProduct['variants'][0]['price'];
  title: ShopifyProduct['title'];
}

const DISCOUNT = 0.81;

const Product = ({ handle, images, price, title }: Props) => {
  const formatPriceAmount = new Intl.NumberFormat('nl-Nl', {
    style: 'currency',
    currency: price.currencyCode,
  }).format;

  const { src: imageSrc, altText: imageAltText } = images[0];
  return (
    <Link href="/products/[handle]" as={`/products/${handle}`}>
      <Wrapper>
        <ImageWrapper>
          <img src={imageSrc} alt={imageAltText} />
        </ImageWrapper>
        <Title level={3}>{title}</Title>
        <PriceWrapper>
          (<OldPrice>{formatPriceAmount(price.amount)}</OldPrice> →
          <NewPrice>{formatPriceAmount(price.amount * DISCOUNT)}</NewPrice>)
        </PriceWrapper>
      </Wrapper>
    </Link>
  );
};

export default Product;
