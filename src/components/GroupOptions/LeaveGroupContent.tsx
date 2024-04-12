import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import CustomButton from "@components/CustomButton";
import StandardLabeledInput from "@components/StandardLabeledInput";
import { useMutation } from "react-query";
import { leaveGroup } from "@apis/group/leaveGroup";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";

type LeaveGroupContentProps = {
  groupId: string;
  groupName: string;
  closeModal: () => void;
};

const LeaveGroupContent = ({
  groupId,
  groupName,
  closeModal,
}: LeaveGroupContentProps) => {
  const navigate = useNavigate();
  const setSnackbar = useSetRecoilState(snackbarState);

  const [groupNameConfirmation, setGroupNameConfirmation] = useState<
    string | null
  >(null);

  const {
    mutate: executeLeaveGroup,
    isSuccess,
    isError,
    isLoading,
  } = useMutation(() => leaveGroup(groupId));

  useEffect(() => {
    if (isSuccess) {
      closeModal();
      setSnackbar({
        show: true,
        message: `You have successfully left ${groupName}`,
        severity: "success",
      });
    }
  }, [isSuccess, navigate, setSnackbar, groupName]);

  useEffect(() => {
    if (isError) {
      closeModal();
      setSnackbar({
        show: true,
        message: `Sorry, an error occurred while leaving ${groupName}. Please try again later.`,
        severity: "error",
      });
    }
  }, [isError, setSnackbar, groupName]);

  return (
    <>
      {true ? (
        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle1">Ready to leave</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {groupName}
              <span style={{ marginLeft: 2, color: "black" }}>?</span>
            </Typography>
          </Box>
          <Typography>
            Please type the group name below to confirm your departure.
          </Typography>
          <StandardLabeledInput
            handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setGroupNameConfirmation(e.target.value)
            }
            name="groupName"
            placeholder={`Type "${groupName}" to confirm`}
            value={groupNameConfirmation}
          />
          <CustomButton
            disabled={groupName !== groupNameConfirmation}
            sx={{ width: "100%" }}
            onClick={() => executeLeaveGroup()}
          >
            Leave
          </CustomButton>
        </Stack>
      ) : (
        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle1">
              Looks like there's unresolved finances in
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {groupName}
            </Typography>
          </Box>
          <Typography>
            Please settle any outstanding amounts before leaving the group.
          </Typography>
          <CustomButton sx={{ width: "100%" }} onClick={closeModal}>
            Got it
          </CustomButton>
        </Stack>
      )}
    </>
  );
};

export default LeaveGroupContent;
