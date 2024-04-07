import { useState } from "react";
import { useMutation } from "react-query";
import CustomModal from "@components/CustomModal";
import { Box, Stack, Typography } from "@mui/material";
import CustomButton from "@components/CustomButton";
import { updateRequiredTransactionStatus } from "@apis/transaction/updateRequiredTransactionStatus";
import { useRecoilState, useSetRecoilState } from "recoil";
import { requiredTxModalState } from "@store/requiredTxModalStore";
import { snackbarState } from "@store/snackbarStore";
import { formatNumberWithLocaleAndNegatives } from "@utils/numberStringConversions";
import theme from "@theme";

const useUpdateRequiredTransactionStatusModal = (groupId: string) => {
  const setSnackbar = useSetRecoilState(snackbarState);
  const [{ isOpen, selectedTransaction }, setRequiredTxModalState] =
    useRecoilState(requiredTxModalState);

  const { mutate, isLoading } = useMutation(updateRequiredTransactionStatus, {
    onSuccess: () => {
      setRequiredTxModalState({
        isOpen: false,
        selectedTransaction: null,
        transactionUpdateSuccess: selectedTransaction?.transactionId!,
      });
      setSnackbar({
        show: true,
        message: `You've marked the transaction with ${selectedTransaction?.counterPartyName} as settled. Awaiting their confirmation.`,
        severity: "success",
      });
    },
    onError: () => {
      handleCloseModal();
      setSnackbar({
        show: true,
        message: `Failed to mark the transaction with ${selectedTransaction?.counterPartyName} as settled. Please try again later.`,
        severity: "error",
      });
    },
  });

  const handleCloseModal = () => {
    setRequiredTxModalState({
      isOpen: false,
      selectedTransaction: null,
      transactionUpdateSuccess: null,
    });
  };

  const handleConfirmSettlement = () => {
    if (selectedTransaction) {
      const { transactionId, transactionDirection, hasSentOrReceived } =
        selectedTransaction;

      //   mutate({
      //     groupId: groupId,
      //     transactionId: transactionId,
      //     approvalUser: transactionDirection === "owe" ? "sender" : "recipient",
      //     approvalStatus: "CLEAR",
      //   });

      // PR 올리기 전 지워야 함; 테스트 용도
      setRequiredTxModalState({
        isOpen: false,
        selectedTransaction: null,
        transactionUpdateSuccess: selectedTransaction?.transactionId!,
      });
      setSnackbar({
        show: true,
        message: `You've marked the transaction with ${selectedTransaction?.counterPartyName} as settled. Awaiting their confirmation.`,
        severity: "success",
      });
    }
  };

  const RenderModal = () => {
    if (!isOpen || !selectedTransaction) return null;

    const { transactionAmount, counterPartyName } = selectedTransaction;

    return (
      <CustomModal
        ariaLabel="UPdate Required Transaction Status Modal"
        isOpen={isOpen}
        handleClose={handleCloseModal}
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
              onClick={handleConfirmSettlement}
            >
              Yes, it's settled!
            </CustomButton>
            <CustomButton
              buttonStyle="secondary"
              sx={{ width: "100%" }}
              onClick={handleCloseModal}
            >
              No, not yet
            </CustomButton>
          </Stack>
        </Stack>
      </CustomModal>
    );
  };

  return { RenderModal };
};

export default useUpdateRequiredTransactionStatusModal;
