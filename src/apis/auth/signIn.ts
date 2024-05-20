import axiosInstance from "@apis/axiosConfig";
import { AxiosError } from "axios";

export const signIn = async (authCode: string): Promise<CurrentUser> => {
  try {
    const response = await axiosInstance.get(
      `/auth/kakao/callback?code=${authCode}`
    );
    console.log(response.data);

    const { accessToken, issuedTime, expiresIn, isDecimalInputOption } =
      response.data.data;
    console.log("sign in function", accessToken);
    if (accessToken) {
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("issuedTime", issuedTime);
      sessionStorage.setItem("expiresIn", expiresIn);
      sessionStorage.setItem("isDecimalInputOption", isDecimalInputOption);
    }

    return response.data.data;
  } catch (error) {
    throw new Error("Failed to sign in user");
  }
};
