import axiosInstance from "@apis/axiosConfig";

type GetUserProfileResponse = CurrentUser;

export const getUserProfile = async (): Promise<GetUserProfileResponse> => {
  try {
    const response = await axiosInstance.get("/users/profile");
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user profile");
  }
};
