import axiosInstance from "@apis/axiosConfig";

type GroupDetailsRequest = {
  groupId: string;
};

type GroupDetailsResponse = {
  groupDetails: JoinedGroupDetails;
};


export const getGroupDetails = async ({
  groupId,
}: GroupDetailsRequest): Promise<GroupDetailsResponse> => {
  try {
    const response = await axiosInstance.get(
      `/group/overview?groupId=${groupId}`
    );
    
    return {groupDetails: response.data.data};
  } catch (error) {
    throw new Error("Failed to get Group Details");
  }
};
