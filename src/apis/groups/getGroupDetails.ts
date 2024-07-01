import axiosInstance from "@apis/axiosConfig";

type GroupDetailsRequest = {
  groupId: string;
};

type GroupDetailsResponse = JoinedGroupDetails;

export const getGroupDetails = async ({
  groupId,
}: GroupDetailsRequest): Promise<GroupDetailsResponse> => {
  try {
    const response = await axiosInstance.get(`/groups/overview/${groupId}`);
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to get Group Details");
  }
};
