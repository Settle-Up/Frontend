import { useEffect, useState, useRef } from "react";
import HeadingWithTip from "@components/HeadingWithTip";
import React from "react";
import { useLocation } from "react-router-dom";
import GroupListPage from "./GroupListPage";
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Paper,
  Typography,
} from "@mui/material";
import theme from "@theme";
import { useParams } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GroupSettings from "@components/GroupSettings";
import { useQuery } from "react-query";
import { getGroupDetails } from "@apis/group/getGroupDetails";
import { mockJoinedGroupDetails } from "@mock/groupMock";
import GroupExpenseList from "@components/GroupExpenseList";
import RequiredSettlementsOverview from "@components/RequiredSettlementsOverview";
import RecentSettlementsList from "@components/RecentSettlementsList";
import { formatNumberWithLocaleAndNegatives } from "@utils/numberStringConversions";
import useUpdateRequiredTransactionStatusModal from "@hooks/useUpdateRequiredTransactionStatusModal";

const GroupDetailsPage = () => {
  const { groupId } = useParams();

  const [isGroupOptionsVisible, setIsGroupOptionsVisible] = useState(false);

  const {
    data: groupDetails,
    isLoading,
    error,
  } = useQuery(
    ["groupDetails", groupId],
    () => (groupId ? getGroupDetails(groupId) : undefined),
    {
      enabled: !!groupId,
      // onSuccess: (data) => {
      //   const { groupName } = data;
      // },
    }
  );

  if (isLoading) {
    // show skeleton ui
  }

  // if group does not exist, i gotta show the snackbar message

  // const { groupName, isMonthlyReportUpdateOn } = groupDetails!;
  const {
    groupName,
    settlementBalance,
    isMonthlyReportUpdateOn,
    expenseList,
    neededTransactionList,
    lastWeekSettledTransactionList
  } = mockJoinedGroupDetails!;

  const { RenderModal } = useUpdateRequiredTransactionStatusModal(groupId!);

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
      <Stack spacing={7} sx={{ minHeight: "100%" }}>
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
            <Typography variant="subtitle1">
              {`${formatNumberWithLocaleAndNegatives(settlementBalance)}₩`}
            </Typography>
          </Paper>
        </Stack>
        <RequiredSettlementsOverview
          neededTransactionList={neededTransactionList}
        />
        <RecentSettlementsList lastWeekSettledTransactionList={lastWeekSettledTransactionList}/>
        <Divider />
        <GroupExpenseList expenseList={expenseList} />
      </Stack>
      <RenderModal />
    </>
  );
};

export default GroupDetailsPage;
