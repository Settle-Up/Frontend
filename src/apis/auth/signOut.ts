import axiosInstance from "@apis/axiosConfig";

export const signOut = async (): Promise<string> => {
  try {
    const response = await axiosInstance.get("/logout");
    console.log(response.data);

    sessionStorage.clear();

    return response.data.success;
  } catch (error) {
    throw new Error("Failed to sign in user");
  }
};