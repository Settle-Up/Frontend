import axiosInstance from "@apis/axiosConfig";
import { AxiosError } from "axios";

export const searchUserEmailList = async (query: string): Promise<GeneralUser[]> => {
  try {
    const response = await axiosInstance.get(`/?search=${query}`);
    return response.data.data.searchList;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        `Failed to get email list: ${error.response?.status} - ${error.response?.statusText}`
      );
    } else {
      throw new Error("Failed to get email list");
    }
  }
};
