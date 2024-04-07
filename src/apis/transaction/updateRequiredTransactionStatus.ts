import axiosInstance from "@apis/axiosConfig";

export const updateRequiredTransactionStatus = async ({
  groupId,
  transactionId,
  approvalUser,
  approvalStatus
}: {
  groupId: string;
  transactionId: string;
  approvalUser: "sender" | "recipient";
  approvalStatus: "CLEAR" | "REJECT";
}): Promise<boolean> => {
  try {
    const response = await axiosInstance.patch(`transaction/approval?groupId=${groupId}`, {
      transactionId: transactionId,
      approvalUser: approvalUser,
      approvalStatus: approvalStatus
    });
    console.log(response.data);
    return response.data.success;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update transaction status");
  }
};
