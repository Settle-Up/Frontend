import { Box, Stack, Typography } from "@mui/material";
import CustomButton from "@components/CustomButton";
import { useMutation } from "react-query";
import { toggleGroupMonthlyReport } from "@apis/group/toggleGroupMonthlyReport";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";
import Spinner from "@components/Spinner";

type MonthlyReportContentProps = {
  groupId: string;
  groupName: string;
  handleCloseModal: () => void;
  isMonthlyReportUpdateOn: boolean;
};

const MonthlyReportContent = ({
  groupId,
  groupName,
  handleCloseModal,
  isMonthlyReportUpdateOn,
}: MonthlyReportContentProps) => {
  const setSnackbar = useSetRecoilState(snackbarState);

  const { mutate: handleToggleGroupMonthlyReport, isLoading } = useMutation(
    () => toggleGroupMonthlyReport(groupId, !isMonthlyReportUpdateOn),
    {
      onSuccess: () => {
        handleCloseModal();
        const message = isMonthlyReportUpdateOn
          ? `You will no longer receive monthly reports from "${groupName}".`
          : `You will receive monthly reports from "${groupName}" starting now.`;
        setSnackbar({
          show: true,
          message: message,
          severity: "success",
        });
      },
      onError: () => {
        handleCloseModal();
        setSnackbar({
          show: true,
          message:
            "An error occurred while updating the monthly report settings. Please try again later.",
          severity: "error",
        });
      },
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

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
              onClick={() => handleToggleGroupMonthlyReport}
            >
              Yes, Disable Summaries
            </CustomButton>
            <CustomButton
              buttonStyle="secondary"
              sx={{ width: "100%" }}
              onClick={handleCloseModal}
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
              onClick={() => handleToggleGroupMonthlyReport}
            >
              Yes, Enable Summaries
            </CustomButton>
            <CustomButton
              buttonStyle="secondary"
              sx={{ width: "100%" }}
              onClick={handleCloseModal}
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
