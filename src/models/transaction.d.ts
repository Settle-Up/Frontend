type BaseTransaction = {
  counterPartyId: string;
  counterPartyName: string;
  transactionId: string;
  transactionDirection: "OWED" | "OWE";
  transactionAmount: string;
};

type RequiredTransaction = BaseTransaction & {
  hasSentOrReceived: boolean;
  isRejected: true | null;
};

type UpdatedTransaction = BaseTransaction & {
  hasSentOrReceived: boolean;
  isRejected: true | null;
  groupId: string;
  groupName: string;
};

type ClearedTransaction = BaseTransaction & {
  clearedAt: string;
};

type TransactionDecision = {
  groupId: string;
  transactionId: string;
  approvalUser: "sender" | "recipient";
  approvalStatus: "CLEAR" | "REJECT";
};
