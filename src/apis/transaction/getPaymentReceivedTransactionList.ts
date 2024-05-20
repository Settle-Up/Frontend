import axiosInstance from "@apis/axiosConfig";

export const getPaymentReceivedTransactionList = async (): Promise<
  UpdatedTransaction[]
> => {
  try {
    const response = await axiosInstance.get("/notifications/transactions/received");
    return response.data.data.transactionUpdateList;
  } catch (error) {
    throw new Error("Failed to get payment received transaction list");
  }
};
