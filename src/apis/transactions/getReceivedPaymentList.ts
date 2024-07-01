import axiosInstance from "@apis/axiosConfig";

export const getReceivedPaymentList = async (): Promise<
  ReceivedPayments
> => {
  try {
    const response = await axiosInstance.get("transactions/received");
    return { receivedPaymentList: response.data.data.transactionUpdateList };
  } catch (error) {
    throw new Error("Failed to get payment received transaction list");
  }
};
