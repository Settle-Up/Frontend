import HeadingWithTip from "@components/HeadingWithTip";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { formatNumberWithLocaleAndNegatives } from "@utils/numberStringConversions";

type RecentSettlementListProps = {
  lastWeekSettledTransactionList: ClearedTransaction[];
};

const RecentSettlementsList = ({
  lastWeekSettledTransactionList,
}: RecentSettlementListProps) => {
  return (
    <Stack>
      <HeadingWithTip
        heading="Settled Transactions in the Past Week"
        tipMessage="Check off a transaction in this section once you've settled it outside the app. This will notify the other party for their confirmation."
      />
      <Paper
        sx={{
          backgroundColor: "white",
          borderRadius: 3,
          p: 3,
        }}
      >
        <Stack spacing={2}>
          {lastWeekSettledTransactionList.map(
            ({ counterPartyName, transactionAmount, clearedAt }) => {
              const dateOnly = clearedAt.split("T")[0]; // Split the string and take the first part (date)
              return (
                <Box
                  key={`${counterPartyName}-${dateOnly}`} // Using dateOnly in key
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1" sx={{ width: "55%" }}>
                    {counterPartyName}
                  </Typography>
                  <Typography variant="body1" sx={{ width: "30%" }}>
                    {`${formatNumberWithLocaleAndNegatives(
                      transactionAmount
                    )}₩`}
                  </Typography>
                  <Typography variant="body2" sx={{ color: grey[500] }}>
                    {dateOnly}
                  </Typography>
                </Box>
              );
            }
          )}
        </Stack>
      </Paper>
    </Stack>
  );
};
export default RecentSettlementsList;
