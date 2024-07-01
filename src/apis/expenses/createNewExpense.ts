import axiosInstance from "@apis/axiosConfig";

const transformExpenseForServer = (newExpense: NewExpense) => {
  const {
    groupId,
    groupName,
    payerUserId,
    payerUserName,
    receiptName,
    address,
    receiptDate,
    receiptTotalPrice,
    allocationType,
    itemList,
    // Omit the fields not required for the server
    ...rest
  } = newExpense;

  const serverAllocationType =
    allocationType === "Variable Quantity"
      ? "variableQuantity"
      : allocationType === "Equal Quantity"
      ? "equalQuantity"
      : "";


      const receiptItemList = itemList.map(
        ({
          itemName,
          unitPrice,
          itemQuantity,
          jointPurchaserList,
          ...itemRest
        }) => {
    
          return {
            ...itemRest,
            receiptItemName: itemName,
            unitPrice,
            totalItemQuantity: itemQuantity,
            jointPurchaserCount: jointPurchaserList?.length.toString(),
            jointPurchaserList,
          };
        }
    );
    

  return {
    ...rest,
    groupId,
    groupName,
    payerUserId,
    payerUserName,
    receiptName,
    address,
    receiptDate,
    totalPrice: receiptTotalPrice,
    actualPaidPrice: receiptTotalPrice,
    allocationType: serverAllocationType,
    receiptItemList,
  };
};

export const createNewExpense = async (newExpense: NewExpense) => {
  const transformedExpense = transformExpenseForServer(newExpense);


  try {
    const response = await axiosInstance.post(
      `/expenses`,
      transformedExpense
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create new expense");

  }
};
