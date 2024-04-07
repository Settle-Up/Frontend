import axiosInstance from "@apis/axiosConfig";

const transformExpenseForServer = (newExpense: NewGroupExpense) => {
  const {
    groupId,
    groupName,
    payerUserId,
    payerUserName,
    receiptName,
    address,
    receiptDate,
    receiptTotalPrice,
    discountApplied,
    actualPaidPrice,
    allocationType,
    itemOrderDetailsList,
    // Omit the fields not required for the server
    receiptImgFile,
    expenseParticipantList,
    ...rest
  } = newExpense;

  const serverAllocationType =
    allocationType === "Variable Quantity"
      ? "variableQuantity"
      : allocationType === "Equal Quantity"
      ? "equalQuantity"
      : "";

  const receiptItemList = itemOrderDetailsList.map(
    ({
      itemName,
      unitPrice,
      itemQuantity,
      jointPurchaserList,
      itemId,
      itemTotalPrice,
      ...itemRest
    }) => ({
      receiptItemName: itemName,
      unitPrice,
      totalItemQuantity: itemQuantity,
      jointPurchaserCount: jointPurchaserList?.length.toString(),
      jointPurchaserList,
      ...itemRest,
    })
  );

  return {
    groupId,
    groupName,
    payerUserId,
    payerUserName,
    receiptName,
    address,
    receiptDate,
    totalPrice: receiptTotalPrice,
    discountApplied,
    actualPaidPrice,
    allocationType: serverAllocationType,
    receiptItemList,
    ...rest,
  };
};

export const createNewExpense = async (newExpense: NewGroupExpense) => {
  const transformedExpense = transformExpenseForServer(newExpense);

  console.log(transformedExpense);

  try {
    const response = await axiosInstance.post(
      `/expense/create`,
      transformedExpense
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
