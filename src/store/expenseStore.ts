import { atom } from "recoil";
import mockExpense from "@mock/receiptMock";

export const newExpenseState = atom<NewGroupExpense>({
  key: "newExpense",
  default: mockExpense
});


