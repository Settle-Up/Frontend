// import dayjs from "dayjs";

type NewGroup = {
  groupName: string;
  groupUserList: GeneralUser[];
};

type UserSpecificExpenseSummary = {
  payerUserId: string;
  payerUserName: string;
  receiptId: string;
  receiptName: string;
  totalPrice: string;
  userOwedAmount: string;
  createdAt: string;
};

type JoinedGroupDetails = {
  groupId: string;
  groupName: string;
  settlementBalance: string;
  isMonthlyReportUpdateOn: boolean;
  neededTransactionList: RequiredTransaction[];
  lastWeekSettledTransactionList: ClearedTransaction[];
};

type JoinedGroupSummary = {
  groupId: string;
  groupName: string;
  groupMemberCount: string;
  settlementBalance?: string | null;
  lastActive?: dayjs.Dayjs | null;
};
