import axiosInstance from "@apis/axiosConfig";

type UpdateRequiredTransactionStatusRequest = {
  groupId: string;
  transactionId: string;
  approvalUser: "sender" | "recipient";
};

type UpdateRequiredTransactionStatusResponse = {
  success: boolean;
};

export const updateRequiredTransactionStatus = async ({
  groupId,
  transactionId,
  approvalUser
}: UpdateRequiredTransactionStatusRequest): Promise<UpdateRequiredTransactionStatusResponse> => {
  try {
    const response = await axiosInstance.patch(
      `transaction/manage?groupId=${groupId}`,
      {
        transactionId,
        approvalUser
      }
    );
    console.log(response.data);
    return response.data.success;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update transaction status");
  }
};
