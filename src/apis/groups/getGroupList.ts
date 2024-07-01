import axiosInstance from "@apis/axiosConfig";
import dayjs from "dayjs";

const GROUP_PER_PAGE = 100;

type GetGroupListRequest = {
  page: number;
}

export const getGroupList = async ({
  page}:GetGroupListRequest): Promise<PaginatedResponse<JoinedGroupSummary>> => {
  try {
    const response = await axiosInstance.get(`/groups`, {
      params: {
        page: page,
        size: GROUP_PER_PAGE,
      },
    });

    const extractedResponse = response.data.data;

    const processedGroupList = extractedResponse.groupList.map(
      (group: any) => ({
        ...group,
        lastActive: group.lastActive ? dayjs(group.lastActive) : null,
      })
    );

    return { ...extractedResponse, dataList: processedGroupList };
  } catch (error) {
    throw new Error("Failed to get Group List");
  }
};
