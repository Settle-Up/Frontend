import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import GeneralExpenseInfoCard from "@components/GeneralExpenseInfoCard";
import CustomIconButton from "@components/CustomIconButton";
import EastIcon from "@mui/icons-material/East";

const ReceiptFinalReviewPage = () => {
  const navigate = useNavigate();

  return (
    <Stack
      sx={{
        flexGrow: 1,
        justifyContent: "space-between",
      }}
    >
      <Typography variant="subtitle1" gutterBottom sx={{ alignSelf: "center" }}>
        Here's How Your Final Receipt Looks
      </Typography>
      <GeneralExpenseInfoCard />
      <CustomIconButton
        ariaLabel="Move on to next step"
        handleClick={() => navigate("/expense-allocation-setttings")}
        icon={<EastIcon sx={{ fontSize: "30px" }} />}
        shape="round"
        sx={{
          alignSelf: "flex-end",
          mt: 5,
        }}
      />
    </Stack>
  );
};

export default ReceiptFinalReviewPage;
