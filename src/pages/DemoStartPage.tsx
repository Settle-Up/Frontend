import React, { useEffect, useState } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import CustomButton from "@components/CustomButton";
import { useSetRecoilState } from "recoil";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { snackbarState } from "@store/snackbarStore";
import { useQuery } from "react-query";
import { demoSignIn } from "@apis/auth/demoSignIn";
import { useNavigate } from "react-router-dom";
import useFeedbackHandler from "@hooks/useFeedbackHandler";
import { userProfileState } from "@store/userStore";

const DemoStartPage = () => {
  const navigate = useNavigate();
  const setSnackbar = useSetRecoilState(snackbarState);
  const setUserProfile = useSetRecoilState(userProfileState);

  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const {
    data: userAuthDetails,
    isSuccess,
    isError,
    refetch,
  } = useQuery(
    ["userAuthDetails"],
    () => {
      if (name) {
        return demoSignIn(name);
      }
      throw new Error("Auth code is missing");
    },
    {
      enabled: false,
    }
  );

  useFeedbackHandler({
    isError,
    errorMessage:
      "Sorry, we are unable to provide you with demo access at this time. Please try again later.",
  });

  const createDemoAccount = () => {
    if (name.trim() === "") {
      setSnackbar({
        show: true,
        message: "Please enter your name to get started!",
        severity: "warning",
      });
    } else {
      refetch();
    }
  };

  useEffect(() => {
    if (isSuccess && userAuthDetails) {
      const {
        accessToken,
        issuedTime,
        expiresIn,
        userId,
        userName,
        demoUserTemporaryEmail,
      } = userAuthDetails;

      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("issuedTime", issuedTime);
      sessionStorage.setItem("expiresIn", expiresIn);
      setUserProfile({
        userId,
        userName,
        userEmail: demoUserTemporaryEmail,
        isDecimalInputOption: false,
      });
    }
  }, [isSuccess, userAuthDetails, navigate]);

  const startExploring = () => {
    const preAuthRoute = sessionStorage.getItem("preAuthRoute");
    navigate(preAuthRoute || "/");
    sessionStorage.removeItem("preAuthRoute");
    setName("")
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (/^[a-zA-Z\s\-\'\.]*$/.test(newValue) || newValue === "") {
      setName(newValue);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <Stack
      spacing={!userAuthDetails ? 5 : 2}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        color: "white",
      }}
    >
      {!userAuthDetails ? (
        <>
          <Typography id={name} variant="h6" gutterBottom>
            Please provide a name for this demo <SentimentSatisfiedAltIcon />
          </Typography>
          <TextField
            aria-labelledby={name}
            name={name}
            value={name}
            onChange={handleInputChange}
            required={true}
            variant="outlined"
            error={error}
            helperText={error ? "Only English characters are allowed." : ""}
            sx={{
              minWidth: "300px",
              maxWidth: "500px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-error fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiFormHelperText-root": {
                color: "white",
                fontSize: 14,
                fontWeight: 600,
              },
            }}
          />
          <CustomButton
            sx={{ fontSize: 15 }}
            buttonStyle="default"
            onClick={createDemoAccount}
          >
            Create Demo Account
          </CustomButton>
        </>
      ) : (
        <>
          {userAuthDetails.userName !== name ? (
            <>
              <Typography variant="h6"> Existing Demo Account Found</Typography>
              <Typography variant="subtitle1" sx={{ maxWidth: "80%" }}>
                You already have an active demo account with valid credentials.
                You will continue to use your existing username and email for
                this demo session. Interactions are limited to other demo users
                only.
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h6"> Demo Access Granted</Typography>
              <Typography variant="subtitle1" sx={{ maxWidth: "80%" }}>
                Your demo credentials are now set. These will serve as your
                username and email during the demo, which lasts for 1 hour. This
                account allows interactions with other demo users only. After 1
                hour, the demo account will expire.
              </Typography>
            </>
          )}
          <Stack sx={{ border: "3px solid white", p: 3, borderRadius: 3, minWidth: "80%" }}>
            <Typography variant="subtitle1">Username :</Typography>
            <Typography variant="subtitle1">
              {userAuthDetails?.userName}
            </Typography>
            <Typography variant="subtitle1">Email :</Typography>
            <Typography variant="subtitle1">
              {userAuthDetails?.demoUserTemporaryEmail}
            </Typography>
          </Stack>
          <CustomButton
            sx={{ fontSize: 15 }}
            buttonStyle="default"
            onClick={startExploring}
          >
            Start Exploring
          </CustomButton>
        </>
      )}
    </Stack>
  );
};

export default DemoStartPage;
