import axiosInstance from "@apis/axiosConfig";

export const getUpdatedTransactionList = async (): Promise<
  UpdatedTransaction[]
> => {
  try {
    const response = await axiosInstance.get("/transaction/history");
    console.log(response.data);
    return response.data.data.transactionUpdateList;
  } catch (error) {
    throw new Error("Failed to get Group Summary List");
  }
};
