import { atom } from "recoil";

type SettleTxModalState = {
  isOpen: boolean;
  selectedTransaction: RequiredTransaction | null;
  isTransactionSuccessfullySettled: boolean | null;
};

export const settleTxModalState = atom<SettleTxModalState>({
  key: "settleTxModalState",
  default: {
    isOpen: false,
    selectedTransaction: null,
    isTransactionSuccessfullySettled: null,
  },
});
