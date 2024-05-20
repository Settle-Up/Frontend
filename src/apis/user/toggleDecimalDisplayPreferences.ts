import axiosInstance from "@apis/axiosConfig";

type DecimalDisplayPreferencesRequest = {
  isEnabled: boolean;
};

type DecimalDisplayPreferencesResponse = {
  isDecimalInputOption: true;
};

export const toggleDecimalDisplayPreferences = async ({
  isEnabled,
}: DecimalDisplayPreferencesRequest): Promise<DecimalDisplayPreferencesResponse> => {
  try {
    const response = await axiosInstance.post("/user/option/decimal", {
      isDecimalInputOption: isEnabled,
    });
    console.log(response.data);
    return { isDecimalInputOption: response.data.data.isDecimalInputOption };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update the decimal display preference setting");
  }
};
