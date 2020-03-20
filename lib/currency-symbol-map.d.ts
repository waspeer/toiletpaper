declare module 'currency-symbol-map' {
  declare function getSymbolFromCurrency(currencyCode: string): string | undefined;
  export default getSymbolFromCurrency;
}
