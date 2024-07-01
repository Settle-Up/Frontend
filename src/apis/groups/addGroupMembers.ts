import axiosInstance from "@apis/axiosConfig";

type AddGroupMembersRequest = {
  groupId: string;
  groupName: string;
  groupUserList: string[];
};

type AddGroupMembersResponse = {
  success: boolean;
};

export const addGroupMembers = async ({
  groupId,
  groupName,
  groupUserList,
}: AddGroupMembersRequest): Promise<AddGroupMembersResponse> => {
  try {
    const response = await axiosInstance.post(
      `/groups/${groupId}/members`,
      {
        groupName,
        groupMemberCount: groupUserList.length,
        groupUserList,
      }
    );
    return response.data.success;
  } catch (error) {
    throw new Error("Failed to add new group memebers");
  }
};
