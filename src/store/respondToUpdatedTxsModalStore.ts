import { atom } from "recoil";

type RespondToUpdatedTxsModalState  = {
  isOpen: boolean;
  updatedTransactionList: UpdatedTransaction[] | null,
};

export const respondToUpdatedTxsModalState = atom<RespondToUpdatedTxsModalState>({
  key: "updatedTransactionsAlertState",
  default: {
    isOpen: false,
    updatedTransactionList: null,
  },
});

