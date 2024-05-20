import axios from "axios";
import axiosInstance from "@apis/axiosConfig";

export const leaveGroup = async (groupId: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.delete(`group/remove?groupId=${groupId}`);
    console.log(response.data);
    return response.data.success;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 409 && error.response?.data.message === "USER SETTLED REQUIRED") {
        throw new Error("USER SETTLED REQUIRED"); // Custom error message
      } else {
        throw new Error("Failed to leave group"); // Generic error message for other cases
      }
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};
