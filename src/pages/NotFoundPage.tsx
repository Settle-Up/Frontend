import React from "react";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import theme from "@theme";
import CustomButton from "@components/CustomButton";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <Stack
      className="gradient-background"
      sx={{
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        maxWidth: "600px",
        mx: "auto",
        px: 2,
        py: 4,
        gap: 2,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: "white" }}>
        404 Not Found
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "white", mb: 5 }}>
        Sorry, the page you're looking for does not exist.
      </Typography>
      <CustomButton onClick={handleNavigateHome} sx={{ fontSize: 15 }}>
        Go Home
      </CustomButton>
    </Stack>
  );
};

export default NotFoundPage;
