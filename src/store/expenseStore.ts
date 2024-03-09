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
    receiptTotalPrice: "",
    discountApplied: "",
    actualPaidPrice: "",
    allocationType: "",
    itemOrderDetailsList: [],
  },
});


