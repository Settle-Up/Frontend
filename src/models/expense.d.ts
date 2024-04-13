type AllocationType = "Variable Quantity" | "Equal Quantity" | ""; // if it's "Variable Quantity", I need to send "variableQuantity". if it's "Equal Quantity", I need to send "equalQuantity"

type PurchaserDetails = {
  userId: string;
  userName?: string; 
  purchasedQuantity?: string | undefined;
};

type ItemOrderDetails = {
  itemId: string; // --> don't need to include in the request body
  itemName: string; // --> change field name to receiptItemName
  unitPrice: string; 
  itemQuantity: string; // --> change field name to totalItemQuantity
  itemTotalPrice: string; // -> don't need to include in the request body 
  jointPurchaserCount?: string; // --> value should be jointPurchaserList.length
  jointPurchaserList?: PurchaserDetails[]; 
};

type CoreGroupExpenseDetails = {
  expenseParticipantList: GeneralUser[]; // -> don't need to include in the request body
  groupId: string; 
  groupName: string; 
  payerUserId: string; 
  payerUserName: string; 
  receiptName: string; 
  address: string; 
  receiptDate: string; //
  receiptTotalPrice: string; // --> change field name to totalPrice
  // discountApplied: string; 
  // actualPaidPrice: string; 
  allocationType: AllocationType; 
  itemOrderDetailsList: ItemOrderDetails[]; // --> change field name to receiptItemList
};

type NewGroupExpense = CoreGroupExpenseDetails & {
  receiptImgFile: File | null; // -> don't need to include in the request body
};

type ExisitingGroupExpense = CoreGroupExpenseDetails & {
  expenseId: string; // --> receiptUUID
  createdAt: string; 
};

type ItemsAllocationStatusMap = {
  [itemId: string]: {
    totalAllocatedQuantity: number;
    isItemFullyAllocated: boolean;
  };
};

type ParticipantItemLinkStatusMap = {
  [participantId: string]: boolean;
};

type VariableShareItemDetails = {
  itemName: string;
  unitPrice: string;
  purchasedQuantity: number;
  itemPurchasedCost: number;
};

type EqualShareItemDetails = {
  itemName: string;
  itemTotalPrice: string;
  jointPurchaserCount: number;
  itemPurchasedCost: number;
};

type ParticipantPurchaseDetails = {
  purchasedItemList: (VariableShareItemDetails | EqualShareItemDetails)[];
  totalPurchasedCost: number;
};
