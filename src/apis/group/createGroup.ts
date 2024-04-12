import axiosInstance from "@apis/axiosConfig";

export const createGroup = async (newGroup: NewGroup) => {
  const currentUserId = sessionStorage.getItem("userId")!;

  let memberUserIds = newGroup.groupUserList.map((user) => user.userId);

  const requestData = {
    ...newGroup,
    groupMemberCount: newGroup.groupUserList.length + 1,
    groupUserList: [currentUserId, ...memberUserIds],
  };

  try {
    throw new Error("Simulated error");
    const response = await axiosInstance.post(`/group/create`, requestData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get create new group"); 
  }
};
