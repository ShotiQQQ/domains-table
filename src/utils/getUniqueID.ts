export const getUniqueID = () => {
  return +Date.now().toString().substring(7);
};
