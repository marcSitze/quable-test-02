export const formatString = (string) => {
  return string.toLowerCase().replace(/\s/gi, "_").replace(/[^\w]/gi, "");
};
