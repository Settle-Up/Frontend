import { useCallback } from "react";
import { Box, Stack, Typography } from "@mui/material";
import CustomButton from "@components/CustomButton";
import { useMutation } from "react-query";
import { toggleGroupMonthlyReport } from "@apis/groups/toggleGroupMonthlyReport";
import useFeedbackHandler from "@hooks/useFeedbackHandler";
import { useQueryClient } from "react-query";
import updateCache from "reactQuery/updateCache";

type MonthlyReportContentProps = {
  groupId: string;
  groupName: string;
  closeModal: () => void;
  isMonthlyReportUpdateOn: boolean;
};

const MonthlyReportContent = ({
  groupId,
  groupName,
  closeModal,
  isMonthlyReportUpdateOn,
}: MonthlyReportContentProps) => {
  const queryClient = useQueryClient();

  const {
    mutate: executeToggleGroupMonthlyReport,
    data: updatedIsMonthlyReportUpdateOn,
    isError,
    isLoading,
    isSuccess,
  } = useMutation(() => {
    return toggleGroupMonthlyReport({
      groupId,
      isEnabled: !isMonthlyReportUpdateOn,
    });
  });

  const successAction = useCallback(() => {
    updateCache({
      queryClient,
      queryKey: ["groupDetails", groupId],
      updatedData: { isMonthlyReportUpdateOn: updatedIsMonthlyReportUpdateOn },
    });
  }, [updatedIsMonthlyReportUpdateOn, groupId, queryClient]);

  useFeedbackHandler({
    isError,
    errorMessage:
      "An error occurred while updating the monthly report settings. Please try again later.",
    isSuccess,
    successMessage: isMonthlyReportUpdateOn
      ? `You will no longer receive monthly reports from "${groupName}".`
      : `You will receive monthly reports from "${groupName}" starting now.`,
    successAction,
    unconditionalExecute: useCallback(() => {
      closeModal();
    }, []),
  });

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="subtitle1">
          {isMonthlyReportUpdateOn ? "Disable" : "Enable"} Monthly Expense
          Summaries for
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {groupName}
        </Typography>
      </Box>
      <Typography>
        {isMonthlyReportUpdateOn
          ? "Do you want to stop receiving monthly updates on your owed and owing balances for each expense in the group via Kakao Messenger?"
          : "Receive monthly updates on your owed and owing balances for each expense in the group via Kakao Messenger. Would you like to enable this feature?"}
      </Typography>
      <Stack spacing={2}>
        <CustomButton
          buttonStyle="primary"
          sx={{ width: "100%" }}
          onClick={() => executeToggleGroupMonthlyReport()}
          disabled={isLoading}
        >
          {isLoading
            ? isMonthlyReportUpdateOn
              ? "Disabling..."
              : "Enabling..."
            : isMonthlyReportUpdateOn
            ? "Yes, Disable Summaries"
            : "Yes, Enable Summaries"}
        </CustomButton>
        <CustomButton
          buttonStyle="secondary"
          sx={{ width: "100%" }}
          onClick={closeModal}
          disabled={isLoading}
        >
          No, {isMonthlyReportUpdateOn ? "Keep Them" : "Thanks"}
        </CustomButton>
      </Stack>
    </Stack>
  );
};
export default MonthlyReportContent;
