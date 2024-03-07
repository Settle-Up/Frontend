type NewGroup = {
    groupName: string | null;
    groupMemberCount: number | null;
    groupUserList: string[] | null;
  };
  
  type TransactionDetails = {
    CounterPartyID: string,
    CounterPartyName: string,
    transactionDirection: "owed" | "owe"
    transactionAmount: string,
    transactionId: string
  }
  
  type JoinedGroupDetails = {
    groupId: string;
    groupName: string;
    groupUrl: string;
    settlementBalance?: string;
    lastActive?: string;
    isMontlyReportUpdateOn?: boolean;
    userList?: User[]
    neededTransactionList?: TransactionDetails[];
    lastWeekSettledTransactionList?: TransactionDetails[];
    expenseList?: {
      payerID: string,
      payerName: string,
      receiptID: string,
      receiptName: string,
      receiptTotalPrice: string,
      userOwedAmount: string,
    }
  };
  
  type JoinedGroupDetailsList = JoinedGroupDetails[]
  
  type JoinedGroupSummary = {
    groupId: string;
    groupName: string;
    settlementBalance: string;
    lastActive: string;
  }
  
  type JoniedGroupSummaryList = JoinedGroupSummary[]
  