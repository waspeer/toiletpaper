/* eslint-disable react/no-this-in-sfc */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext } from 'react';

import { SHIPPING_COSTS } from '#root/lib/constants';
import useLocalStorage from '#root/lib/hooks/useLocalStorage';

import { EMPTY_CART, LOCAL_STORAGE_KEY } from './constants';
import { Cart, CartContext as CartContextObject } from './types';

const CartContext = createContext(EMPTY_CART as CartContextObject);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useLocalStorage<Cart>(LOCAL_STORAGE_KEY, EMPTY_CART);

  const context: CartContextObject = {
    ...cart,

    addItemToCart({ variantId, donation, quantity }) {
      setCart((previousCart) => {
        const products = new Map(previousCart.products);
        const previousQuantity = products.get(variantId)?.quantity || 0;
        products.set(variantId, {
          quantity: previousQuantity + quantity,
          donation: Math.floor(donation * 100) / 100,
        });
        return { ...previousCart, products: Array.from(products), donation: 0 };
      });
    },

    emptyCart() {
      setCart(({ billingDetails }) => ({ ...EMPTY_CART, billingDetails }));
    },

    removeItemFromCart(variantId) {
      setCart(({ products, ...rest }) => ({
        ...rest,
        products: products.filter(([id]) => id !== variantId),
      }));
    },

    setBillingDetails(name: string, value: string) {
      setCart(({ billingDetails, ...previousCart }) => ({
        ...previousCart,
        billingDetails: { ...billingDetails, [name]: value },
      }));
    },

    get shippingCosts() {
      return Object.keys(cart.products).length === 0 ? 0 : SHIPPING_COSTS;
    },

    setDonation(donation) {
      setCart((previousCart) => ({ ...previousCart, donation }));
    },
  };

  return <CartContext.Provider value={context}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};
