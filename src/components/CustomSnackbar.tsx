import { Alert, Snackbar } from "@mui/material";
import CustomBackdrop from "@components/CustomBackdrop";
import { useRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";

const CustomSnackbar = () => {
  const [{ show, message, severity }, setSnackbar] =
    useRecoilState(snackbarState);

  const handleClose = () => {
    setSnackbar((prevState) => ({ ...prevState, show: false }));
  };

  return (
    <>
      <CustomBackdrop isOpen={show} zIndex={2000} />
      <Snackbar
        open={show}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          maxWidth: "550px",
          zIndex: (theme) => theme.zIndex.snackbar,
        }}
      >
        <Alert
          severity={severity}
          onClose={handleClose}
          sx={{ maxWidth: "550px" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomSnackbar;
