export const numberToString = (num: number | null | undefined): string => {
  if (num == null) {
    return "0";
  }
  return num.toString();
};

export const stringToNumber = (str: string): number => {
  const parsedNumber = parseFloat(str);
  return isNaN(parsedNumber) ? 0 : parsedNumber;
};

export const formatToKoreanWon = (value: string | number): string => {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  const isNegative = numericValue < 0;

  if (isNaN(numericValue)) {
    return "";
  }

  const formattedValue = Math.abs(numericValue).toLocaleString("ko-KR", {
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  return isNegative ? `- ${formattedValue}₩` : `${formattedValue}₩`;
};
