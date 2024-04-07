import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import CustomButton from "@components/CustomButton";
import Spinner from "@components/Spinner";
import EastIcon from "@mui/icons-material/East";

const ReceiptProcessingIndicator = () => {
  const navigate = useNavigate();

  return (
    <Stack spacing={5} sx={{ alignItems: "center" }}>
      <Spinner size={70} />
      <Typography textAlign="center">
        We're currently processing your receipt to extract the necessary
        information. This might take a moment. Thank you for your patience!
      </Typography>
      <Typography textAlign="center">
        If you prefer, you can manually input the details instead.
      </Typography>
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
