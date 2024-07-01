import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import Modal from "@components/Modal";
import { Stack, Typography } from "@mui/material";
import CustomButton from "@components/CustomButton";
import { manageTransaction } from "@apis/transactions/manageTransaction";
import { useFormatNumberAsKoreanWon } from "@hooks/useFormatNumberAsKoreanWon";
import theme from "@theme";
import useFeedbackHandler from "@hooks/useFeedbackHandler";
import removeItemFromListInCache from "reactQuery/removeItemFromListInCache";
import addItemToListInCache from "reactQuery/addItemToListInCache";
import updateCache from "reactQuery/updateCache";

type PaymentConfirmationModalProps = {
  groupId: string;
  selectedTransactionForPayment: RequiredTransaction;
  closeModal: () => void;
};

const PaymentConfirmationModal = ({
  groupId,
  selectedTransactionForPayment,
  closeModal,
}: PaymentConfirmationModalProps) => {
  const formatToKoreanWon = useFormatNumberAsKoreanWon();

  const queryClient = useQueryClient();

  const { transactionId, transactionAmount, counterPartyName } =
    selectedTransactionForPayment;

  const {
    mutate: executeManageTransaction,
    data: updatedTransaction,
    isError,
    isSuccess,
    isLoading,
  } = useMutation(manageTransaction);

  const successAction = useCallback(() => {
    if (updatedTransaction) {
      const cachedData: JoinedGroupDetails | undefined =
        queryClient.getQueryData(["groupDetails", groupId]);

      if (cachedData) {
        const newSettlementBalance =
          Math.abs(parseFloat(cachedData.settlementBalance)) -
          parseFloat(updatedTransaction.transactionAmount);

        updateCache({
          queryClient,
          queryKey: ["groupDetails", groupId],
          updatedData: { settlementBalance: newSettlementBalance.toString() },
        });
      }

      addItemToListInCache<
        JoinedGroupDetails,
        "lastWeekSettledTransactionList"
      >({
        queryClient,
        queryKey: ["groupDetails", groupId],
        item: updatedTransaction,
        listKey: "lastWeekSettledTransactionList",
      });

      removeItemFromListInCache<JoinedGroupDetails, "neededTransactionList">({
        queryClient,
        queryKey: ["groupDetails", groupId],
        listKey: "neededTransactionList",
        identifierKey: "transactionId",
        identifierValue: updatedTransaction.transactionId,
      });
    }
  }, [updatedTransaction, groupId, queryClient]);

  useFeedbackHandler({
    isError,
    errorMessage: `We encountered an error processing your payment to ${counterPartyName}. Please try again.`,
    isSuccess,
    successMessage: `Your payment to ${counterPartyName} has been successfully made.`,
    successAction,
    unconditionalExecute: useCallback(() => {
      closeModal();
    }, [closeModal]),
  });

  const confirmPayment = () => {
    executeManageTransaction({
      groupId: groupId,
      transactionId: transactionId,
      approvalUser: "sender",
    });
  };

  return (
    <Modal
      ariaLabel="Update Required Transaction Status Modal"
      isOpen={!!selectedTransactionForPayment}
      closeModal={closeModal}
      showCloseButton
    >
      <Stack spacing={3}>
        <Typography variant="subtitle1">Settle Transaction</Typography>
        <Typography>
          Are you ready to settle your payment of
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
          to
          <span
            style={{
              color: theme.palette.text.secondary,
              marginLeft: "5px",
              fontWeight: "600",
            }}
          >
            {counterPartyName}
          </span>
          ?
        </Typography>
        <Typography variant="caption">
          Note: This action is a simulation. In a fully functional application,
          confirming this would initiate a real transaction through a secure
          payment gateway.
        </Typography>
        <CustomButton
          buttonStyle="primary"
          sx={{ width: "100%" }}
          disabled={isLoading}
          onClick={confirmPayment}
        >
          {isLoading ? "Confirming..." : "Confirm Payment"}
        </CustomButton>
      </Stack>
    </Modal>
  );
};

export default PaymentConfirmationModal;
