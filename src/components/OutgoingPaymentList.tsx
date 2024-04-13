import { useEffect } from "react";
import {
  List,
  ListItem,
  Paper,
  Stack,
  Skeleton,
  Typography,
} from "@mui/material";
import OutgoingPaymentCard from "@components/OutgoingPaymentCard";
import { useRecoilState } from "recoil";
import { outgoingPaymentListState } from "@store/transactionStore";

type OutgoingPaymentListProps = {
  isLoading: boolean;
  title: string;
  transactionList: RequiredTransaction[] | undefined;
};
const OutgoingPaymentList = ({
  isLoading,
  title,
  transactionList,
}: OutgoingPaymentListProps) => {

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
        <Skeleton variant="rounded" width={40} height={20} />
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
        {transactionList && transactionList.length > 0 ? (
          <List>
            {transactionList?.map((transaction, index) => (
              <OutgoingPaymentCard key={index} transaction={transaction} />
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

export default OutgoingPaymentList;
