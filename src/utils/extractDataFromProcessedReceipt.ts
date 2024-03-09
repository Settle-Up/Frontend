import { numberToString } from "@utils/numberStringConversions";

const extractDataFromProcessReceipt = (jsonObj: any): NewReceipt | null => {
  if (
    !jsonObj ||
    !jsonObj.analyzeResult ||
    !jsonObj.analyzeResult.documents
  ) {
    return null;
  }

  const document = jsonObj.analyzeResult.documents[0];
  const fields = document.fields;

  const receipt: NewReceipt = {
    receiptName: fields.MerchantName?.content || "",
    address: fields.MerchantAddress?.content || "",
    receiptDate: fields.TransactionDate?.valueDate || "",
    receiptTotalPrice: numberToString(fields.Subtotal?.valueNumber) || "0",
    discountApplied: "0",
    actualPaidPrice: numberToString(fields.Total?.valueNumber) || "0",
    itemList: [],
  };

  const items = fields.Items?.valueArray || [];
  items.forEach((item: any) => {
    const itemObject = item.valueObject;
    if (itemObject) {
      receipt.itemList.push({
        itemName: itemObject.Description?.valueString || "",
        unitPrice: numberToString(itemObject.Price?.valueNumber) || "0",
        itemQuantity: numberToString(itemObject.Quantity?.valueNumber) || "0",
        itemTotalPrice: numberToString(itemObject.TotalPrice?.valueNumber) || "0",
      });
    }
  });

  return receipt;
};

export default extractDataFromProcessReceipt;
