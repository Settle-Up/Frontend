import axiosInstance from "@apis/axiosConfig";

type EmailSearchListRequest = {
  query: string;
  page: number;
};

type EmailSearchListResponse = {
  searchList: GeneralUser[];
  hasNextPage: boolean;
};

const SEARCH_RESULT_PER_PAGE = 10;

export const searchUserEmailList = async ({
  query,
  page,
}: EmailSearchListRequest): Promise<EmailSearchListResponse> => {
  try {
    const response = await axiosInstance.get(
      `/?search=${query}&page=${page}&size=${SEARCH_RESULT_PER_PAGE}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to get email list");
  }
};
