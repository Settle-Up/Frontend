import { useNavigate } from "react-router-dom";
import { Box, Paper, Stack } from "@mui/material";
import CustomButton from "@components/CustomButton";
import GeneralExpenseDescription from "@components/Group/GeneralExpenseDescription";
import HeadingWithTip from "@components/HeadingWithTip";
import { useRecoilValue } from "recoil";
import { newExpenseState } from "@store/expenseStore";

const ProcessReceiptInitialReviewPage = () => {
  const navigate = useNavigate();
  const newExpense = useRecoilValue(newExpenseState);

  const { receiptName, address, receiptDate, receiptTotalPrice, itemList } =
    newExpense;

  return (
    <>
      <Stack
        sx={{
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        <Stack sx={{ gap: 2 }}>
          <HeadingWithTip
            heading="Review Extracted Receipt Details"
            tipMessage="Ensure all details match your receipt. You can proceed if the information is accurate or edit if adjustments are needed."
          />
          <Paper sx={{ backgroundColor: "white", borderRadius: 3, padding: 3 }}>
            <GeneralExpenseDescription
              receiptName={receiptName}
              address={address}
              receiptDate={receiptDate}
              receiptTotalPrice={receiptTotalPrice}
              itemList={itemList}
              showReceiptName
            />
          </Paper>
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
            onClick={() => {
              navigate("/expense/allocation/settings");
            }}
          >
            Confirm and Proceed
          </CustomButton>
          <CustomButton
            buttonStyle="secondary"
            onClick={() => {
              navigate("/expense/edit");
            }}
          >
            Edit Receipt Details
          </CustomButton>
        </Box>
      </Stack>
    </>
  );
};

export default ProcessReceiptInitialReviewPage;
