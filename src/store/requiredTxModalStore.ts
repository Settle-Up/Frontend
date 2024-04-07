import { atom } from "recoil";

type RequiredTxModalState = {
  isOpen: boolean;
  selectedTransaction: RequiredTransaction | null;
  transactionUpdateSuccess: string | null;
};

export const requiredTxModalState = atom<RequiredTxModalState>({
  key: "requiredTxModalState",
  default: {
    isOpen: false,
    selectedTransaction: null,
    transactionUpdateSuccess: null,
  },
});
