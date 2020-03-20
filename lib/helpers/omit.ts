const omit = <T extends Record<string, any>, K extends keyof T>(object: T, keys: K[]) => {
  const result = { ...object };
  keys.forEach((key) => delete result[key]);
  return result as Omit<T, K>;
};

export default omit;
