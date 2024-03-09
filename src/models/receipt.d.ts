type ReceiptItem = {
  itemName: string;
  unitPrice: string;
  itemQuantity: string;
  itemTotalPrice: string;
};

type NewReceipt = {
  receiptName: string;
  address: string;
  receiptDate: string;
  receiptTotalPrice: string;
  discountApplied: string;
  actualPaidPrice: string;
  itemList: ReceiptItem[];
};

