import axiosInstance from "@apis/axiosConfig";

type EmailSearchListRequest = {
  query: string;
  page: number;
  groupId?: string;
};

type EmailSearchListResponse = {
  searchList: GeneralUser[];
  hasNextPage: boolean;
};

const SEARCH_RESULT_PER_PAGE = 10;

export const searchUserEmailList = async ({
  query,
  page,
  groupId,
}: EmailSearchListRequest): Promise<EmailSearchListResponse> => {
  try {
    const params: any = {
      email: query,
      page: page,
      size: SEARCH_RESULT_PER_PAGE,
    };

    if (groupId) {
      params.excludeGroupId = groupId;
    }

    const response = await axiosInstance.get(`/users/search`, {
      params,
    });

    return response.data.data;
  } catch (error) {
    throw new Error("Failed to get email list");
  }
};
