import { Badge, IconButton } from "@mui/material";
import theme from "@theme";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useQuery } from "react-query";
import { getReceivedPaymentList } from "@apis/transactions/getReceivedPaymentList";
import { useState } from "react";
import NotificationModal from "@components/Notification/NotificationModal";

const NotificationIcon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data,
    isError,
    isLoading,
  } = useQuery("receivedPaymentList", getReceivedPaymentList);


  return (
    <>
      <IconButton
        aria-label="View Transaction Updates Require User's Review"
        onClick={() => setIsModalOpen(true)}
        sx={{
          height: "40px",
          width: "40px",
          color: theme.palette.default.main,
          "&:hover": {
            color: theme.palette.default.light,
          },
        }}
        disableRipple
      >
        <Badge
          badgeContent={data?.receivedPaymentList?.length ?? null}
          color="primary"
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
        <NotificationModal
          closeModal={() => setIsModalOpen(false)}
          isErrorFetchingNotificationItemList={isError}
          isLoadingNotificationItemList={isLoading}
          isOpen={isModalOpen}
          notificationItemList={data?.receivedPaymentList || []}
        />
      
    </>
  );
};

export default NotificationIcon;
