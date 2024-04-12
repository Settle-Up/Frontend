import axiosInstance from "@apis/axiosConfig";

export const toggleGroupMonthlyReport = async (
  groupId: string,
  isEnabled: boolean
): Promise<boolean> => {
  try {
    console.log("+++++++++++++++++++++ 보내짐")
    const response = await axiosInstance.patch(
      `/group/alarm?groupId=${groupId}`, {
        isMonthlyReportUpdateOn: isEnabled
      }
    );
    console.log(response.data);
    return response.data.success;
  } catch (error) {
    throw new Error("Failed to toggle group monthly report");
  }
};
