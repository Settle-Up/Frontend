import CustomButton from "@components/CustomButton";
import { Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import { useRecoilState } from "recoil";
import { newExpenseState } from "@store/expenseStore";
import { useMutation } from "react-query";
import { getProcessedReceipt } from "@apis/expense/getProcessedReceipt";
import ReceiptProcessingIndicator from "@components/ReceiptProcessingIndicator";
import { mergeReceiptInToExpense } from "@utils/mergeReceiptIntoExpense";
import ImageUploaderWithPreview from "@components/ImageUploaderWithPreview";
import GroupPickerFromJoined from "@components/GroupPickerFromJoined";

const ReceiptUploadPage = () => {
  const navigate = useNavigate();
  const [newExpense, setNewExpense] = useRecoilState(newExpenseState);

  const getProcessedReceiptMutation = useMutation(getProcessedReceipt, {
    onSuccess: (newReceipt) => {
      if (newReceipt) {
        const mergedData = mergeReceiptInToExpense(newReceipt, newExpense);
        console.log("-----------------Merged data-----------------", mergedData);
        setNewExpense(mergedData);
        navigate("/processed-receipt/initial-review");
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

  return (
    <>
      {getProcessedReceiptMutation.isLoading ? (
        <ReceiptProcessingIndicator />
      ) : (
        <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
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
              my: 3,
            }}
          >
            <CustomButton
              buttonStyle="default"
              onClick={handleProcessReceiptClick}
            >
              Process Receipt
            </CustomButton>
            <CustomButton
              buttonStyle="primaryPlain"
              endIcon={<EastIcon />}
              onClick={() => {
                navigate("/edit-receipt");
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
