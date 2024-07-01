import { useRecoilValue } from 'recoil';
import { userProfileState } from '@store/userStore';

export const useFormatNumberAsKoreanWon = () => {
  const userProfile = useRecoilValue(userProfileState);

  return (value: string | number): string => {
    const numericValue = typeof value === "string" ? parseFloat(value) : value;
    const isNegative = numericValue < 0;

    if (isNaN(numericValue)) {
      return "";
    }

    const showDecimals = userProfile?.isDecimalInputOption ?? false;

    const formattedValue = Math.abs(numericValue).toLocaleString("ko-KR", {
      maximumFractionDigits: showDecimals ? 2 : 0,
      useGrouping: true,
    });

    return isNegative ? `- ${formattedValue}₩` : `${formattedValue}₩`;
  };
};
