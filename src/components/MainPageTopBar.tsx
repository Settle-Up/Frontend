import { Box, Typography } from "@mui/material";
import MainPageSettings from "@components/MainPageSettings";
import NotificationIcon from "@components/Notification/NotificationIcon";

const MainPageTopBar = () => {
  return (
    <>
      <Typography
        variant="h6"
        sx={{
          position: "relative",
          alignSelf: "center",
        }}
      >
        Settle Up
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItem: "center",
          position: "absolute",
          right: { xs: 10, md: 30 },
        }}
      >
        <NotificationIcon />
        <MainPageSettings />
      </Box>
    </>
  );
};

export default MainPageTopBar;
