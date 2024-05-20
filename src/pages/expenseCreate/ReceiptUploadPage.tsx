import { useEffect } from "react";
import CustomButton from "@components/CustomButton";
import { Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { newExpenseState } from "@store/expenseStore";
import { useMutation } from "react-query";
import { getProcessedReceipt } from "@apis/expense/getProcessedReceipt";
import ReceiptProcessingIndicator from "@components/ReceiptProcessingIndicator";
import { mergeReceiptInToExpense } from "@utils/mergeReceiptIntoExpense";
import ImageUploaderWithPreview from "@components/ImageUploaderWithPreview";
import GroupPickerFromJoined from "@components/GroupPickerFromJoined";
import { useSetRecoilState } from 'recoil';
import { isNewExpenseFormFlowInitiatedState } from '@store/isNewExpenseFormFlowInitiatedState';

const ReceiptUploadPage = () => {
  const navigate = useNavigate();
  const [newExpense, setNewExpense] = useRecoilState(newExpenseState);

  const getProcessedReceiptMutation = useMutation(getProcessedReceipt, {
    onSuccess: (newReceipt) => {
      if (newReceipt) {
        const mergedData = mergeReceiptInToExpense(newReceipt, newExpense);
        console.log(
          "-----------------Merged data-----------------",
          mergedData
        );
        setNewExpense(mergedData);
        navigate("/expense/review/initial");
      }
    },
  });

  const handleProcessReceiptClick = () => {
    if (newExpense.receiptImgFile) {
      const requestData = new FormData();
      requestData.append("image", newExpense.receiptImgFile);
      getProcessedReceiptMutation.mutate(requestData);
    }
  };

  const setIsNewExpenseFormFlowInitiated = useSetRecoilState(isNewExpenseFormFlowInitiatedState);

  useEffect(() => {
    setIsNewExpenseFormFlowInitiated(true);
  }, [setIsNewExpenseFormFlowInitiated]);


  return (
    <>
      {getProcessedReceiptMutation.isLoading ? (
        <ReceiptProcessingIndicator />
      ) : (
        <Stack
          sx={{
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          <Stack spacing={2}>
            <GroupPickerFromJoined />
            <ImageUploaderWithPreview />
          </Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: { xs: "flex-end" },
              gap: 2,
              mt: 5
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
              onClick={() => {
                navigate("/expense/edit");
              }}
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
