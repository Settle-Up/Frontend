import { useState, useEffect } from "react";
import Modal from "@components/Modal";
import { Box, IconButton, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import theme from "@theme";
import NotificationItem from "@components/Notification/NotificationItem";
import Spinner from "@components/Spinner";

type NotificationModalProps = {
  closeModal: () => void;
  isErrorFetchingNotificationItemList: boolean;
  isLoadingNotificationItemList: boolean;
  isOpen: boolean;
  notificationItemList: UpdatedTransaction[];
};

const NotificationModal = ({
  closeModal,
  isOpen,
  isErrorFetchingNotificationItemList,
  isLoadingNotificationItemList,
  notificationItemList,
}: NotificationModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextNotif = () => {
    setCurrentIndex((prev) => (prev + 1) % notificationItemList!.length);
  };

  const previousNotif = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? notificationItemList!.length - 1 : prev - 1
    );
  };

  if (isLoadingNotificationItemList) {
    <Spinner isOverlay />;
  }

  return (
    <>
      <Modal
        ariaLabel="Notifications"
        closeModal={closeModal}
        isOpen={isOpen}
        showCloseButton={true}
      >
        {isErrorFetchingNotificationItemList && (
          <Box sx={{ padding: theme.spacing(4), textAlign: "center" }}>
            <Typography>
              Sorry, we're unable to load your payment notifications at this
              time. Please try again later.
            </Typography>
          </Box>
        )}
        {!isErrorFetchingNotificationItemList &&
          notificationItemList.length === 0 && (
            <Box sx={{ padding: theme.spacing(4), textAlign: "center" }}>
              <Typography variant="subtitle1">No new notifications</Typography>
            </Box>
          )}
        {notificationItemList.length > 0 && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="primary"
              aria-label="previous button"
              onClick={previousNotif}
              sx={{
                height: "40px",
                width: "40px",
                visibility:
                  currentIndex > 0 && notificationItemList.length > 1
                    ? "visible"
                    : "hidden",
              }}
            >
              <KeyboardArrowLeftIcon fontSize="large" />
            </IconButton>
            <NotificationItem item={notificationItemList[currentIndex]} totalItemCount={notificationItemList.length}/>
            <IconButton
              color="primary"
              aria-label="next button"
              onClick={nextNotif}
              sx={{
                height: "40px",
                width: "40px",
                visibility:
                  currentIndex < notificationItemList.length - 1 &&
                  notificationItemList.length > 1
                    ? "visible"
                    : "hidden",
              }}
            >
              <KeyboardArrowRightIcon fontSize="large" />
            </IconButton>
          </Box>
        )}
      </Modal>
    </>
  );
};

export default NotificationModal;
