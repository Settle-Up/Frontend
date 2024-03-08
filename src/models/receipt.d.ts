type ReceiptItem = {
  itemName: string;
  unitPrice: number;
  itemQuantity: number;
  itemTotalPrice: number;
};

type NewReceipt = {
  receiptName: string;
  address: string;
  receiptDate: string;
  receiptTotalPrice: number;
  discountApplied: number;
  actualPaidPrice: number;
  itemList: ReceiptItem[];
};

/* there seems no need for Receipt model; because this is part of the expense */
