import { Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import Spinner from "@components/Spinner";
import { signIn } from "@apis/auth/signIn";
import { userAuthState } from "@store/userStore";
import { snackbarState } from "@store/snackbarStore";

const LoginLoadingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const authCode = queryParams.get("code");
  const setUserAuthState = useSetRecoilState(userAuthState);
  const setSnackbar = useSetRecoilState(snackbarState);

  const { data: userAuthData, isError } = useQuery(
    "userAuthData",
    () => {
      if (authCode) {
        return signIn(authCode);
      }
      throw new Error("Auth code is missing");
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    const preAuthRoute = sessionStorage.getItem("preAuthRoute");
    if (userAuthData) {
      setUserAuthState(userAuthData);
      navigate(preAuthRoute || "/");
      sessionStorage.removeItem("preAuthRoute");
    }
  }, [userAuthData, navigate, setUserAuthState]);

  useEffect(() => {
    if (isError) {
      setSnackbar({
        show: true,
        message:
          "Oops! It looks like your login attempt hit a snag. We apologize for the inconvenience. Could you please give it another try? If you continue to face issues, our support team is here to help. Thanks for bearing with us!",
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
      <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
        Please hold on a brief second..
      </Typography>
      <Spinner />
    </Stack>
  );
};

export default LoginLoadingPage;
