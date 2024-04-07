import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import CustomButton from "@components/CustomButton";
import StandardLabeledInput from "@components/StandardLabeledInput";
import { useMutation, useQuery } from "react-query";
import { leaveGroup } from "@apis/group/leaveGroup";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";
import Spinner from "@components/Spinner";

type LeaveGroupContentProps = {
  groupId: string;
  groupName: string;
  handleCloseModal: () => void;
};

const LeaveGroupContent = ({
  groupId,
  groupName,
  handleCloseModal,
}: LeaveGroupContentProps) => {
  const [groupNameConfirmation, setGroupNameConfirmation] = useState<
    string | null
  >(null);
  const setSnackbar = useSetRecoilState(snackbarState);

  // const {
  //   data: canLeaveGroup,
  //   isLoading,
  //   error,
  // } = useQuery(
  //   "checkRemainingTransactionsInGroup",
  //   checkRemainingTransactionsInGroup
  // );

  const {
    mutate: handleLeaveGroup,
    isLoading,
  } = useMutation(() => leaveGroup(groupId), {
    onSuccess: () => {
      handleCloseModal();
      setSnackbar({
        show: true,
        message: `You have successfully left ${groupName}`,
        severity: "success",
      });
    },
    onError: () => {
      handleCloseModal();
      setSnackbar({
        show: true,
        message: `An error occurred while leaving ${groupName}. Please try again later.`,
        severity: "error",
      });
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

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
            onClick={() => handleLeaveGroup()}
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
          <CustomButton sx={{ width: "100%" }} onClick={handleCloseModal}>
            Got it
          </CustomButton>
        </Stack>
      )}
    </>
  );
};

export default LeaveGroupContent;
