import { List, Paper, Stack, Typography } from "@mui/material";
import RequiredTransactionCard from "@components/RequiredTransactionCard";

type RequiredTransactionListProps = {
  title: string;
  transactionList: RequiredTransaction[];
};
const RequiredTransactionList = ({
  title,
  transactionList,
}: RequiredTransactionListProps) => {
  const transactionsRejected = transactionList.filter(
    (transaction) =>
      transaction.hasSentOrReceived && transaction.isRejected === true
  );

  const transactionsAwaitingDecisions = transactionList.filter(
    (transaction) =>
      transaction.hasSentOrReceived && transaction.isRejected === null
  );

  const transactionsToBeHandled = transactionList.filter(
    (transaction) =>
      !transaction.hasSentOrReceived && transaction.isRejected === null
  );

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2">{title}</Typography>
      <Paper
        className="custom-scrollbar"
        sx={{
          backgroundColor: "white",
          borderRadius: 3,
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        <List>
          {transactionsRejected.map((transaction, index) => (
            <RequiredTransactionCard key={index} transaction={transaction} />
          ))}
          {transactionsAwaitingDecisions.map((transaction, index) => (
            <RequiredTransactionCard key={index} transaction={transaction} />
          ))}
          {transactionsToBeHandled.map((transaction, index) => (
            <RequiredTransactionCard key={index} transaction={transaction} />
          ))}
        </List>
      </Paper>
    </Stack>
  );
};

export default RequiredTransactionList;
