export interface ServerRequestObject<T extends string, P = any> {
  type: T;
  payload: P;
}
