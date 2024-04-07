import { useNavigate } from "react-router-dom";
import { Box, Paper, Stack } from "@mui/material";
import CustomButton from "@components/CustomButton";
import GeneralExpenseDescription from "@components/GeneralExpenseDescription";
import HeadingWithTip from "@components/HeadingWithTip";

const ProcessReceiptInitialReviewPage = () => {
  const navigate = useNavigate();

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
            <GeneralExpenseDescription />
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
              navigate("/set-additional-expense-details");
            }}
          >
            Confirm and Proceed
          </CustomButton>
          <CustomButton
            buttonStyle="secondary"
            onClick={() => {
              navigate("/add/receipt/edit");
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
