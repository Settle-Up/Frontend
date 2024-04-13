import axiosInstance from "@apis/axiosConfig";

type UpdateRequiredTransactionStatusRequest = {
  groupId: string;
  transactionId: string;
};

type UpdateRequiredTransactionStatusResponse = {
  success: boolean;
};

export const updateRequiredTransactionStatus = async ({
  groupId,
  transactionId,
}: UpdateRequiredTransactionStatusRequest): Promise<UpdateRequiredTransactionStatusResponse> => {
  try {
    const response = await axiosInstance.patch(
      `transaction/approval?groupId=${groupId}`,
      {
        transactionId: transactionId,
      }
    );
    console.log(response.data);
    return response.data.success;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update transaction status");
  }
};
