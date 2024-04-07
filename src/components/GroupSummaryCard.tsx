import { Box, ListItem, Stack, Skeleton, Typography } from "@mui/material";
import theme from "@theme";
import { grey, orange } from "@mui/material/colors";
import { formatNumberWithLocaleAndNegatives } from "@utils/numberStringConversions";
import formatTimeAgo from "@utils/formatTimeAgo";

type GroupSummaryCardProps = {
  group: JoinedGroupSummary;
  handleClick: (groupId: string) => void;
};

const GroupSummaryCard = ({ group, handleClick }: GroupSummaryCardProps) => {
  const {
    groupId,
    groupName,
    groupMemberCount,
    lastActive,
    settlementBalance,
  } = group;

  const getSettlementBalanceInfo = (balance: string) => {
    if (balance === null) {
      return {
        text: "No Expenses Recorded Yet",
        color: grey[500],
        backgroundColor: "none",
      };
    }
    if (balance === "0") {
      return { text: "Clear", color: grey[600], backgroundColor: grey[300] };
    }
    const isNegative = balance.startsWith("-");
    return {
      text: `${formatNumberWithLocaleAndNegatives(balance)}₩`,
      color: "white",
      backgroundColor: isNegative ? orange[700] : theme.palette.primary.main,
    };
  };

  const { text, color, backgroundColor } = getSettlementBalanceInfo(
    settlementBalance!
  );

  return (
    <ListItem
      key={groupId}
      dense
      onClick={() => handleClick(groupId)}
      sx={{ cursor: "pointer", px: 3, py: 2, borderRadius: 3 }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        <Stack
          sx={{
            wordBreak: "break-all",
            flexWrap: "wrap",
            width: { xs: "100%", sm: "60%" },
          }}
        >
          <Typography variant="subtitle1">
            {groupName}
            <span style={{ marginLeft: 10, color: grey[500] }}>
              {groupMemberCount}
            </span>
          </Typography>
          <Typography variant="body2" sx={{ color: grey[500] }}>
            {lastActive ? `Last Active: ${formatTimeAgo(lastActive!)}` : null}
          </Typography>
        </Stack>
        <Box
          sx={{
            width: { xs: "100%", sm: "38%" },
            display: "flex",
            justifyContent: { xs: "left", sm: "right" },
          }}
        >
          <Typography
            variant={settlementBalance! === null ? "body2" : "subtitle2"}
            sx={{
              display: "inline",
              backgroundColor,
              color,
              px: settlementBalance! === null ? 0 : 1.2,
              py: 0.2,
              wordBreak: "normal",
            }}
          >
            {text}
          </Typography>
        </Box>
      </Box>
    </ListItem>
  );
};

export default GroupSummaryCard;
