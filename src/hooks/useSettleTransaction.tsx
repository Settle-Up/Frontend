import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import CustomModal from "@components/CustomModal";
import { Box, Stack, Typography } from "@mui/material";
import CustomButton from "@components/CustomButton";
import { updateRequiredTransactionStatus } from "@apis/transaction/updateRequiredTransactionStatus";
import { useRecoilState, useSetRecoilState } from "recoil";
import { settleTxModalState } from "@store/settleTxModalStore";
import { snackbarState } from "@store/snackbarStore";
import { formatNumberWithLocaleAndNegatives } from "@utils/numberStringConversions";
import theme from "@theme";

const useSettleTransaction = (groupId: string) => {
  const setSnackbar = useSetRecoilState(snackbarState);
  const [{ isOpen, selectedTransaction }, setSettleTxModal] =
    useRecoilState(settleTxModalState);

  const {
    mutate: executeUpdateRequiredTransactionStatus,
    isError,
    isSuccess,
    isLoading,
  } = useMutation(updateRequiredTransactionStatus);

  const confirmSettlement = () => {
    if (selectedTransaction) {
      const { transactionId, transactionDirection, hasSentOrReceived } =
        selectedTransaction;

      executeUpdateRequiredTransactionStatus({
        groupId: groupId,
        transactionId: transactionId,
        approvalUser: transactionDirection === "OWE" ? "sender" : "recipient",
        approvalStatus: "CLEAR",
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setSettleTxModal({
        isOpen: false,
        selectedTransaction: null,
        transactionUpdateSuccess: selectedTransaction?.transactionId!,
      });
      setSnackbar({
        show: true,
        message: `Transaction with ${selectedTransaction?.counterPartyName} marked as settled. Awaiting their confirmation.`,
        severity: "success",
      });
    }
  }, [isSuccess, setSnackbar, selectedTransaction]);

  useEffect(() => {
    if (isError) {
      closeSettleTxModal();
      setSnackbar({
        show: true,
        message: `Sorry, failed to mark the transaction with ${selectedTransaction?.counterPartyName} as settled. Please try again later.`,
        severity: "error",
      });
    }
  }, [isError, setSnackbar, selectedTransaction]);

  const closeSettleTxModal = () => {
    setSettleTxModal({
      isOpen: false,
      selectedTransaction: null,
      transactionUpdateSuccess: null,
    });
  };

  const RenderSettleTxModal = () => {
    if (!isOpen || !selectedTransaction) return null;

    const { transactionAmount, counterPartyName } = selectedTransaction;

    return (
      <CustomModal
        ariaLabel="UPdate Required Transaction Status Modal"
        isOpen={isOpen}
        closeModal={closeSettleTxModal}
      >
        <Stack spacing={3}>
          <Typography variant="subtitle1">
            Confirm Transaction Resolution
          </Typography>
          <Typography>
            Have you settled the transaction of
            <span
              style={{
                color: theme.palette.text.secondary,
                marginLeft: "5px",
                marginRight: "5px",
                whiteSpace: "nowrap",
                fontWeight: "600",
              }}
            >
              {`${formatNumberWithLocaleAndNegatives(transactionAmount)}₩`}
            </span>
            with
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

          <Typography>
            Marking this as resolved will will notify the other party for their
            confirmation.
          </Typography>
          <Stack spacing={2}>
            <CustomButton
              buttonStyle="primary"
              sx={{ width: "100%" }}
              disabled={isLoading}
              onClick={confirmSettlement}
            >
              Yes, it's settled!
            </CustomButton>
            <CustomButton
              buttonStyle="secondary"
              sx={{ width: "100%" }}
              onClick={closeSettleTxModal}
            >
              No, not yet
            </CustomButton>
          </Stack>
        </Stack>
      </CustomModal>
    );
  };

  return { RenderSettleTxModal };
};

export default useSettleTransaction;
