import { useEffect, useState } from "react";
import { Box, Divider, Switch, Typography } from "@mui/material";
import CustomModal from "@components/CustomModal";
import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";

type PreferenceSettingsModalProps = {
  isOpen: boolean;
  closePreferenceSettingsModal: () => void;
};
const PreferenceSettingsModal = ({
  isOpen,
  closePreferenceSettingsModal,
}: PreferenceSettingsModalProps) => {
  const setSnackbar = useSetRecoilState(snackbarState);
  const [isMonetaryValueDecimalLimited, setIsMonetaryValueDecimalLimited] =
    useState(false);

  const toggleMonetaryValueDecimalLimit = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsMonetaryValueDecimalLimited(event.target.checked);
  };

  // const {
  //   mutate: executeSignOut,
  //   isLoading,
  //   isError,
  // } = useMutation(() => {});

  // useEffect(() => {
  //   if (isError) {
  //     setSnackbar({
  //       show: true,
  //       message:
  //         "Sorry, we encountered an issue updating your preference for displaying monetary values. Please try again.",
  //       severity: "error",
  //     });
  //   }
  // }, [isError, setSnackbar]);

  // show loading spinner

  return (
    <CustomModal
      ariaLabel="View Settings"
      isOpen={isOpen}
      closeModal={closePreferenceSettingsModal}
      showCloseButton
    >
      <Typography variant="subtitle1" color="text.secondary">
        Preference Settings
      </Typography>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ width: "65%", wordBreak: "normal", textAlign: "left" }}
        >
          Show Monetary Values With up to Two Decimal Points
        </Typography>
        <Switch
          checked={isMonetaryValueDecimalLimited}
          onChange={toggleMonetaryValueDecimalLimit}
        />
      </Box>
    </CustomModal>
  );
};

export default PreferenceSettingsModal;
