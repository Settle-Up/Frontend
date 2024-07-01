import { v4 as uuidv4 } from "uuid";

export const mergeReceiptInToExpense = (
  receiptData: NewReceipt,
  existingData: NewExpense
): NewExpense => {
  return {
    ...existingData,
    receiptName: receiptData.receiptName,
    address: receiptData.address,
    receiptDate: receiptData.receiptDate,
    receiptTotalPrice: receiptData.receiptTotalPrice,
    itemList: receiptData.itemList.map((item) => ({
      itemId: uuidv4(),
      itemName: item.itemName,
      unitPrice: item.unitPrice,
      itemQuantity: item.itemQuantity,
      itemTotalPrice: item.itemTotalPrice,
      jointPurchaserCount: "0",
      jointPurchaserList: [],
    })),
  };
};
