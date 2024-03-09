type AllocationType = "VariableQuantity" | "EqualQuantity" | "";

type PurchaserDetails = {
  userId: string;
  purchasedQuantity?: string | undefined;
};

type ItemOrderDetails = {
  id: string;
  itemName: string;
  unitPrice: string;
  itemQuantity: string;
  itemTotalPrice: string;
  jointPurchaserCount?: string;
  jointPurchaserList?: PurchaserDetails[];
};

type GroupExpenseBase = {
  groupId: string;
  groupName: string;
  payerId: string;
  payerName: string;
  receiptName: string;
  address: string;
  receiptDate: string;
  receiptTotalPrice: string;
  discountApplied: string;
  actualPaidPrice: string;
  allocationType: AllocationType;
  itemOrderDetailsList: ItemOrderDetails[];
};

type NewGroupExpense = GroupExpenseBase & {
  receiptImgFile: File | null
};

type ExisitingGroupExpense = GroupExpenseBase & {
  id: string;
  submissionDate: string;
};
