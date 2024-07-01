import axiosInstance from "@apis/axiosConfig";

export const getGroupMemberList = async (
  groupId: string
): Promise<GeneralUser[]> => {
  try {
    const response = await axiosInstance.get(
      `groups/${groupId}/members`
    );
    return response.data.data.memberList;
  } catch (error) {
    throw new Error("Failed to get Group Summary List");
  }
};
