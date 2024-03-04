import axiosInstance from "@apis/axiosConfig";
import { AxiosError } from 'axios';

export const signIn = async (authCode: string) => {
  try {
    console.log("sign in api fired")
    const response = await axiosInstance.get(`/auth/kakao/callback?code=${authCode}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
        throw new Error(`Failed to fetch group summary list: ${error.response?.status} - ${error.response?.statusText}`);
      } else {
        throw new Error('Failed to fetch group summary list');
      }  }
};