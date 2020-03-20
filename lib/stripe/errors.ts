import { ErrorObject } from '#root/lib/result/types';

const createError = <T extends string, A>(
  type: T,
  messageCreator?: (...args: A[]) => string,
): ((...args: A[]) => ErrorObject<T>) => (...args) => ({
  type,
  message: messageCreator ? messageCreator(...args) : ((args[0] as unknown) as string),
});

export const ErrorTypes = {
  AmountTooLarge: 'AMOUNT_TOO_LARGE' as const,
  AmountTooSmall: 'AMOUNT_TOO_SMALL' as const,
  ApiUnavailable: 'API_UNAVAILABLE' as const,
  ApiError: 'API_ERROR' as const,
  BadImplementation: 'BAD_IMPLEMENTATION' as const,
  CountryUnsupported: 'COUNTRY_UNSUPPORTED' as const,
  PaymentMethodError: 'PAYMENT_METHOD_ERROR' as const,
  PaymentFailed: 'PAYMENT_FAILED' as const,
  ValidationError: 'VALIDATION_ERROR' as const,
  UnexpectedError: 'UNEXPECTED_ERROR' as const,
};

export type ErrorTypes = typeof ErrorTypes extends { [key: string]: infer T } ? T : string;

export const AmountTooLarge = createError(ErrorTypes.AmountTooLarge);

export const AmountTooSmall = createError(
  ErrorTypes.AmountTooSmall,
  (message?: string) =>
    message ||
    'The specified amount is less than the minimum amount allowed. Use a higher amount and try again.',
);

export const ApiError = createError(ErrorTypes.ApiError, (e: any) => {
  console.error(e);
  return 'There was a problem with the api';
});

export const ApiUnavailable = createError(
  ErrorTypes.ApiUnavailable,
  () => 'Stripe API could not be reached.',
);

export const BadImplementation = createError(ErrorTypes.BadImplementation, (e: any) => {
  console.error(e);
  return 'The request could not be fulfilled beacuse of an error on our end';
});

export const CountryUnsupported = createError(
  ErrorTypes.CountryUnsupported,
  (message?: string) =>
    message ||
    'Your platform attempted to create a custom account in a country that is not yet supported.',
);

export const PaymentMethodError = createError(
  ErrorTypes.PaymentMethodError,
  (message?: string) => message || 'There was a problem with your payment method.',
);

export const PaymentFailed = createError(
  ErrorTypes.PaymentFailed,
  (message?: string) => message || 'There was a problem processing your payment. Please try again.',
);

export const ValidationError = createError(
  ErrorTypes.ValidationError,
  (message: string) => message,
);

export const UnexpectedError = createError(ErrorTypes.UnexpectedError, (e: any) => {
  console.trace();
  console.error('Unexpected error:', e);
  return 'An unexpected error occured';
});
