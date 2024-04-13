import axiosInstance from "@apis/axiosConfig";
import { AxiosError } from "axios";

export const signIn = async (authCode: string): Promise<CurrentUser> => {
  try {
    const response = await axiosInstance.get(
      `/auth/kakao/callback?code=${authCode}`
    );
    console.log(response.data);

    const { accessToken, userId, userName, issuedTime, expiresIn } = response.data.data;
    console.log("sign in function", accessToken)
    if (accessToken) {
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("userName", userName);
      sessionStorage.setItem("issuedTime", issuedTime);
      sessionStorage.setItem("expiresIn", expiresIn);

    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        `Failed to sign in user: ${error.response?.status} - ${error.response?.statusText}`
      );
    } else {
      throw new Error("Failed to sign in user");
    }
  }
};
