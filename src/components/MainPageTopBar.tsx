import { Badge, Box, IconButton, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRecoilState } from "recoil";
import { respondToUpdatedTxsModalState } from "@store/respondToUpdatedTxsModalStore";
import theme from "@theme";
import MainPageSettings from "@components/MainPageSettings";

const MainPageTopBar = () => {
  const [{ updatedTransactionList }, setUpdatedTransactionsAlert] =
    useRecoilState(respondToUpdatedTxsModalState);

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
        <IconButton
          aria-label="View Transaction Updates Require User's Review"
          onClick={() =>
            setUpdatedTransactionsAlert((prev) => ({ ...prev, isOpen: true }))
          }
          sx={{
            height: "40px",
            width: "40px",
            color: theme.palette.default.main,
          }}
        >
          <Badge
            badgeContent={updatedTransactionList?.length ?? null}
            color="primary"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        {/* <IconButton
          aria-label="View Transaction Updates Require User's Review"
          onClick={openPreferenceSettingsModal}
          sx={{
            height: "40px",
            width: "40px",
            color: theme.palette.default.main,
          }}
        >
          <SettingsIcon />
        </IconButton> */}
        <MainPageSettings />
      </Box>
    </>
  );
};

export default MainPageTopBar;
