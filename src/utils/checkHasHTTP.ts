export const checkHasHTTP = (value: string) => {
  return value.includes('http') ? value : `https://${value}`;
};
