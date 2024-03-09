import { useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import CustomButton from "@components/CustomButton";
import ReceiptDetailsPaper from "@components/ReceiptDetailsPaper";
import HeadingWithTip from "@components/HeadingWithTip";

const ProcessReceiptInitialReviewPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Stack
        sx={{
          flexGrow: 1,
          justifyContent: "space-between",
          // border: "2px dotted red",
        }}
      >
        <Stack sx={{ gap: 2}}>
          <HeadingWithTip
            heading="Review Extracted Receipt Details"
            tipMessage="Ensure all details match your receipt. You can proceed if the information is accurate or edit if adjustments are needed."
          />
          <ReceiptDetailsPaper />
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
      </Stack>
    </>
  );
};

export default ProcessReceiptInitialReviewPage;
