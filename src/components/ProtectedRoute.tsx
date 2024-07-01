import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";
import { getUserProfile } from "@apis/users/getUserProfile";
import { useQuery } from "react-query";
import useFeedbackHandler from "@hooks/useFeedbackHandler";
import { useCallback } from "react";
import { userProfileState } from "@store/userStore";

const ProtectedRoute = () => {
  const location = useLocation();
  const accessToken = sessionStorage.getItem("accessToken");
  const setSnackbar = useSetRecoilState(snackbarState);
  const setUserProfile = useSetRecoilState(userProfileState);


  const {
    data: fetchedUserProfile,
    isSuccess,
    isError,
    refetch,
  } = useQuery(["fetchedUserProfile", accessToken], getUserProfile, {
    enabled: false,
  });

  const successAction = useCallback(() => {
    if(fetchedUserProfile) {
      setUserProfile(fetchedUserProfile);
    }
  }, [fetchedUserProfile]);

  useFeedbackHandler({
    isSuccess,
    successAction,
    isError,
    errorMessage: "Sorry, unable to load your profile at this moment.",
  });

  if (accessToken && !isSuccess) {
    refetch();
  }

  if (!accessToken) {
    if (location.pathname !== "/") {
      setSnackbar({
        show: true,
        message: "Please log in to access this page.",
        severity: "error",
      });
    }
    sessionStorage.setItem("preAuthRoute", location.pathname);
    return <Navigate to="/login" replace />;
  } 
  
  return <Outlet />;
};

export default ProtectedRoute;
