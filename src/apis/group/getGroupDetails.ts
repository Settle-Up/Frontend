import axiosInstance from "@apis/axiosConfig";

export const getGroupDetails = async (
  groupId: string
): Promise<JoinedGroupDetails> => {
  try {
    const response = await axiosInstance.get(
      `/group/list/detail?groupId=${groupId}`
    );
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to get Group Details");
  }
};
