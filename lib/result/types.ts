export interface ErrorObject<T extends string> {
  type: T;
  message: string;
}

export interface FailedResult<T extends string> {
  success: false;
  error: ErrorObject<T>;
}

export interface SuccessResult<T = any> {
  success: true;
  payload: T;
}

export type Result<S, F extends string> = SuccessResult<S> | FailedResult<F>;

export type UnexpectedErrorType = 'UNEXPECTED_ERROR';
