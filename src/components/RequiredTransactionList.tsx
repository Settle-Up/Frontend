import {
  Box,
  List,
  ListItem,
  Paper,
  Stack,
  Skeleton,
  Typography,
} from "@mui/material";
import RequiredTransactionCard from "@components/RequiredTransactionCard";

type RequiredTransactionListProps = {
  isLoading: boolean;
  title: string;
  transactionList: RequiredTransaction[];
};
const RequiredTransactionList = ({
  isLoading,
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

  const renderSkeletons = () => {
    return Array.from({ length: 3 }).map((_, index) => (
      <ListItem
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          "&:hover": { backgroundColor: "transparent" },
        }}
      >
        <Skeleton variant="text" width={100} />
        <Skeleton variant="text" width={90} />
        <Skeleton variant="rectangular" width={20} height={20} />
      </ListItem>
    ));
  };

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
        {isLoading && renderSkeletons()}
        {transactionList.length > 0 ? (
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
        ) : (
          <Typography
            variant="body2"
            sx={{ textAlign: "center", marginY: 2, color: "text.secondary" }}
          >
            No transactions to display.
          </Typography>
        )}
      </Paper>
    </Stack>
  );
};

export default RequiredTransactionList;