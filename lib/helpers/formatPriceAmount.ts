export const formatPriceAmount = (amount: number, currencyCode: string) =>
  new Intl.NumberFormat('nl-Nl', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);

export const createPriceFormatter = (currencyCode: string) => (amount: number) =>
  formatPriceAmount(amount, currencyCode);
