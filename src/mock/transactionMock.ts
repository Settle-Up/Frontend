export const mockUpdatedTransactions: UpdatedTransaction[] = [
    {
      counterPartyId: "CP001",
      counterPartyName: "Alice Smith",
      transactionId: "TX1001",
      transactionDirection: "OWE",
      transactionAmount: "150.00",
      hasSentOrReceived: true,
      isRejected: null,
      groupId: "G1",
      groupName: "Family Expenses"
    },
    {
      counterPartyId: "CP002",
      counterPartyName: "Bob Johnson",
      transactionId: "TX1002",
      transactionDirection: "OWED",
      transactionAmount: "75.50",
      hasSentOrReceived: false,
      isRejected: true,
      groupId: "G2",
      groupName: "Friends Outing"
    },
    {
      counterPartyId: "CP003",
      counterPartyName: "Carol Lee",
      transactionId: "TX1003",
      transactionDirection: "OWE",
      transactionAmount: "200.00",
      hasSentOrReceived: true,
      isRejected: null,
      groupId: "G3",
      groupName: "Work Lunch"
    },
    {
      counterPartyId: "CP004",
      counterPartyName: "Dave Green",
      transactionId: "TX1004",
      transactionDirection: "OWED",
      transactionAmount: "50.00",
      hasSentOrReceived: false,
      isRejected: null,
      groupId: "G4",
      groupName: "Neighborhood Association"
    },
    {
      counterPartyId: "CP005",
      counterPartyName: "Eve Thompson",
      transactionId: "TX1005",
      transactionDirection: "OWE",
      transactionAmount: "125.75",
      hasSentOrReceived: true,
      isRejected: true,
      groupId: "G5",
      groupName: "Book Club"
    }
  ];
  