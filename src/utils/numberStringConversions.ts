export const numberToString = (num: number): string => {
  return num.toString();
};

export const stringToNumber = (str: string): number => {
  const parsedNumber = parseFloat(str);
  return isNaN(parsedNumber) ? 0 : parsedNumber;
};

export const formatNumberWithLocaleAndNegatives = (value: string): string => {
  const isNegative = value.startsWith("-");
  const cleanedValue = value.replace(/[^\d.]/g, "");

  const formattedValue = parseFloat(cleanedValue).toLocaleString("ko-KR", {
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  return isNaN(parseFloat(cleanedValue))
    ? ""
    : isNegative
    ? `-${formattedValue}`
    : formattedValue;
};
