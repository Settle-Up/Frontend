import axiosInstance from "@apis/axiosConfig";

type DecimalDisplayPreferencesRequest = {
  isEnabled: boolean;
};

type DecimalDisplayPreferencesResponse = {
  isDecimalInputOption: boolean;
};

export const toggleDecimalDisplayPreferences = async ({
  isEnabled,
}: DecimalDisplayPreferencesRequest): Promise<DecimalDisplayPreferencesResponse> => {
  try {
    const response = await axiosInstance.post("/users/profile", {
      isDecimalInputOption: isEnabled,
    });
    return { isDecimalInputOption: response.data.data.isDecimalInputOption };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update the decimal display preference setting");
  }
};
