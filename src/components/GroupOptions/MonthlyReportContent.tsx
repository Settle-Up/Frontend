import { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import CustomButton from "@components/CustomButton";
import { useMutation } from "react-query";
import { toggleGroupMonthlyReport } from "@apis/group/toggleGroupMonthlyReport";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";

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
  const setSnackbar = useSetRecoilState(snackbarState);

  const {
    mutate: executeToggleGroupMonthlyReport,
    isError,
    isSuccess,
  } = useMutation(() => {
    return toggleGroupMonthlyReport(groupId, !isMonthlyReportUpdateOn)
  }
  );

  useEffect(() => {
    if (isSuccess) {
      closeModal();
      const message = isMonthlyReportUpdateOn
        ? `You will no longer receive monthly reports from "${groupName}".`
        : `You will receive monthly reports from "${groupName}" starting now.`;
      setSnackbar({
        show: true,
        message: message,
        severity: "success",
      });
    }
  }, [isSuccess, setSnackbar, groupName, closeModal, isMonthlyReportUpdateOn]);

  useEffect(() => {
    if (isError) {
      closeModal();
      setSnackbar({
        show: true,
        message:
          "An error occurred while updating the monthly report settings. Please try again later.",
        severity: "error",
      });
    }
  }, [isError, setSnackbar, groupName, closeModal]);

  return (
    <>
      {isMonthlyReportUpdateOn ? (
        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle1">
              Disable Monthly Expense Summaries for
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {groupName}
            </Typography>
          </Box>
          <Typography>
            Do you want to stop receiving monthly updates on on your owed and
            owing balances for each expense in the group via Kakao Messenger?
          </Typography>
          <Stack spacing={2}>
            <CustomButton
              buttonStyle="primary"
              sx={{ width: "100%" }}
              onClick={() => executeToggleGroupMonthlyReport()}
            >
              Yes, Disable Summaries
            </CustomButton>
            <CustomButton
              buttonStyle="secondary"
              sx={{ width: "100%" }}
              onClick={closeModal}
            >
              No, Keep Them
            </CustomButton>
          </Stack>
        </Stack>
      ) : (
        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle1">
              Enable Monthly Expense Summaries for
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {groupName}
            </Typography>
          </Box>
          <Typography>
            Receive monthly updates on your owed and owing balances for each
            expense in the group via Kakao Messenger. <br />
            <br /> Would you like to enable this feature?
          </Typography>
          <Stack spacing={2}>
            <CustomButton
              buttonStyle="primary"
              sx={{ width: "100%" }}
              onClick={() => executeToggleGroupMonthlyReport()}
            >
              Yes, Enable Summaries
            </CustomButton>
            <CustomButton
              buttonStyle="secondary"
              sx={{ width: "100%" }}
              onClick={closeModal}
            >
              No, Thanks
            </CustomButton>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default MonthlyReportContent;
