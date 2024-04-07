import axiosInstance from "@apis/axiosConfig";
import dayjs from "dayjs";

type GroupSummaryListRequest = {
  page: number;
};

const GROUP_PER_PAGE = 7;

export const getGroupSummaryList = async ({
  page,
}: GroupSummaryListRequest): Promise<GroupSummaryListResponse> => {
  try {
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

    console.log(processedGroupList);
    return { ...extractedResponse, groupList: processedGroupList };
  } catch (error) {
    throw new Error("Failed to get Group Summary List");
  }
};
