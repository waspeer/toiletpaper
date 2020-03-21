/* eslint-disable react/no-danger */
import React, { useCallback, useState } from 'react';

import Button from '#root/components/Button';
import Party from '#root/components/Party';
import { Title, Paragraph } from '#root/components/Typography';
import { useCart } from '#root/lib/cart';
import { DISCOUNT } from '#root/lib/constants';
import useNotifications from '#root/lib/hooks/useNotifications';
import { client as shopifyClient } from '#root/lib/shopify';
import { Product as ShopifyProduct, ProductVariant } from '#root/lib/shopify/types';

import { ColLeft, ColRight, Wrapper, Info, Form } from './_style';
import OptionsForm from './OptionPicker';
import QuantityPicker from './QuantityPicker';
import PWYWInput from './PWYWInput';

interface Props {
  description: ShopifyProduct['description'];
  image: ShopifyProduct['images'][0];
  options: ShopifyProduct['options'];
  title: ShopifyProduct['title'];
  variants: ShopifyProduct['variants'];
}

const getInitialOptionState = (options: ShopifyProduct['options']) =>
  options.reduce((acc, { name, values }) => {
    // eslint-disable-next-line prefer-destructuring
    acc[name] = values[0];
    return acc;
  }, {} as Record<string, string>);

const ProductForm = ({ description, image, options, title, variants }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState(getInitialOptionState(options));

  const {
    available,
    id: variantId,
    price,
  }: ProductVariant = (shopifyClient.product as any).helpers.variantForOptions(
    { variants },
    selectedOptions,
  );

  const [quantity, setQuantity] = useState(1);

  const minPrice = price.amount * quantity * DISCOUNT;

  const [offer, setOffer] = useState(minPrice);

  const donation = offer > minPrice ? offer - minPrice : 0;

  const { addItemToCart } = useCart();

  const { notify } = useNotifications();

  const resetForm = () => {
    setQuantity(1);
    setOffer(price.amount * DISCOUNT);
  };

  const onSubmit = () => {
    addItemToCart({ variantId, donation, quantity });
    resetForm();
    notify('The item was added to your cart!');
  };

  const onOptionChange = useCallback(
    (name: string, value: string) => setSelectedOptions((state) => ({ ...state, [name]: value })),
    [],
  );

  return (
    <Wrapper>
      <ColLeft>
        <img alt={image.altText} src={image.src} />
      </ColLeft>
      <ColRight>
        <Title level={2}>{title}</Title>
        <Paragraph>{description}</Paragraph>
        <Form>
          {options
            .filter(({ values }) => values.length > 1)
            .map(({ name, values }) => (
              <OptionsForm
                key={`option-${name}`}
                name={name}
                onChange={onOptionChange}
                value={selectedOptions[name]}
                values={values}
              />
            ))}
          <QuantityPicker disabled={!available} value={quantity} onChange={setQuantity} />
          {!available && <Info>Sold out!..</Info>}
          {available && (
            <PWYWInput
              currencyCode={price.currencyCode}
              price={price.amount * quantity}
              value={offer}
              onChange={setOffer}
            />
          )}
          <Party donation={donation} />
          <Button block size="large" disabled={!available} type="primary" onClick={onSubmit}>
            Add to cart
          </Button>
        </Form>
      </ColRight>
    </Wrapper>
  );
};

ProductForm.whyDidYouRender = true;

export default ProductForm;
