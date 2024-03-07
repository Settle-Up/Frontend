import axiosInstance from "@apis/axiosConfig";
import { AxiosError } from 'axios';

// might need to add response type later on 
export const createNewGroup = async (newGroup : NewGroup)  => {
  try {
    const response = await axiosInstance.post(`/group/create`, newGroup);
    console.log(response.data)
    return response.data;
   
  } catch (error) {
    if (error instanceof AxiosError) {
        throw new Error(`Failed to sign in user: ${error.response?.status} - ${error.response?.statusText}`);
      } else {
        throw new Error('Failed to sign in user');
      }  }
};