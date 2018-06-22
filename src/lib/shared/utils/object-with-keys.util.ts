export const objectWithKey = <T>(key: string, value: T): {[id: string]: T} => {
  return (Array.isArray(value) && value.length > 0) || (!Array.isArray(value) && value) ? { [key]: value } : {};
};
