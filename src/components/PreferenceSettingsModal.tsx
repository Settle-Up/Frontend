import { useEffect, useState } from "react";
import { Box, Divider, Switch, Typography } from "@mui/material";
import CustomModal from "@components/CustomModal";
import { useMutation } from "react-query";
import { useSetRecoilState, useRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";
import { userDetailsState } from "@store/userStore";
import { toggleDecimalDisplayPreferences } from "@apis/user/toggleDecimalDisplayPreferences";

type PreferenceSettingsModalProps = {
  isOpen: boolean;
  closePreferenceSettingsModal: () => void;
};
const PreferenceSettingsModal = ({
  isOpen,
  closePreferenceSettingsModal,
}: PreferenceSettingsModalProps) => {
  const setSnackbar = useSetRecoilState(snackbarState);
 
  const [userDetails, setUserDetails] = useRecoilState(userDetailsState);


  const {
    mutate: executeToggleDecimalDisplayPreferences,
    data,
    isLoading,
    isSuccess,
    isError,
  } = useMutation(toggleDecimalDisplayPreferences);
  
  const handleToggle = () => {
    executeToggleDecimalDisplayPreferences({ isEnabled: !userDetails?.isDecimalInputOption });
  };
  
  useEffect(() => {
    if (isSuccess && data) {
      setUserDetails(prevState => {
        if (!prevState) return prevState; // Handle potential null prevState
    
        return {
          ...prevState,
          isDecimalInputOption: data.isDecimalInputOption // Correctly accessing the data object's property
        };
      });
  
      setSnackbar({
        show: true,
        message: "Your preferences for displaying monetary values have been updated successfully.",
        severity: "success",
      });
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) {
      setSnackbar({
        show: true,
        message:
          "Sorry, we encountered an issue updating your preference for displaying monetary values. Please try again.",
        severity: "error",
      });
    }
  }, [isError, setSnackbar]);

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
          checked={userDetails?.isDecimalInputOption}
          onClick={handleToggle} disabled={isLoading || !userDetails}
        />
      </Box>
    </CustomModal>
  );
};

export default PreferenceSettingsModal;
