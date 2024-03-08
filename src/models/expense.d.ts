type AllocationType = "VariableQuantity" | "EqualQuantity" | "";

type PurchaserDetails = {
  userId: string;
  purchasedQuantity?: number | undefined;
};

type ItemOrderDetails = {
  id: string;
  itemName: string;
  unitPrice: number;
  itemQuantity: number;
  itemTotalPrice: number;
  jointPurchaserCount: number;
  jointPurchaserList: PurchaserDetails[];
};

type GroupExpenseBase = {
  groupId: string;
  groupName: string;
  payerId: string;
  payerName: string;
  receiptName: string;
  address: string;
  receiptDate: string;
  receiptTotalPrice: number;
  discountApplied: number;
  actualPaidPrice: number;
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
