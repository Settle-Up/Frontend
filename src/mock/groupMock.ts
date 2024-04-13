import dayjs from "dayjs";

export const mockJoinedGroupList = [
  {
    groupId: "GroupId1",
    groupName: "optimization 1st test group",
    groupMemberCount: "4",
    net: "-1970000",
    lastActive: dayjs("2024-03-01"),
  },
  {
    groupId: "GroupId2",
    groupName: "Group 2",
    groupMemberCount: "4",
    net: null,
    lastActive: dayjs("2024-02-28"),
  },
  {
    groupId: "GroupId3",
    groupName: "Group 3",
    groupMemberCount: "4",
    net: "5000",
    lastActive: dayjs("2024-03-03"),
  },
  {
    groupId: "GroupId4",
    groupName: "Group 4",
    groupMemberCount: "11",
    net: "0",
    lastActive: dayjs("2024-03-03"),
  },
  {
    groupId: "GroupId5",
    groupName: "Group 5",
    groupMemberCount: "11",
    net: "0",
    lastActive: dayjs("2024-03-03"),
  },
  {
    groupId: "GroupId6",
    groupName: "Group 6",
    groupMemberCount: "11",
    net: "0",
    lastActive: dayjs("2024-03-03"),
  },
  {
    groupId: "GroupId7",
    groupName: "Group 7",
    groupMemberCount: "11",
    net: "0",
    lastActive: dayjs("2024-03-03"),
  },
  {
    groupId: "GroupId8",
    groupName: "Group 8",
    groupMemberCount: "11",
    net: "0",
    lastActive: dayjs("2024-03-03"),
  },
  {
    groupId: "GroupId9",
    groupName: "Group 9",
    groupMemberCount: "11",
    net: "0",
    lastActive: dayjs("2024-03-03"),
  },
  {
    groupId: "GroupId10",
    groupName: "Group 10",
    groupMemberCount: "11",
    net: "0",
    lastActive: dayjs("2024-03-03"),
  },
  {
    groupId: "GroupId11",
    groupName: "Group 11",
    groupMemberCount: "11",
    net: "0",
    lastActive: dayjs("2024-03-03"),
  },
];

export const mockGroupMemberList = [
  {
    userId: "UserId1",
    userName: "Sally",
    userEmail: "sally@example.com",
  },
  {
    userId: "UserId2",
    userName: "Bartholomew Montgomery",
    userEmail: "user2@example.com",
  },
  {
    userId: "UserId3",
    userName: "Seraphina Isabella Alexandra Constantine",
    userEmail: "user3@example.com",
  },
  {
    userId: "UserId4",
    userName: "user 4",
    userEmail: "user4@example.com",
  },
  {
    userId: "UserId5",
    userName: "user 5",
    userEmail: "user5@example.com",
  },
  {
    userId: "UserId6",
    userName: "user 6",
    userEmail: "user6@example.com",
  },
  {
    userId: "UserId7",
    userName: "user 7",
    userEmail: "user7@example.com",
  },
  {
    userId: "UserId8",
    userName: "user 8",
    userEmail: "user8@example.com",
  },
  {
    userId: "UserId9",
    userName: "user 9",
    userEmail: "user9@example.com",
  },
];

export const mockJoinedGroupDetails: JoinedGroupDetails = {
  groupId: "g123",
  groupName: "Friends Getaway",
  settlementBalance: "1200000",
  isMonthlyReportUpdateOn: true,
  neededTransactionList: [
    {
      counterPartyId: "cp101",
      counterPartyName: "Emily",
      transactionId: "t101",
      transactionDirection: "OWED",
      transactionAmount: "55000000",
    },
    {
      counterPartyId: "cp102",
      counterPartyName: "George Willy Wonka Henry The Third",
      transactionId: "t102",
      transactionDirection: "OWE",
      transactionAmount: "-40000",
    },
    {
      counterPartyId: "cp103",
      counterPartyName: "Hannah",
      transactionId: "t103",
      transactionDirection: "OWED",
      transactionAmount: "30000",
    },
    {
      counterPartyId: "cp104",
      counterPartyName: "John",
      transactionId: "t104",
      transactionDirection: "OWED",
      transactionAmount: "20000",
    },
    {
      counterPartyId: "cp105",
      counterPartyName: "Alice",
      transactionId: "t105",
      transactionDirection: "OWED",
      transactionAmount: "15000",
    },
    {
      counterPartyId: "cp106",
      counterPartyName: "Bob",
      transactionId: "t106",
      transactionDirection: "OWED",
      transactionAmount: "5000",
    },
    {
      counterPartyId: "cp107",
      counterPartyName: "Clara",
      transactionId: "t107",
      transactionDirection: "OWED",
      transactionAmount: "8000",
    },
    {
      counterPartyId: "cp108",
      counterPartyName: "David",
      transactionId: "t108",
      transactionDirection: "OWED",
      transactionAmount: "10000",
    },
    {
      counterPartyId: "cp109",
      counterPartyName: "Eve",
      transactionId: "t109",
      transactionDirection: "OWE",
      transactionAmount: "-6000",
    },
    {
      counterPartyId: "cp110",
      counterPartyName: "Frank",
      transactionId: "t110",
      transactionDirection: "OWE",
      transactionAmount: "-20000",
    },
    {
      counterPartyId: "cp111",
      counterPartyName: "Grace",
      transactionId: "t111",
      transactionDirection: "OWE",
      transactionAmount: "-12000",
    },
    {
      counterPartyId: "cp112",
      counterPartyName: "Henry",
      transactionId: "t112",
      transactionDirection: "OWE",
      transactionAmount: "-3000",
    },
    {
      counterPartyId: "cp113",
      counterPartyName: "Irene",
      transactionId: "t113",
      transactionDirection: "OWE",
      transactionAmount: "-7000",
    },
  ],
  lastWeekSettledTransactionList: [
    {
      counterPartyId: "cp201",
      counterPartyName: "Fred",
      transactionId: "t201",
      transactionDirection: "OWE",
      transactionAmount: "-45000",
      clearedAt: "2024-03-23T10:00:00.000Z",
    },
    {
      counterPartyId: "cp202",
      counterPartyName: "Isla",
      transactionId: "t202",
      transactionDirection: "OWED",
      transactionAmount: "50000",
      clearedAt: "2024-03-22T09:30:00.000Z",
    },
    {
      counterPartyId: "cp203",
      counterPartyName: "Jack",
      transactionId: "t203",
      transactionDirection: "OWE",
      transactionAmount: "-35000",
      clearedAt: "2024-03-21T08:45:00.000Z",
    },
  ],
};

const mockExpenseList: UserSpecificExpenseSummary[] = [
  {
    payerUserId: "u101",
    payerUserName: "Alice",
    receiptId: "r101",
    receiptName: "Dinner Super Duper Loooong Dinner",
    totalPrice: "200000",
    userOwedAmount: "-50000",
    createdAt: "2024-04-01T15:59:28.144022",
  },
  {
    payerUserId: "u102",
    payerUserName: "Bob",
    receiptId: "r102",
    receiptName: "Lunch",
    totalPrice: "150000",
    userOwedAmount: "-37500",
    createdAt: "2024-04-01T15:59:28.144022",
  },
  {
    payerUserId: "u103",
    payerUserName: "Charlie",
    receiptId: "r103",
    receiptName: "Breakfast",
    totalPrice: "100000",
    userOwedAmount: "-25000",
    createdAt: "2024-04-01T15:59:28.144022",
  },
  {
    payerUserId: "u104",
    payerUserName: "Dave",
    receiptId: "r104",
    receiptName: "Snacks",
    totalPrice: "80000",
    userOwedAmount: "0",
    createdAt: "2024-04-01T15:59:28.144022",
  },
  {
    payerUserId: "u105",
    payerUserName: "Eve",
    receiptId: "r105",
    receiptName: "Theatre Tickets",
    totalPrice: "300000",
    userOwedAmount: "75000",
    createdAt: "2024-04-01T15:59:28.144022",
  },
  {
    payerUserId: "u106",
    payerUserName: "Frank",
    receiptId: "r106",
    receiptName: "Museum Entry",
    totalPrice: "240000",
    userOwedAmount: "60000",
    createdAt: "2024-03-30T15:59:28.144022",
  },
  {
    payerUserId: "u107",
    payerUserName: "Grace",
    receiptId: "r107",
    receiptName: "Park Tickets",
    totalPrice: "180000",
    userOwedAmount: "45000",
    createdAt: "2024-03-30T15:59:28.144022",
  },
  {
    payerUserId: "u108",
    payerUserName: "Henry",
    receiptId: "r108",
    receiptName: "Aquarium Visit",
    totalPrice: "220000",
    userOwedAmount: "55000",
    createdAt: "2024-03-30T15:59:28.144022",
  },
  {
    payerUserId: "u109",
    payerUserName: "Ivy",
    receiptId: "r109",
    receiptName: "Concert Tickets",
    totalPrice: "450000",
    userOwedAmount: "112500",
    createdAt: "2024-03-29T15:59:28.144022",
  },
  {
    payerUserId: "u110",
    payerUserName: "Jack",
    receiptId: "r110",
    receiptName: "Guided Tour",
    totalPrice: "360000",
    userOwedAmount: "90000",
    createdAt: "2024-03-29T15:59:28.144022",
  },
  {
    payerUserId: "u111",
    payerUserName: "Kara",
    receiptId: "r111",
    receiptName: "Ferry Ride",
    totalPrice: "280000",
    userOwedAmount: "70000",
    createdAt: "2024-03-29T15:59:28.144022",
  },
  {
    payerUserId: "u112",
    payerUserName: "Leo",
    receiptId: "r112",
    receiptName: "Zoo Entry",
    totalPrice: "320000",
    userOwedAmount: "80000",
    createdAt: "2024-03-25T15:59:28.144022",
  },
];
