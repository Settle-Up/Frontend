import axiosInstance from "@apis/axiosConfig";

const transformExpenseForClient = (serverData: any): ExisitingExpense => {
  const {receiptId, totalPrice, receiptItemList, allocationType, ...rest } = serverData;

  const uniqueUsers = new Map();
  const itemList = receiptItemList.map((item: any) => {
    const {
      totalItemQuantity,
      receiptItemName,
      jointPurchaserList,
      unitPrice,
      ...restItem
    } = item;

    jointPurchaserList.forEach((purchaser: PurchaserDetails) => {
      if (!uniqueUsers.has(purchaser.userId)) {
        uniqueUsers.set(purchaser.userId, {
          userId: purchaser.userId,
          userName: purchaser.userName,
        });
      }
    });

    return {
      ...restItem,
      itemName: receiptItemName,
      itemQuantity: totalItemQuantity,
      itemTotalPrice: unitPrice * totalItemQuantity,
      unitPrice,
      jointPurchaserList,
    };
  });

  return {
    ...rest,
    expenseId: receiptId,
    receiptTotalPrice: totalPrice,
    itemList,
    allocationType: allocationType === "variableQuantity"
    ? "Variable Quantity"
    : allocationType === "equalQuantity"
    ? "Equal Quantity"
    : "",
    expenseParticipantList: Array.from(uniqueUsers.values()),
  };
};

type GroupExpenseRequest = {
  expenseId: string;
};

type GroupExpenseResponse = {
  groupExpense: ExisitingExpense;
};

export const getGroupExpenseDetails = async ({
  expenseId,
}: GroupExpenseRequest): Promise<GroupExpenseResponse> => {
  try {
    const response = await axiosInstance.get(`/groups/expenses/${expenseId}`);

    const transformedData = transformExpenseForClient(response.data.data);
    return { groupExpense: transformedData };
  } catch (error) {
    throw new Error("Failed to get Group Expense");
  }
};
