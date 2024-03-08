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
  } catch (error) {}
};
