import axiosInstance from "@apis/axiosConfig";

export const signOut = async (): Promise<string> => {
  try {
    const response = await axiosInstance.post("/auth/logout");

    sessionStorage.clear();

    return response.data.success;
  } catch (error) {
    throw new Error("Failed to sign in user");
  }
};
