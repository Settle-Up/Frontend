import { atom } from "recoil";

type SettleTxModalState = {
  isOpen: boolean;
  selectedTransaction: RequiredTransaction | null;
  transactionUpdateSuccess: string | null;
};

export const settleTxModalState = atom<SettleTxModalState>({
  key: "settleTxModalState",
  default: {
    isOpen: false,
    selectedTransaction: null,
    transactionUpdateSuccess: null,
  },
});
