import { Snackbar, SnackbarContent, Typography } from "@mui/material";
import theme from "@theme";

type CustomSnackbarProps = {
  show: boolean;
  setShowSnackbar: (isVisible: boolean) => void;
};

const CustomSnackbar = ({ show, setShowSnackbar }: CustomSnackbarProps) => {
  const handleClose = () => {
    setShowSnackbar(false);
  };

  return (
    <Snackbar
      open={show}
      autoHideDuration={6000} 
      onClose={handleClose}
    //   anchorOrigin={{
    //     vertical: "top",
    //     horizontal: "center",
    //   }}
    >
      <SnackbarContent
        message={
          <Typography>
            We're sorry, but your receipt processing is taking longer than
            expected. Please wait a little longer, your receipt processing is on
            its way!
          </Typography>
        }
      />
    </Snackbar>
  );
};

export default CustomSnackbar;
