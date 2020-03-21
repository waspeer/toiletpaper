import { SuccessResult, ErrorObject, FailedResult } from './types';

export const ok = <T>(payload: T): SuccessResult<T> => ({ success: true, payload });

export const fail = <T extends string>(error: ErrorObject<T>): FailedResult<T> => ({
  success: false,
  error,
});
