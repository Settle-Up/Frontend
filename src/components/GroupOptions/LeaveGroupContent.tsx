import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import CustomButton from "@components/CustomButton";
import StandardLabeledInput from "@components/StandardLabeledInput";
import { useMutation, useQueryClient } from "react-query"; 
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
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setSnackbar = useSetRecoilState(snackbarState);

  const [groupNameConfirmation, setGroupNameConfirmation] = useState<
    string | null
  >(null);

  const {
    mutate: executeLeaveGroup,
    isSuccess,
    isError,
    error,
    isLoading,
  } = useMutation(() => leaveGroup(groupId));

  useEffect(() => {
    if (isError && error instanceof Error) {
      closeModal();
      let message = error.message;
      if (message === "USER SETTLED REQUIRED") {
        message = `Ensure all debts are paid and credits received in "${groupName}" before you leave the group.`;
      } else {
        message = `Sorry, an error occurred while leaving ${groupName}. Please try again later.`;
      }

      setSnackbar({
        show: true,
        message,
        severity: "error",
      });
    }
  }, [isError, error, setSnackbar, groupName]);

  useEffect(() => {
    if (isSuccess) {
      queryClient.removeQueries(["groupDetails", groupId]);
      queryClient.removeQueries(["groupExpenseList", groupId]);
      closeModal();
      setSnackbar({
        show: true,
        message: `You have successfully left ${groupName}`,
        severity: "success",
      });
      navigate("/");
    }
  }, [isSuccess, navigate, setSnackbar, groupName]);

  console.log(groupName, groupNameConfirmation);
  return (
    <>
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
    </>
  );
};

export default LeaveGroupContent;
