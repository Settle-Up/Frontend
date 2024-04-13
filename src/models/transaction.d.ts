type BaseTransaction = {
  counterPartyId: string;
  counterPartyName: string;
  transactionId: string;
  transactionDirection: "OWED" | "OWE";
  transactionAmount: string;
};

type RequiredTransaction = BaseTransaction;

type UpdatedTransaction = BaseTransaction & {
  groupId: string;
  groupName: string;
};

type ClearedTransaction = BaseTransaction & {
  clearedAt: string;
};


