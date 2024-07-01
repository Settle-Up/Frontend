import { useCallback, useState } from "react";
import HeadingWithTip from "@components/HeadingWithTip";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Stack, Paper, Typography } from "@mui/material";
import theme from "@theme";
import { useParams } from "react-router-dom";
import GroupSettings from "@components/Group/GroupSettings";
import { getGroupDetails } from "@apis/groups/getGroupDetails";
import GroupExpenseList from "@components/Group/GroupExpenseList";
import RequiredSettlementList from "@components/RequiredSettlementList";
import RecentSettlementList from "@components/RecentSettlementList";
import { useFormatNumberAsKoreanWon } from "@hooks/useFormatNumberAsKoreanWon";
import { useQuery } from "react-query";
import useFeedbackHandler from "@hooks/useFeedbackHandler";
const GroupDetailsPage = () => {
  const navigate = useNavigate();
  const { groupId } = useParams() as { groupId: string };

  const formatToKoreanWon = useFormatNumberAsKoreanWon();

  const [isGroupOptionsVisible, setIsGroupOptionsVisible] = useState(false);

  const {
    data: groupDetails,
    isLoading: isGroupDetailsLoading,
    isError,
  } = useQuery(["groupDetails", groupId], () => getGroupDetails({ groupId }));

  useFeedbackHandler({
    isError,
    errorMessage: `The group you're looking for doesn't seem to exist. Please check the
    URL or browse our groups from the home page.`,
    errorAction: useCallback(() => {
      navigate("/");
    }, []),
  });

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" sx={{ alignSelf: "center" }}>
          {groupDetails?.groupName ?? ""}
        </Typography>
        {groupDetails?.groupName &&
          groupDetails?.isMonthlyReportUpdateOn !== undefined && (
            <GroupSettings
              groupId={groupId!}
              groupName={groupDetails?.groupName}
              isMonthlyReportUpdateOn={groupDetails?.isMonthlyReportUpdateOn}
              setIsGroupOptionsVisible={setIsGroupOptionsVisible}
              showOptions={isGroupOptionsVisible}
            />
          )}
      </Box>
      <Stack spacing={5} sx={{ minHeight: "100%" }}>
        <Stack spacing={1}>
          <HeadingWithTip
            alignSelf="left"
            heading="Final Settlement Balance"
            tipMessage="Final Settlement Balance' represents the net result of all needed transactions. If positive, it's the total amount you're set to receive after settling all dues. If negative, it reflects the total amount you owe."
          />
          <Paper
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "white",
              borderRadius: 3,
              p: 2,
            }}
          >
            {groupDetails?.settlementBalance !== null &&
            groupDetails?.settlementBalance !== undefined ? (
              <Typography variant="subtitle1">
                {formatToKoreanWon(groupDetails?.settlementBalance)}
              </Typography>
            ) : (
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                No settlement balance to display.
              </Typography>
            )}
          </Paper>
        </Stack>
        {groupDetails?.neededTransactionList && (
          <RequiredSettlementList
            isLoading={isGroupDetailsLoading}
            groupId={groupId}
            neededTransactionList={groupDetails?.neededTransactionList}
          />
        )}
        {groupDetails?.lastWeekSettledTransactionList && (
          <RecentSettlementList
            isLoading={isGroupDetailsLoading}
            lastWeekSettledTransactionList={
              groupDetails?.lastWeekSettledTransactionList
            }
          />
        )}
        <Divider />
        <GroupExpenseList groupId={groupId} />
      </Stack>
    </>
  );
};

export default GroupDetailsPage;
