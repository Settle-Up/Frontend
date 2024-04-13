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
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import theme from "@theme";
import { respondToUpdatedTxsModalState } from "@store/respondToUpdatedTxsModalStore";
import Spinner from "@components/Spinner";

const UpdatedTransactionReponseHandler = () => {
  const setSnackbar = useSetRecoilState(snackbarState);
  const [isInitialFetch, setIsInitialFetch] = useState(true);

  const [{ isOpen, updatedTransactionList }, setUpdatedTransactionsAlert] =
    useRecoilState(respondToUpdatedTxsModalState);

  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    data: fetchedUpdatedTransactionList,
    isLoading: isFetchingUpdatedTxLoading,
    isError: isFetchingUpdatedTxListError,
    isSuccess: isFetchingUpdatedTxListSuccess,
    isFetching,
  } = useQuery("updatedTransactionList", () => getUpdatedTransactionList());

  useEffect(() => {
    if (isFetchingUpdatedTxListSuccess) {
      if (isInitialFetch && fetchedUpdatedTransactionList) {
        setUpdatedTransactionsAlert((prev) => ({
          ...prev,
          isOpen: fetchedUpdatedTransactionList?.length > 0 ? true : false,
          updatedTransactionList: fetchedUpdatedTransactionList,
        }));
        setIsInitialFetch(false);
      } else {
        setUpdatedTransactionsAlert((prev) => ({
          ...prev,
          isOpen: false,
          updatedTransactionList: fetchedUpdatedTransactionList,
        }));
      }
    }
  }, [
    isFetchingUpdatedTxListSuccess,
    setSnackbar,
    fetchedUpdatedTransactionList,
  ]);

  useEffect(() => {
    if (isFetchingUpdatedTxListError) {
      setSnackbar({
        show: true,
        message: `Sorry, an error occurred while loading updated transactions. Please try again later.`,
        severity: "error",
      });
    }
  }, [isFetchingUpdatedTxListError, setSnackbar]);

  const moveToNextTransaction = () => {
    setCurrentIndex((prev) => (prev + 1) % updatedTransactionList!.length);
  };

  const moveToPreviousTransaction = () => {
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

  // if (isOpen && (isLoading || isFetching)) {
  //   return <Spinner isOverlay={true} />;
  // }

  if (updatedTransactionList.length === 0) {
    return (
      <CustomModal
        ariaLabel="No Transaction Updates"
        closeModal={() =>
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
      closeModal={() =>
        setUpdatedTransactionsAlert((prev) => ({ ...prev, isOpen: false }))
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
        </Stack>
        <IconButton
          color="primary"
          aria-label="next button"
          onClick={moveToNextTransaction}
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

export default UpdatedTransactionReponseHandler;
