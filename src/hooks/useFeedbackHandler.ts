import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";

type useFeedbackHandlerParams = {
  isError?: boolean;
  errorAction?: () => void;
  errorMessage?: string;
  isSuccess?: boolean;
  successAction?: () => void;
  successMessage?: string;
  unconditionalExecute?: () => void;
};

const useFeedbackHandler = ({
  isError = false,
  errorAction,
  errorMessage,
  isSuccess = false,
  successAction,
  successMessage,
  unconditionalExecute,
}: useFeedbackHandlerParams) => {
  const setSnackbar = useSetRecoilState(snackbarState);
  useEffect(() => {
    if (isSuccess) {
      if (successAction) successAction();
      if (successMessage) {
        setSnackbar({
          show: true,
          message: successMessage,
          severity: "success",
        });
      }
    }
  }, [isSuccess, successAction, successMessage, setSnackbar]);

  useEffect(() => {
    if (isError) {
      if (errorAction) errorAction();
      if (errorMessage) {
        setSnackbar({
          show: true,
          message: errorMessage,
          severity: "error",
        });
      }
    }
  }, [isError, errorAction, errorMessage, setSnackbar]);

  useEffect(() => {
    if ((isSuccess || isError) && unconditionalExecute) {
      unconditionalExecute();
    }
  }, [isSuccess, isError, unconditionalExecute, setSnackbar]);
};

export default useFeedbackHandler;
