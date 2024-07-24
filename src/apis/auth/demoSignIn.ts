import axiosInstance from "@apis/axiosConfig";

export const demoSignIn = async (
  name: string
): Promise<DemoUserAuthenticationDetails> => {
  try {
    const response = await axiosInstance.post(`/auth/demo-user`, {
      userName: name,
    });
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to sign in demo user");
  }
};
