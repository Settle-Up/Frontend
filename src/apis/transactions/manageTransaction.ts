import axiosInstance from "@apis/axiosConfig";

type ManageTransactionRequest = {
  groupId: string;
  transactionId: string;
  approvalUser: "sender" | "recipient";
};

type ManageTransactionResponse = ClearedTransaction;

export const manageTransaction = async ({
  groupId,
  transactionId,
  approvalUser,
}: ManageTransactionRequest): Promise<ManageTransactionResponse> => {
  try {
    const response = await axiosInstance.patch(
      `transactions/${groupId}/manage`,
      {
        transactionId,
        approvalUser,
      }
    );
    return response.data.data.transactionUpdateList[0];
  } catch (error) {
    throw new Error("Failed to update transaction status");
  }
};
