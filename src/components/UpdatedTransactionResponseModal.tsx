import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import CustomModal from "@components/CustomModal";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { formatNumberWithLocaleAndNegatives } from "@utils/numberStringConversions";
import { useQuery, useMutation } from "react-query";
import { getPaymentReceivedTransactionList } from "@apis/transaction/getPaymentReceivedTransactionList";
import { updateRequiredTransactionStatus } from "@apis/transaction/updateRequiredTransactionStatus";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import theme from "@theme";
import { paymentReceivedTXModalAlertState } from "@store/paymentReceivedTXModalAlertStore";
import CustomButton from "@components/CustomButton";

const UpdatedTransactionReponseHandler = () => {
  const setSnackbar = useSetRecoilState(snackbarState);
  const [isInitialFetch, setIsInitialFetch] = useState(true);

  const [{ isOpen, paymentReceivedTxList }, setPaymentReceivedTXModalAlert] =
    useRecoilState(paymentReceivedTXModalAlertState);

  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    data: fetchedPaymentReceivedTxList,
    isError: isFetchingPaymentReceivedTxListError,
    isSuccess: isFetchingPaymentReceivedTxListSuccess,
  } = useQuery("paymentReceivedTransactionList", () => getPaymentReceivedTransactionList(), {
  });

  useEffect(() => {
    if (isFetchingPaymentReceivedTxListSuccess) {
      if (isInitialFetch && fetchedPaymentReceivedTxList) {
        setPaymentReceivedTXModalAlert((prev) => ({
          ...prev,
          isOpen: fetchedPaymentReceivedTxList?.length > 0 ? true : false,
          paymentReceivedTxList: fetchedPaymentReceivedTxList,
        }));
        setIsInitialFetch(false);
      } else {
        setPaymentReceivedTXModalAlert((prev) => ({
          ...prev,
          isOpen: false,
          paymentReceivedTxList: fetchedPaymentReceivedTxList,
        }));
      }
    }
  }, [
    isFetchingPaymentReceivedTxListSuccess,
    setSnackbar,
    fetchedPaymentReceivedTxList,
  ]);

  useEffect(() => {
    if (isFetchingPaymentReceivedTxListError) {
      setSnackbar({
        show: true,
        message: `Sorry, we're unable to load your payment notifications at this time. Please try again later.`,
        severity: "error",
      });
    }
  }, [isFetchingPaymentReceivedTxListError, setSnackbar]);

  const {
    mutate: executeUpdateRequiredTransactionStatus,
    isError: isUpdatingRequiredTxStatusError,
    isSuccess: isUpdatingRequiredTxStatusSuccess,
    isLoading: isUpdatingTxRequiredStatusLoading,
  } = useMutation(updateRequiredTransactionStatus);

  useEffect(() => {
    if (paymentReceivedTxList && isUpdatingRequiredTxStatusSuccess) {
      setSnackbar({
        show: true,
        message: `Notification dismissed successfully.`,
        severity: "success",
      });
      setPaymentReceivedTXModalAlert((prev) => ({
        ...prev,
        paymentReceivedTxList: prev.paymentReceivedTxList!.filter(
          (t) =>
            t.transactionId !==
            paymentReceivedTxList[currentIndex].transactionId
        ),
      }));
      if (currentIndex >= paymentReceivedTxList!.length - 1) {
        setCurrentIndex((current) => Math.max(current - 1, 0));
      }
    }
  }, [isUpdatingRequiredTxStatusSuccess, setSnackbar]);

  useEffect(() => {
    if (isUpdatingRequiredTxStatusError) {
      setSnackbar({
        show: true,
        message: `Failed to dismiss the notification. Please try again later.`,
        severity: "error",
      });
    }
  }, [isUpdatingRequiredTxStatusError, setSnackbar]);

  const dismissPaymentReceivedNotification = () => {
    executeUpdateRequiredTransactionStatus({
      groupId,
      transactionId,
      approvalUser: "recipient",
    });
  };

  useEffect(() => {
    if (paymentReceivedTxList && currentIndex >= paymentReceivedTxList.length) {
      setCurrentIndex(paymentReceivedTxList!.length - 1);
    }
  }, [paymentReceivedTxList, currentIndex]);

  if (!paymentReceivedTxList || paymentReceivedTxList.length === 0) {
    return null;
  }

  const {
    groupId,
    groupName,
    counterPartyName,
    transactionId,
    transactionAmount,
  } = paymentReceivedTxList[currentIndex];

  // if (isOpen && (isLoading || isFetching)) {
  //   return <Spinner isOverlay={true} />;
  // }

  const moveToNextTransaction = () => {
    setCurrentIndex((prev) => (prev + 1) % paymentReceivedTxList!.length);
  };

  const moveToPreviousTransaction = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? paymentReceivedTxList!.length - 1 : prev - 1
    );
  };

  if (paymentReceivedTxList.length === 0) {
    return (
      <CustomModal
        ariaLabel="No Transaction Updates"
        closeModal={() =>
          setPaymentReceivedTXModalAlert((prev) => ({ ...prev, isOpen: false }))
        }
        isOpen={isOpen}
        showCloseButton={true}
      >
        <Box sx={{ padding: theme.spacing(4), textAlign: "center" }}>
          <Typography variant="h6">No Action Required</Typography>
          <Typography>
            There are currently no transaction updates that need your attention.
            You can close this window and check back later for any new updates.
          </Typography>
        </Box>
      </CustomModal>
    );
  }

  return (
    <CustomModal
      ariaLabel="Transaction Update Alerts"
      closeModal={() =>
        setPaymentReceivedTXModalAlert((prev) => ({ ...prev, isOpen: false }))
      }
      isOpen={isOpen}
      showCloseButton={true}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          color="primary"
          aria-label="previous button"
          onClick={moveToPreviousTransaction}
          sx={{
            height: "40px",
            width: "40px",
            visibility:
              currentIndex > 0 && paymentReceivedTxList.length > 1
                ? "visible"
                : "hidden",
          }}
        >
          <KeyboardArrowLeftIcon fontSize="large" />
        </IconButton>
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
              {paymentReceivedTxList.length}
            </span>
            Payment Received
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
              {`${formatNumberWithLocaleAndNegatives(transactionAmount)}₩`}
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
            '
          </Typography>
          <Typography variant="caption">
            Note: This is part of a system simulation to illustrate how
            transactions would be handled and notified in a real setting. No
            actual money has moved as this functionality is designed solely for
            demonstration purposes in our project.
          </Typography>
          <CustomButton
            buttonStyle="secondaryOutline"
            onClick={() => dismissPaymentReceivedNotification()}
            sx={{ flex: 1 }}
          >
            Dismiss
          </CustomButton>
        </Stack>
        <IconButton
          color="primary"
          aria-label="next button"
          onClick={moveToNextTransaction}
          sx={{
            height: "40px",
            width: "40px",
            visibility:
              currentIndex < paymentReceivedTxList.length - 1 &&
              paymentReceivedTxList.length > 1
                ? "visible"
                : "hidden",
          }}
        >
          <KeyboardArrowRightIcon fontSize="large" />
        </IconButton>
      </Box>
    </CustomModal>
  );
};

export default UpdatedTransactionReponseHandler;
