import axiosInstance from "@apis/axiosConfig";

// might need to add response type later on
export const createNewGroup = async (newExpense: any) => {
  try {
    const response = await axiosInstance.post(`/group/create`, newExpense);
    console.log(response.data);
    return response.data;
  } catch (error) {}
};
