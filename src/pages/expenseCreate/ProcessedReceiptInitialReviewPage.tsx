import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import CustomButton from "@components/CustomButton";
import { useRecoilValue } from "recoil";
import { newExpenseState } from "@store/expenseStore";


type ProcessReceiptInitialReviewPageProps = {};

const ProcessReceiptInitialReviewPage =
  ({}: ProcessReceiptInitialReviewPageProps) => {
    const navigate = useNavigate();

    const newExpense = useRecoilValue(newExpenseState);

    return (
      <>
        <Typography variant="h6" gutterBottom>
          Review Extracted Receipt Details
        </Typography>
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
              navigate("/edit-receipt");
            }}
          >
            Edit Receipt Details
          </CustomButton>
        </Box>
      </>
    );
  };

export default ProcessReceiptInitialReviewPage;
