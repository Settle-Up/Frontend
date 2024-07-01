import axiosInstance from "@apis/axiosConfig";

export const createGroup = async (newGroup: NewGroup, currentUserId: string) => {

  const memberUserIds = newGroup.groupUserList.map((user) => user.userId);

  const requestData = {
    ...newGroup,
    groupMemberCount: newGroup.groupUserList.length + 1,
    groupUserList: [currentUserId, ...memberUserIds],
  };

  try {
    const response = await axiosInstance.post(`/groups`, requestData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get create new group"); 
  }
};
