import axiosInstance from "@apis/axiosConfig";
import { AxiosError } from 'axios';

export const getGroupSummaryList = async (): Promise<JoniedGroupSummaryList> => {
  try {
    const response = await axiosInstance.get(`/group/list/summary`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
        throw new Error(`Failed to sign in user: ${error.response?.status} - ${error.response?.statusText}`);
      } else {
        throw new Error('Failed to sign in user');
      }  }
};