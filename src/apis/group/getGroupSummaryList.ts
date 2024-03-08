import axiosInstance from "@apis/axiosConfig";

export const getGroupSummaryList =
  async (): Promise<JoniedGroupSummaryList> => {
    try {
      const response = await axiosInstance.get(`/group/list/summary`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to get Group Summary List");
    }
  };
