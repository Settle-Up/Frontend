import { useCallback } from "react";
import { Box, Switch, Typography } from "@mui/material";
import Modal from "@components/Modal";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { toggleDecimalDisplayPreferences } from "@apis/users/toggleDecimalDisplayPreferences";
import useFeedbackHandler from "@hooks/useFeedbackHandler";
import { userProfileState } from "@store/userStore";

type PreferenceSettingsModalProps = {
  isOpen: boolean;
  closePreferenceSettingsModal: () => void;
};
const PreferenceSettingsModal = ({
  isOpen,
  closePreferenceSettingsModal,
}: PreferenceSettingsModalProps) => {
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);
  

  const {
    mutate: executeToggleDecimalDisplayPreferences,
    data: updatedIsDecimalInputOption,
    isLoading,
    isSuccess,
    isError,
  } = useMutation(toggleDecimalDisplayPreferences);

  const handleToggle = () => {
    if (userProfile) {
      executeToggleDecimalDisplayPreferences({
        isEnabled: !userProfile.isDecimalInputOption,
      });
    }
  };

  const successAction = useCallback(() => {
    if (updatedIsDecimalInputOption) {
      const updatedUserProfile = {
        ...userProfile,
        isDecimalInputOption: updatedIsDecimalInputOption?.isDecimalInputOption,
      };


      setUserProfile(updatedUserProfile)
     
    }
  }, [updatedIsDecimalInputOption]);

  useFeedbackHandler({
    isError,
    errorMessage:
      "Sorry, we encountered an issue updating your preference for displaying monetary values. Please try again.",
    isSuccess,
    successMessage:
      "Your preferences for displaying monetary values have been updated successfully.",
    successAction,
  });

  return (
    <Modal
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
          checked={userProfile?.isDecimalInputOption}
          onChange={handleToggle}
          disabled={isLoading || !userProfile}
        />
      </Box>
    </Modal>
  );
};

export default PreferenceSettingsModal;
