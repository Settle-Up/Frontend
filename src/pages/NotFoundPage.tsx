import React from "react";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import theme from "@theme";
import CustomButton from "@components/CustomButton";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const accessTokenExists = sessionStorage.getItem('accessToken');

  const handleNavigate = () => {
    if (accessTokenExists) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const buttonLabel = accessTokenExists ? "Go to My Groups" : "Login to Continue";

  return (
    <Stack
      className="gradient-background"
      sx={{
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        maxWidth: "600px",
        mx: "auto",
        px: 4,
        py: 4,
        gap: 2,
        backgroundColor: theme.palette.background.default,
        textAlign: "center"
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: "white" }}>
        404 Not Found
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "white", mb: 5 }}>
        Sorry, the page you're looking for does not exist.
      </Typography>
      <CustomButton onClick={handleNavigate} sx={{ fontSize: 15 }}>
        {buttonLabel}
      </CustomButton>
    </Stack>
  );
};

export default NotFoundPage;
