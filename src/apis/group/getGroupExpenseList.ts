import axiosInstance from "@apis/axiosConfig";

type GroupDetailsRequest = {
  groupId: string;
  page: number;
};

type GroupDetailsResponse = {
  hasNextPage: boolean;
  expenses: UserSpecificExpenseSummary[];
};

const EXPENSE_PER_PAGE = 20;

export const getGroupExpenseList = async ({
  groupId,
  page,
}: GroupDetailsRequest): Promise<GroupDetailsResponse> => {
  try {
 
    const response = await axiosInstance.get(
      `/group/overview/expense/list?groupId=${groupId}&page=${page}&size=${EXPENSE_PER_PAGE}`
    );

    return response.data.data;
  } catch (error) {
    throw new Error("Failed to get Group Expense List");
  }
};
