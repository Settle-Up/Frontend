import {
  List,
  ListItem,
  Paper,
  Stack,
  Skeleton,
  Typography,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";

type PaymentListProps = {
  isLoading: boolean;
  title: string;
  transactionList: RequiredTransaction[] | undefined;
  CardComponent: React.ComponentType<{ transaction: RequiredTransaction }>;
  skeletonWidths: { text1: number; text2: number; rounded?: number };
};

const PaymentList = ({
  isLoading,
  title,
  transactionList,
  CardComponent,
  skeletonWidths,
}: PaymentListProps) => {
  const { text1, text2, rounded } = skeletonWidths;
  const hasTransactions = transactionList && transactionList.length > 0;

  const SkeletonPaymentCard = (index: number) => (
    <ListItem
      key={index}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        "&:hover": { backgroundColor: "transparent" },
      }}
    >
      <Skeleton variant="text" width={text1} />
      <Skeleton variant="text" width={text2} />
      {rounded && <Skeleton variant="rounded" width={rounded} height={20} />}
    </ListItem>
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
          display: hasTransactions ? "block" : "flex",
          alignItems: hasTransactions ? "normal" : "center",
          justifyContent: hasTransactions ? "normal" : "center",
        }}
      >
        {isLoading &&
          Array.from({ length: 4 }, (_, index) => SkeletonPaymentCard(index))}
        {hasTransactions ? (
          <List>
            {transactionList.map((transaction, index) => (
              <CardComponent key={index} transaction={transaction} />
            ))}
          </List>
        ) : (
          <VerifiedIcon sx={{ margin: 2 }} />
        )}
      </Paper>
    </Stack>
  );
};

export default PaymentList;
