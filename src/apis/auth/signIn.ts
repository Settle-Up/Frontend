import axiosInstance from "@apis/axiosConfig";

export const signIn = async (authCode: string): Promise<AuthenticationDetails> => {
  try {
    const response = await axiosInstance.get(`/auth/login/social/kakao`, {
      params: {
        code: authCode
      }
    });
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to sign in user");
  }
};
