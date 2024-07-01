import { atom } from "recoil";

export const newExpenseState = atom<NewExpense>({
  key: "newExpense",
  default: {
    receiptImgFile: null,
    expenseParticipantList: [],
    groupId: "",
    groupName: "",
    payerUserId: "",
    payerUserName: "",
    receiptName: "",
    address: "",
    receiptDate: "",
    receiptTotalPrice: "",
    allocationType: "",
    itemList: [],
    discountApplied: "0",
    actualPaidPrice: "0"
  },
});

export const isNewExpenseFormFlowInitiatedState = atom({
  key: "isNewExpenseFormFlowInitiatedState",
  default: false,
});
