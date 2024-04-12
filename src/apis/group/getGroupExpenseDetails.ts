import axiosInstance from "@apis/axiosConfig";

const transformExpenseForClient = (serverData: any): ExisitingGroupExpense => {
  const { receiptId, totalPrice, receiptItemList, ...rest } = serverData;

  const uniqueUsers = new Map();
  const itemOrderDetailsList = receiptItemList.map((item: any) => {
    const {
      totalItemQuantity,
      receiptItemName,
      jointPurchaserList,
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
      itemName: receiptItemName,
      itemQuantity: totalItemQuantity,
      jointPurchaserList,
      ...restItem,
    };
  });

  return {
    ...rest,
    expenseId: receiptId,
    receiptTotalPrice: totalPrice,
    itemOrderDetailsList,
    expenseParticipantList: Array.from(uniqueUsers.values()),
  };
};

type GroupExpenseRequest = {
  receiptId: string;
};

type GroupExpenseResponse = {
  groupExpense: ExisitingGroupExpense;
};

export const getGroupExpenseDetails = async ({
  receiptId,
}: GroupExpenseRequest): Promise<GroupExpenseResponse> => {
  try {
    const response = await axiosInstance.get(
      `/group/detail?receipt=${receiptId}`
    );
    console.log(response.data);

    const transformedData = transformExpenseForClient(response.data.data);
    return { groupExpense: transformedData };
  } catch (error) {
    throw new Error("Failed to get Group Expense");
  }
};
