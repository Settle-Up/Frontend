type AllocationType = "Variable Quantity" | "Equal Quantity" | ""; 

type PurchaserDetails = {
  userId: string;
  userName?: string;
  purchasedQuantity?: string | undefined;
};

type Item = {
  itemId: string; 
  itemName: string; 
  unitPrice: string;
  itemQuantity: string; 
  itemTotalPrice: string; 
  jointPurchaserCount?: string; 
  jointPurchaserList?: PurchaserDetails[];
};

//variable 이면 quantity
//equal 이면 userid
type Expense = {
  expenseParticipantList: GeneralUser[]; 
  groupId: string;
  groupName: string;
  payerUserId: string;
  payerUserName: string;
  receiptName: string;
  address: string;
  receiptDate: string; 
  receiptTotalPrice: string; 
  discountApplied: string;
  actualPaidPrice: string;
  allocationType: AllocationType;
  itemList: Item[]; 
};

type NewExpense = Expense & {
  receiptImgFile: File | null; 
};

type ExisitingExpense = Expense & {
  expenseId: string; 
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
