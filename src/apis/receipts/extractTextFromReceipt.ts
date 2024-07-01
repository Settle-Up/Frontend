import axiosInstance from "@apis/axiosConfig";
import extractDataFromProcessedReceipt from "@utils/extractDataFromProcessedReceipt";

export const extractTextFromReceipt = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post(
      "receipts/extract-text",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const extractedData = extractDataFromProcessedReceipt(response.data);
    return extractedData;
  } catch (error) {
    throw new Error("Failed to extract data from processed receipt");
  }
};
