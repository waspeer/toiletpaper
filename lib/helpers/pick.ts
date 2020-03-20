const pick = <T extends Record<string, any>, K extends keyof T>(object: T, keys: K[]) => {
  return keys.reduce((acc, key) => {
    acc[key] = object[key];
    return acc;
  }, {} as Pick<T, K>);
};

export default pick;
