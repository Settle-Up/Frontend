import { Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import Spinner from "@components/Spinner";
import { signIn } from "@apis/auth/signIn";
import { userAuthState } from "@store/userStore";
import theme from "@theme";
import { snackbarState } from "@store/snackbarStore";

const LoginLoadingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const authCode = queryParams.get("code");
  const setUserAuthState = useSetRecoilState(userAuthState);
  const setSnackbar = useSetRecoilState(snackbarState);

  const {
    data: userAuthData,
    isLoading,
    error,
  } = useQuery(
    "userAuthData",
    () => {
      console.log("sdihfakljsd;flakjsdf!!!!!!!!!!!!!!!!!!!!!1");
      if (authCode) {
        return signIn(authCode);
      }
      setSnackbar({
        show: true,
        message:
          "Oops! It looks like your login attempt hit a snag. We apologize for the inconvenience. Could you please give it another try? If you continue to face issues, our support team is here to help. Thanks for bearing with us!",
        severity: "error",
      });
    },
    {
      onError: () => {
        setSnackbar({
          show: true,
          message:
            "Oops! It looks like your login attempt hit a snag. We apologize for the inconvenience. Could you please give it another try? If you continue to face issues, our support team is here to help. Thanks for bearing with us!",
          severity: "error",
        });
      },
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    setSnackbar({
      show: true,
      message:
        "Oops! It looks like your login attempt hit a snag. We apologize for the inconvenience. Could you please give it another try? If you continue to face issues, our support team is here to help. Thanks for bearing with us!",
      severity: "error",
    });
    // navigate("/login");
  }, [authCode]);

  useEffect(() => {
    if (userAuthData) {
      setUserAuthState(userAuthData);
      navigate("/");
    }
  }, [userAuthData, navigate, setUserAuthState]);

  return (
    <Stack
      sx={{
        height: "100%",
        maxWidth: "600px",
        justifyContent: "center",
        mx: "auto",
        px: 2,
        py: 4,
        gap: 2,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
        Please hold on a brief second
      </Typography>
      <Spinner />
    </Stack>
  );
};

export default LoginLoadingPage;
