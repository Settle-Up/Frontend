import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import CustomModal from "@components/CustomModal";
import CustomButton from "@components/CustomButton";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { formatNumberWithLocaleAndNegatives } from "@utils/numberStringConversions";
import { useMutation, useQuery } from "react-query";
import { getUpdatedTransactionList } from "@apis/transaction/getUpdatedTransactionList";
import { updateRequiredTransactionStatus } from "@apis/transaction/updateRequiredTransactionStatus";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";
import { mockUpdatedTransactions } from "@mock/transactionMock";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import theme from "@theme";
import { updatedTransactionsAlertState } from "@store/TxUpdateAlertsModalStore";
import Spinner from "@components/Spinner";

const TransactionUpdateAlert = () => {
  const setSnackbar = useSetRecoilState(snackbarState);
  const [isInitialFetch, setIsInitialFetch] = useState(true);

  const [{ isOpen, updatedTransactionList }, setUpdatedTransactionsAlert] =
    useRecoilState(updatedTransactionsAlertState);

  const [currentIndex, setCurrentIndex] = useState(0);

  const { isLoading, isFetching, error } = useQuery(
    "updatedTransactionList",
    () => getUpdatedTransactionList(),
    {
      onSuccess: (data) => {
        if (isInitialFetch) {
          setUpdatedTransactionsAlert((prev) => ({
            ...prev,
            isOpen: data.length > 0 ? true: false,
            updatedTransactionList: data,
          }));
          setIsInitialFetch(false);
        } else {
          setUpdatedTransactionsAlert((prev) => ({
            ...prev,
            isOpen: false,
            updatedTransactionList: data,
          }));
        }
      },
    }
  );

  const { mutate } = useMutation(updateRequiredTransactionStatus, {
    onSuccess: (data, variables: TransactionDecision) => {
      setSnackbar({
        show: true,
        message: ``,
        severity: "success",
      });
      setUpdatedTransactionsAlert((prev) => ({
        ...prev,
        updatedTransactionList: prev.updatedTransactionList!.filter(
          (t) => t.transactionId !== variables.transactionId
        ),
      }));
      if (currentIndex >= updatedTransactionList!.length - 1) {
        setCurrentIndex((current) => Math.max(current - 1, 0));
      }
    },
    onError: (error, variables, context) => {
      setSnackbar({
        show: true,
        message: ``,
        severity: "error",
      });
    },
  });

  const handleResponse = (
    transactionId: string,
    groupId: string,
    transactionDirection: "OWED" | "OWE",
    approvalDecision: "CLEAR" | "REJECT"
  ) => {
    mutate({
      groupId,
      transactionId,
      approvalUser: transactionDirection === "OWE" ? "sender" : "recipient",
      approvalStatus: approvalDecision,
    } as TransactionDecision);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % updatedTransactionList!.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? updatedTransactionList!.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (
      updatedTransactionList &&
      currentIndex >= updatedTransactionList.length
    ) {
      setCurrentIndex(updatedTransactionList!.length - 1);
    }
  }, [updatedTransactionList, currentIndex]);

  if (!updatedTransactionList || updatedTransactionList.length === 0) {
    return null;
  }

  const {
    groupId,
    groupName,
    counterPartyName,
    transactionId,
    transactionDirection,
    transactionAmount,
  } = updatedTransactionList[currentIndex];

  if(isOpen && (isLoading || isFetching)) {
    return (
      <Spinner isOverlay={true}/>
    )
  }

  if (updatedTransactionList.length === 0) {
    return (
      <CustomModal
        ariaLabel="No Transaction Updates"
        handleClose={() =>
          setUpdatedTransactionsAlert((prev) => ({ ...prev, isOpen: false }))
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
      handleClose={() =>
        setUpdatedTransactionsAlert((prev) => ({ ...prev, isOpen: false }))
      }
      isOpen={isOpen}
      showCloseButton={true}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          color="primary"
          aria-label="previous button"
          onClick={handlePrevious}
          sx={{
            height: "40px",
            width: "40px",
            visibility:
              currentIndex > 0 && updatedTransactionList.length > 1
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
              {updatedTransactionList.length}
            </span>
            Action Alerts: Transaction Updates Require Your Review
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
            </span>{" "}
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
          <Stack spacing={2}>
            <CustomButton
              buttonStyle="primary"
              sx={{ width: "100%" }}
              onClick={() =>
                handleResponse(
                  transactionId,
                  groupId,
                  transactionDirection,
                  "CLEAR"
                )
              }
            >
              Acknowledge
            </CustomButton>
            <CustomButton
              buttonStyle="secondary"
              sx={{ width: "100%" }}
              onClick={() =>
                handleResponse(
                  transactionId,
                  groupId,
                  transactionDirection,
                  "REJECT"
                )
              }
            >
              Not Settled Yet
            </CustomButton>
          </Stack>
        </Stack>
        <IconButton
          color="primary"
          aria-label="next button"
          onClick={handleNext}
          sx={{
            height: "40px",
            width: "40px",
            visibility:
              currentIndex < updatedTransactionList.length - 1 &&
              updatedTransactionList.length > 1
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

export default TransactionUpdateAlert;
