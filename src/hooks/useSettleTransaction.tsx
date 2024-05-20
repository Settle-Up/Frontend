import { useEffect } from "react";
import { useMutation } from "react-query";
import CustomModal from "@components/CustomModal";
import { Stack, Typography } from "@mui/material";
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

  const confirmPayment = () => {
    if (selectedTransaction) {
      const { transactionId } = selectedTransaction;

      executeUpdateRequiredTransactionStatus({
        groupId: groupId,
        transactionId: transactionId,
        approvalUser: "sender"
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setSettleTxModal((prev) => ({
        ...prev,
        isOpen: false,
        isTransactionSuccessfullySettled: true,
      }));
      setSnackbar({
        show: true,
        message: `Your payment to ${selectedTransaction?.counterPartyName} has been successfully made.`,
        severity: "success",
      });
    }
  }, [isSuccess, setSnackbar, selectedTransaction]);

  useEffect(() => {
    if (isError) {
      closeSettleTxModal();
      setSnackbar({
        show: true,
        message: `We encountered an error processing your payment to ${selectedTransaction?.counterPartyName}. Please try again.`,
        severity: "error",
      });
    }
  }, [isError, setSnackbar, selectedTransaction]);

  const closeSettleTxModal = () => {
    setSettleTxModal({
      isOpen: false,
      selectedTransaction: null,
      isTransactionSuccessfullySettled: null,
    });
  };

  const RenderSettleTxModal = () => {
    if (!isOpen || !selectedTransaction) return null;

    const { transactionAmount, counterPartyName } = selectedTransaction;

    return (
      <CustomModal
        ariaLabel="Update Required Transaction Status Modal"
        isOpen={isOpen}
        closeModal={closeSettleTxModal}
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
              {`${formatNumberWithLocaleAndNegatives(transactionAmount)}₩`}
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
            Note: This action is a simulation. In a fully functional
            application, confirming this would initiate a real transaction
            through a secure payment gateway.
          </Typography>
          <CustomButton
            buttonStyle="primary"
            sx={{ width: "100%" }}
            disabled={isLoading}
            onClick={confirmPayment}
          >
            Confirm Payment
          </CustomButton>
        </Stack>
      </CustomModal>
    );
  };

  return { RenderSettleTxModal };
};

export default useSettleTransaction;
