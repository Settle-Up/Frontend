import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import Spinner from "@components/Spinner";
import { signIn } from "@apis/auth/signIn";
import { userAuthState } from "../store/userStore";


const LoginLoadingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const authCode = queryParams.get("code");
  const setUserAuthState = useSetRecoilState(userAuthState);

  const {
    data: userAuthData,
    isLoading,
    error,
  } = useQuery(
    "userAuthData",
    () => {
      if (authCode) {
        return signIn(authCode);
      }
      throw new Error("Auth code is missing");
    },
    {
      enabled: !!authCode,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (userAuthData) {
      setUserAuthState(userAuthData)
      navigate("/");
    }
  }, [userAuthData, navigate, setUserAuthState]);

  return (
    <Box>
      <Typography> Please hold on a brief second </Typography>
      <Spinner />
    </Box>
  );
};

export default LoginLoadingPage;
