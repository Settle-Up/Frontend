export const numberToString = (num: number): string => {
  return num.toString();
};

export const stringToNumber = (str: string): number => {
  const parsedNumber = parseFloat(str);
  return isNaN(parsedNumber) ? 0 : parsedNumber;
};
