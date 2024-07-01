import axios from "axios";
import axiosInstance from "@apis/axiosConfig";

export const leaveGroup = async (
  groupId: string
): Promise<JoinedGroupDetails> => {
  try {
    const response = await axiosInstance.delete(`groups/${groupId}`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (
        error.response?.status === 409 &&
        error.response?.data.message === "USER SETTLED REQUIRED"
      ) {
        throw new Error("USER SETTLED REQUIRED"); 
      } else {
        throw new Error("Failed to leave group");
      }
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};
