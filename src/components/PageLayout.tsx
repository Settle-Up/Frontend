import { Outlet } from "react-router-dom";
import { Stack, Typography } from "@mui/material";

const PageLayout = () => {
  return (
    <>
      <Stack
        sx={{
          height: "100vh",
          maxWidth: "600px",
          //   alignItems: "center",
          m: "auto",
          px: 4,
          py: 2,
          gap: 2,
          // border: "3px dotted blue",
        }}
      >
        <Typography variant="h6" sx={{ alignSelf: "center" }}>
          Settle Up
        </Typography>
        <Outlet />
      </Stack>
    </>
  );
};

export default PageLayout;
