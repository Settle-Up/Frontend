import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import ReceiptDetailsPaper from "@components/ReceiptDetailsPaper";
import CustomIconButton from "@components/CustomIconButton";
import EastIcon from "@mui/icons-material/East";

const ReceiptFinalReviewPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="subtitle1" gutterBottom sx={{ alignSelf: "center" }}>
        Here's How Your Final Receipt Looks
      </Typography>
      <ReceiptDetailsPaper />
      <Stack sx={{ mt: 8 }}>
        <CustomIconButton
          ariaLabel="Move on to next step"
          handleClick={() => navigate("/receipt/final-review")}
          icon={<EastIcon sx={{ fontSize: "30px" }} />}
          shape="round"
          sx={{
            alignSelf: "flex-end",
          }}
        />
      </Stack>
    </>
  );
};

export default ReceiptFinalReviewPage;
