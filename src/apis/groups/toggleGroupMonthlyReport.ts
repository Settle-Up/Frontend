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
      `groups/${groupId}/monthly-reports`,
      {
        isMonthlyReportUpdateOn: isEnabled,
      }
    );
    return {
      isMonthlyReportUpdateOn: response.data.data.isMonthlyReportUpdateOn,
    };
  } catch (error) {
    throw new Error("Failed to toggle group monthly report");
  }
};
