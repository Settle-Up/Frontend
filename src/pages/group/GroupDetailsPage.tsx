import { useState } from "react";
import HeadingWithTip from "@components/HeadingWithTip";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Stack, Paper, Typography } from "@mui/material";
import theme from "@theme";
import { useParams } from "react-router-dom";
import GroupSettings from "@components/GroupSettings";
import { getGroupDetails } from "@apis/group/getGroupDetails";
import GroupExpenseList from "@components/GroupExpenseList";
import RequiredSettlementsOverview from "@components/RequiredSettlementsOverview";
import RecentSettlementsList from "@components/RecentSettlementsList";
import { formatNumberWithLocaleAndNegatives } from "@utils/numberStringConversions";
import useSettleTransaction from "@hooks/useSettleTransaction";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";
import { grey } from "@mui/material/colors";
import { useQuery } from "react-query";

const GroupDetailsPage = () => {
  const navigate = useNavigate();
  const { groupId } = useParams() as { groupId: string };
  const setSnackbar = useSetRecoilState(snackbarState);

  const [isGroupOptionsVisible, setIsGroupOptionsVisible] = useState(false);

  const { RenderSettleTxModal } = useSettleTransaction(groupId!);

  const { data, isLoading, isError } = useQuery(["groupDetails", groupId], () =>
    getGroupDetails({ groupId })
  );

  // if there's no expesne recorded, then there could be no data
  if (!data?.groupDetails) {
    // Handle this case appropriately, maybe show a loading indicator or a message
    return null; // or your loading component/message
  }

  // show skeleton while loading

  const {
    groupName,
    isMonthlyReportUpdateOn,
    settlementBalance,
    neededTransactionList,
    lastWeekSettledTransactionList,
  } = data.groupDetails;

  console.log(groupName, isMonthlyReportUpdateOn);

  return (
    <Stack sx={{ my: 2 }}>
      {isError && (
        <Typography
          sx={{
            color: grey[500],
            textAlign: "center",
            m: 5,
          }}
        >
          The group you're looking for doesn't seem to exist. Please check the
          URL or browse our groups from the home page.
        </Typography>
      )}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" sx={{ alignSelf: "center" }}>
          {groupName}
        </Typography>
        <GroupSettings
          groupId={groupId!}
          groupName={groupName}
          isMonthlyReportUpdateOn={isMonthlyReportUpdateOn}
          setIsGroupOptionsVisible={setIsGroupOptionsVisible}
          show={isGroupOptionsVisible}
        />
      </Box>
      <Stack spacing={7} sx={{ minHeight: "100%", mt: 2 }}>
        <Stack>
          <HeadingWithTip
            heading="Final Settlement Balance"
            tipMessage="Final Settlement Balance' represents the net result of all needed transactions. If positive, it's the total amount you're set to receive after settling all dues. If negative, it reflects the total amount you owe."
          />
          <Paper
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "white",
              borderRadius: 3,
              p: 3,
            }}
          >
            {settlementBalance !== null && settlementBalance !== undefined ? (
              <Typography variant="subtitle1">
                {`${formatNumberWithLocaleAndNegatives(settlementBalance)}₩`}
              </Typography>
            ) : (
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                No settlement balance to display.
              </Typography>
            )}
          </Paper>
        </Stack>
        {neededTransactionList && (
          <RequiredSettlementsOverview
            isLoading={isLoading}
            neededTransactionList={neededTransactionList}
          />
        )}
        {lastWeekSettledTransactionList && (
          <RecentSettlementsList
            isLoading={isLoading}
            lastWeekSettledTransactionList={lastWeekSettledTransactionList}
          />
        )}
        <Divider />
        <GroupExpenseList groupId={groupId} />
      </Stack>
      <RenderSettleTxModal />
    </Stack>
  );
};

export default GroupDetailsPage;
