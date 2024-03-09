import { v4 as uuidv4 } from 'uuid';

export const mergeReceiptInToExpense = (receiptData: NewReceipt, existingData: NewGroupExpense): NewGroupExpense => {
  return {
    ...existingData, 
    receiptName: receiptData.receiptName,
    address: receiptData.address,
    receiptDate: receiptData.receiptDate,
    receiptTotalPrice: receiptData.receiptTotalPrice,
    discountApplied: receiptData.discountApplied,
    actualPaidPrice: receiptData.actualPaidPrice,
    itemOrderDetailsList: receiptData.itemList.map(item => ({
      id: uuidv4(),  
      itemName: item.itemName,
      unitPrice: item.unitPrice,
      itemQuantity: item.itemQuantity,
      itemTotalPrice: item.itemTotalPrice,
      jointPurchaserCount: "0",
      jointPurchaserList: [],
    })),
  };
};
