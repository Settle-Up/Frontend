// import dayjs from "dayjs";

type NewGroup = {
  groupName: string | null;
  groupMemberCount: number | null;
  groupUserList: string[] | null;
};

type UserSpecificExpenseSummary = {
  payerUserId: string;
  payerUserName: string;
  receiptId: string;
  receiptName: string;
  totalAmount: string;
  userOwedAmount: string;
  createdAt: string;
};

type JoinedGroupDetails = {
  groupId: string;
  groupName: string;
  // groupUrl: string;
  settlementBalance: string;
  isMonthlyReportUpdateOn: boolean;
  neededTransactionList: RequiredTransaction[];
  lastWeekSettledTransactionList: ClearedTransaction[];
  expenseList: UserSpecificExpenseSummary[];
};

type JoinedGroupSummary = {
  groupId: string;
  groupName: string;
  groupMemberCount: string;
  settlementBalance?: string | null;
  lastActive?: dayjs.Dayjs | null;
};
