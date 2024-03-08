import { atom } from "recoil";

export const newExpenseState = atom<NewGroupExpense>({
  key: "newExpense",
  default: {
    receiptImgFile: null,
    groupId: "",
    groupName: "",
    payerId: "",
    payerName: "",
    receiptName: "",
    address: "",
    receiptDate: "",
    receiptTotalPrice: 0,
    discountApplied: 0,
    actualPaidPrice: 0,
    allocationType: "",
    itemOrderDetailsList: [],
  },
});
