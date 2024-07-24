import { useCallback, useEffect, useState } from "react";
import CustomButton from "@components/CustomButton";
import { Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { newExpenseState } from "@store/expenseStore";
import { useMutation } from "react-query";
import { extractTextFromReceipt } from "@apis/receipts/extractTextFromReceipt";
import ReceiptProcessingIndicator from "@components/ReceiptProcessingIndicator";
import { mergeReceiptInToExpense } from "@utils/mergeReceiptIntoExpense";
import ImageUploaderWithPreview from "@components/ImageUploaderWithPreview";
import GroupPickerFromJoined from "@components/Group/GroupPickerFromJoined";
import { useSetRecoilState } from "recoil";
import { isNewExpenseFormFlowInitiatedState } from "@store/expenseStore";
import useFeedbackHandler from "@hooks/useFeedbackHandler";
import validateExpenseInput from "@utils/validateExpenseInput";
import { snackbarState } from "@store/snackbarStore";

const ReceiptUploadPage = () => {
  const navigate = useNavigate();
  const setSnackbar = useSetRecoilState(snackbarState);

  const [newExpense, setNewExpense] = useRecoilState(newExpenseState);
  const [groupError, setGroupError] = useState('');

  const {
    mutate: executeGetProcessedReceipt,
    data: processedReceipt,
    isError,
    isLoading,
    isSuccess,
  } = useMutation(extractTextFromReceipt);

  const successAction = useCallback(() => {
    if (processedReceipt) {
      const mergedData = mergeReceiptInToExpense(processedReceipt, newExpense);
      setNewExpense(mergedData);
  
      const { errors, isValid } = validateExpenseInput(mergedData, "NewExpense");
  
      if (isValid) {
        navigate("/expense/review/initial");
      } else {
        navigate("/expense/edit", { state: { errors, isValid } });
      }
    }
  }, [processedReceipt]);

  useFeedbackHandler({
    isError,
    errorMessage: "Oops! We couldn't process your receipt.",
    isSuccess,
    successAction,
  });

  const ensureGroupSelected = () => {
    if (!newExpense.groupId) {
      setGroupError('Please select a group before proceeding.');
      return false; 
    }
    setGroupError('');
    return true;  
  };
  

  const setIsNewExpenseFormFlowInitiated = useSetRecoilState(
    isNewExpenseFormFlowInitiatedState
  );

  useEffect(() => {
    setIsNewExpenseFormFlowInitiated(true);
  }, [setIsNewExpenseFormFlowInitiated]);

  const handleProcessReceiptClick = () => {
    if (!ensureGroupSelected()) return; 
  
    if (newExpense.receiptImgFile) {
      const requestData = new FormData();
      requestData.append("image", newExpense.receiptImgFile);
      executeGetProcessedReceipt(requestData);
    } else {
      setSnackbar({
        show: true,
        message:
          "Please verify that you have uploaded a receipt.",
        severity: "warning",
      });
    }
  };
  
  
  const handleManualEntryClick = () => {
    if (!ensureGroupSelected()) return; 
    navigate("/expense/edit");
  };
  

  return (
    <>
      {isLoading ? (
        <ReceiptProcessingIndicator />
      ) : (
        <Stack
          sx={{
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          <Stack spacing={2}>
            <GroupPickerFromJoined groupError={groupError}/>
            <ImageUploaderWithPreview />
          </Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: { xs: "flex-end" },
              gap: 2,
              mt: 5,
            }}
          >
            <CustomButton
              buttonStyle="primary"
              onClick={handleProcessReceiptClick}
            >
              Process Receipt
            </CustomButton>
            <CustomButton
              buttonStyle="secondary"
              onClick={handleManualEntryClick}
            >
              Go Enter Details Manually
            </CustomButton>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default ReceiptUploadPage;
