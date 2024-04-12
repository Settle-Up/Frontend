import axiosInstance from "@apis/axiosConfig";
import dayjs from "dayjs";

type GroupSummaryListRequest = {
  page: number;
};

type GroupSummaryListResponse = {
  groupList: JoinedGroupSummary[];
  hasNextPage: boolean;
};

const GROUP_PER_PAGE = 11;

export const getGroupSummaryList = async ({
  page,
}: GroupSummaryListRequest): Promise<GroupSummaryListResponse> => {
  try {
    // if (page === 1) {
    //   throw new Error("Simulated error");
    // }

    const response = await axiosInstance.get(
      `/group/list/summary?page=${page}&size=${GROUP_PER_PAGE}`
    );
    const extractedResponse = response.data.data;

    const processedGroupList = extractedResponse.groupList.map(
      (group: any) => ({
        ...group,
        lastActive: group.lastActive ? dayjs(group.lastActive) : null,
      })
    );

    return { ...extractedResponse, groupList: processedGroupList };
  } catch (error) {
    throw new Error("Failed to get Group Summary List");
  }
};
