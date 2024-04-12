import axiosInstance from "@apis/axiosConfig";

export const leaveGroup = async (
  groupId: string
): Promise<boolean> => {
  try {
    console.log("leave group")
    const response = await axiosInstance.delete(
      `group/remove?groupId=${groupId}`
    );
    console.log(response.data);
    return response.data.success;
  } catch (error) {
    throw new Error("Failed to leave group");
  }
};
