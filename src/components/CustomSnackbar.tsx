import { Alert, Snackbar } from "@mui/material";
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
          "& .MuiAlert-root": {
            boxShadow: 6,
          },
        }}
      >
        <Alert
          severity={severity}
          onClose={closeAlert}
          sx={{
            maxWidth: "550px",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomSnackbar;
