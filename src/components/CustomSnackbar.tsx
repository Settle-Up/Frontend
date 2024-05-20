import { Alert, Snackbar } from "@mui/material";
import CustomBackdrop from "@components/CustomBackdrop";
import { useRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";

const CustomSnackbar = () => {
  const [{ show, message, severity }, setSnackbar] =
    useRecoilState(snackbarState);

  const closeAlert = () => {
    setSnackbar((prevState) => ({ ...prevState, show: false }));
  };

  return (
    <>
      <CustomBackdrop isOpen={show} zIndex={2000} />
      <Snackbar
        open={show}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        autoHideDuration={null} 
        sx={{
          maxWidth: "550px",
          zIndex: (theme) => theme.zIndex.snackbar,
        }}
      >
        <Alert
          severity={severity}
          onClose={closeAlert}
          sx={{ maxWidth: "550px" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomSnackbar;
