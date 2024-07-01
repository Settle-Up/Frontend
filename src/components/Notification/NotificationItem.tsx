import { useCallback } from "react";
import { Stack, Typography } from "@mui/material";
import { useFormatNumberAsKoreanWon } from "@hooks/useFormatNumberAsKoreanWon";
import { useMutation, useQueryClient } from "react-query";
import { manageTransaction } from "@apis/transactions/manageTransaction";
import theme from "@theme";
import CustomButton from "@components/CustomButton";
import useFeedbackHandler from "@hooks/useFeedbackHandler";
import removeItemFromListInCache from "reactQuery/removeItemFromListInCache";

type NotificationItemProps = {
  item: UpdatedTransaction;
  totalItemCount: number;
};

const NotificationItem = ({ item, totalItemCount }: NotificationItemProps) => {
  const queryClient = useQueryClient();

  const formatToKoreanWon = useFormatNumberAsKoreanWon();

  const {
    groupId,
    groupName,
    counterPartyName,
    transactionId,
    transactionAmount,
    clearedAt,
  } = item;

  const {
    mutate: executeDismissNotification,
    data: dismissedNotification,
    isError,
    isSuccess,
    isLoading,
  } = useMutation(manageTransaction);

  const successAction = useCallback(() => {
    if (dismissedNotification) {
      removeItemFromListInCache<ReceivedPayments, "receivedPaymentList">({
        queryClient,
        queryKey: "receivedPaymentList",
        listKey: "receivedPaymentList",
        identifierKey: "transactionId",
        identifierValue: dismissedNotification.transactionId,
      });
    }
  }, [dismissedNotification, queryClient]);

  useFeedbackHandler({
    isError,
    errorMessage: "Failed to dismiss the notification. Please try again later.",
    isSuccess,
    successMessage: "Notification dismissed successfully.",
    successAction,
  });

  return (
    <Stack spacing={4}>
      <Typography variant="subtitle1">
        <span
          style={{
            color: theme.palette.text.secondary,
            marginRight: "5px",
            whiteSpace: "nowrap",
            fontWeight: "600",
          }}
        >
          {totalItemCount}
        </span>
        Payments Received
      </Typography>
      <Typography>
        <span
          style={{
            color: theme.palette.text.secondary,
            marginRight: "5px",
            whiteSpace: "nowrap",
            fontWeight: "600",
          }}
        >
          {counterPartyName}
        </span>
        has settled
        <span
          style={{
            color: theme.palette.text.secondary,
            marginLeft: "5px",
            marginRight: "5px",
            whiteSpace: "nowrap",
            fontWeight: "600",
          }}
        >
          {formatToKoreanWon(transactionAmount)}
        </span>
        with you from '
        <span
          style={{
            color: theme.palette.text.secondary,
            whiteSpace: "nowrap",
            fontWeight: "600",
          }}
        >
          {groupName}
        </span>
        ' on{" "}
        <span style={{ whiteSpace: "nowrap" }}>
          {clearedAt?.split("T")[0]}{" "}
        </span>
      </Typography>
      <Typography variant="caption">
        Note: This is part of a system simulation to illustrate how transactions
        would be handled and notified in a real setting. No actual money has
        moved as this functionality is designed solely for demonstration
        purposes in our project.
      </Typography>
      <CustomButton
        buttonStyle="primary"
        disabled={isLoading}
        onClick={() => {
          executeDismissNotification({
            groupId,
            transactionId,
            approvalUser: "recipient",
          });
        }}
        sx={{ flex: 1 }}
      >
        {isLoading ? "Dismissing..." : "Dismiss"}
      </CustomButton>
    </Stack>
  );
};

export default NotificationItem;
