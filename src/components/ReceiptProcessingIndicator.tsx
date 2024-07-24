import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import CustomButton from "@components/CustomButton";
import Spinner from "@components/Spinner";
import EastIcon from "@mui/icons-material/East";

const ReceiptProcessingIndicator = () => {
  const navigate = useNavigate();

  return (
    <Stack
      sx={{
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <Stack spacing={5} sx={{ mt: 10 }}>
        <Spinner size={70} />
        <Typography textAlign="center" variant="subtitle1">
          We're currently processing your receipt to extract the necessary
          information. <br />
          <br /> This might take a moment. <br />
          Thank you for your patience!
          <br />
          <br />
          If you prefer, you can manually input the details instead.
        </Typography>
      </Stack>

      <CustomButton
        buttonStyle="primaryPlain"
        endIcon={<EastIcon />}
        onClick={() => {
          navigate("/expense/edit");
        }}
      >
        Go Enter Details Manually
      </CustomButton>
    </Stack>
  );
};

export default ReceiptProcessingIndicator;
