import { atom } from "recoil";
import mockExpense from "@mock/expenseMock";

export const newExpenseState = atom<NewGroupExpense>({
  key: "newExpense",
  default: mockExpense
});


