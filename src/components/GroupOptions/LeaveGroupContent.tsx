import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import CustomButton from "@components/CustomButton";
import StandardLabeledInput from "@components/StandardLabeledInput";
import { useMutation, useQueryClient } from "react-query";
import { leaveGroup } from "@apis/groups/leaveGroup";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";
import useFeedbackHandler from "@hooks/useFeedbackHandler";
import removeItemFromListInCache from "reactQuery/removeItemFromListInCache";

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
    data: deletedGroup,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useMutation(() => leaveGroup(groupId));

  useEffect(() => {
    if (isError && error instanceof Error) {
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


  const successAction = useCallback(() => {
    if (deletedGroup) {
      removeItemFromListInCache<PaginatedResponse<JoinedGroupSummary>, "dataList">({
        queryClient,
        queryKey: "groupSummaryList",
        listKey: "dataList",
        identifierKey: "groupId",
        identifierValue: deletedGroup.groupId,
      });
      queryClient.removeQueries(["groupDetails", groupId]);
      queryClient.removeQueries(["groupExpenseList", groupId]);

    }
    navigate("/");
  }, []);

  useFeedbackHandler({
    isError,
    errorMessage:
      error instanceof Error && error.message === "USER SETTLED REQUIRED"
        ? `Ensure all debts are paid and credits received in "${groupName}" before you leave the group.`
        : `Sorry, an error occurred while leaving ${groupName}. Please try again later.`,
    isSuccess,
    successMessage: `You have successfully left ${groupName}`,
    successAction,
    unconditionalExecute: useCallback(() => {
      closeModal();
    }, []),
  });
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
          changeInput={(e) => setGroupNameConfirmation(e.target.value)}
          name="groupName"
          placeholder={`Type "${groupName}" to confirm`}
          value={groupNameConfirmation}
        />
        <CustomButton
          disabled={groupName !== groupNameConfirmation || isLoading}
          sx={{ width: "100%" }}
          onClick={() => executeLeaveGroup()}
        >
          {isLoading ? "Processing..." : "Leave"}
        </CustomButton>
      </Stack>
    </>
  );
};

export default LeaveGroupContent;
