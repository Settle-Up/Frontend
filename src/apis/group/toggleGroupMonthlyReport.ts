import axiosInstance from "@apis/axiosConfig";

type GroupMonthlyReportRequest = {
  groupId: string;
  isEnabled: boolean;
};

type GroupMonthlyReportResponse = {
  isMonthlyReportUpdateOn: boolean;
};

export const toggleGroupMonthlyReport = async ({
  groupId,
  isEnabled,
}: GroupMonthlyReportRequest): Promise<GroupMonthlyReportResponse> => {
  try {
    const response = await axiosInstance.patch(
      `/group/alarm?groupId=${groupId}`,
      {
        isMonthlyReportUpdateOn: isEnabled,
      }
    );
    console.log(response.data);
    return {
      isMonthlyReportUpdateOn: response.data.data.isMonthlyReportUpdateOn,
    };
  } catch (error) {
    throw new Error("Failed to toggle group monthly report");
  }
};
