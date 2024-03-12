export const numberToString = (num: number): string => {
  return num.toString();
};

export const stringToNumber = (str: string): number => {
  const parsedNumber = parseFloat(str);
  return isNaN(parsedNumber) ? 0 : parsedNumber;
};

export const formatNumberInput = (value: string): string => {
  const cleanedValue = value.replace(/[^\d.]/g, '');
  
// console.log("cleaned value", cleanedValue)
// console.log( isNaN(parseFloat(cleanedValue)))
  
  const formattedValue = parseFloat(cleanedValue).toLocaleString('ko-KR', {
    maximumFractionDigits: 2, 
    useGrouping: true, 
  });

  return isNaN(parseFloat(cleanedValue)) ? '' : formattedValue;
};
