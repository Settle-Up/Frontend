import { atom } from "recoil";
import { mockUpdatedTransactions } from "@mock/transactionMock";

type UpdatedTransactionsAlertState  = {
  isOpen: boolean;
  updatedTransactionList: UpdatedTransaction[] | null,
};

export const updatedTransactionsAlertState = atom<UpdatedTransactionsAlertState>({
  key: "updatedTransactionsAlertState",
  default: {
    isOpen: false,
    updatedTransactionList: null,
  },
});
