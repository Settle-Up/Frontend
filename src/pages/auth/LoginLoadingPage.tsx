import { Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import Spinner from "@components/Spinner";
import { signIn } from "@apis/auth/signIn";
import { snackbarState } from "@store/snackbarStore";

const LoginLoadingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const authCode = queryParams.get("code");
  const setSnackbar = useSetRecoilState(snackbarState);

  const {
    data: userAuthDetails,
    isSuccess,
    isError,
  } = useQuery("userAuthDetails", () => {
    if (authCode) {
      return signIn(authCode);
    }
    throw new Error("Auth code is missing");
  });

  useEffect(() => {
    const preAuthRoute = sessionStorage.getItem("preAuthRoute");
    if (isSuccess && userAuthDetails) {
      const { accessToken, issuedTime, expiresIn } = userAuthDetails;

      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("issuedTime", issuedTime);
      sessionStorage.setItem("expiresIn", expiresIn);

      navigate(preAuthRoute || "/");
      sessionStorage.removeItem("preAuthRoute");
    }
  }, [isSuccess, userAuthDetails, navigate]);

  useEffect(() => {
    if (isError) {
      setSnackbar({
        show: true,
        message:
          "Sorry, something went wrong with your login attempt. Please try again later.",
        severity: "error",
      });
      navigate("/login");
    }
  }, [isError, navigate, setSnackbar]);

  return (
    <Stack
      spacing={2}
      sx={{
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Spinner size={70} />
    </Stack>
  );
};

export default LoginLoadingPage;
