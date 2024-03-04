import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useEffect } from "react";
import Spinner from "@components/Spinner";
import { signIn } from "@apis/auth/signIn";

const LoginLoadingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const authCode = queryParams.get("code");

  const {
    data: userAuthStatus,
    isLoading,
    error,
  } = useQuery(
    "userAuthStatus",
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
    if (userAuthStatus && userAuthStatus.success) {
      navigate("/"); 
    }
  }, [userAuthStatus, navigate]);

  return (
    <Box>
      <Typography> Please hold on a brief second </Typography>
      <Spinner />
    </Box>
  );
};

export default LoginLoadingPage;
