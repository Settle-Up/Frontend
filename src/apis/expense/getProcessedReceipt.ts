import axiosInstance from "@apis/axiosConfig";
import { AxiosError } from "axios";
import extractDataFromProcessReceipt from "@utils/extractDataFromProcessedReceipt";

export const getProcessedReceipt = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post(
      "/expense/azure/callback",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    const extractedData = extractDataFromProcessReceipt(response.data);
    console.log(
      "---------------- EXTRACTED DATA ----------------",
      extractedData
    );
    return extractedData;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        `Failed to sign in user: ${error.response?.status} - ${error.response?.statusText}`
      );
    } else {
      throw new Error("Failed to sign in user");
    }
  }
};
