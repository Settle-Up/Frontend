import axiosInstance from "@apis/axiosConfig";

// might need to add response type later on
export const createNewGroup = async (newGroup: NewGroup) => {
  try {
    const response = await axiosInstance.post(`/group/create`, newGroup);
    console.log(response.data);
    return response.data;
  } catch (error) {}
};
