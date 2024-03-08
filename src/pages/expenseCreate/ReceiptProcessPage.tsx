import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import CustomButton from "@components/CustomButton";
import Spinner from "@components/Spinner";
import EastIcon from "@mui/icons-material/East";
import theme from "@theme";
import CustomSnackbar from "@components/CustomSnackbar";

/* should show the loading screen until the ocr api returns a response and the response has been normalized and cleaned on our end and has been passed to this component.
    is there a need to manage the receipt details data globally? */

type ReceiptProcessPageProps = {};

const ReceiptProcessPage = ({}: ReceiptProcessPageProps) => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(1);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(timerInterval); // Clear interval when timer reaches 0
          setShowSnackbar(true); // Set timerExpired to true when timer reaches 0
          return prevTimer;
        }
      });
    }, 1000); // Update timer every second

    return () => clearInterval(timerInterval); // Cleanup function to clear interval
  }, []); // Run effect only once on component mount

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <Stack spacing={5} sx={{ alignItems: "center" }}>
      <Stack sx={{ alignItems: "center" }}>
        
        <Typography variant="subtitle1">Estimated Time Remaining</Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: theme.palette.primary.main }}
        >
          {formatTime(timer)}
        </Typography>
      </Stack>

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
          navigate("/edit-receipt");
        }}
      >
        Go Enter Details Manually
      </CustomButton>
      <CustomSnackbar show={showSnackbar} setShowSnackbar={setShowSnackbar} />
    </Stack>
  );
};

export default ReceiptProcessPage;
