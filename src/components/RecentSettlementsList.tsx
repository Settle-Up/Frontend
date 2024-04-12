import HeadingWithTip from "@components/HeadingWithTip";
import { Box, Paper, Stack, Skeleton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { formatNumberWithLocaleAndNegatives } from "@utils/numberStringConversions";

type RecentSettlementListProps = {
  lastWeekSettledTransactionList: ClearedTransaction[];
  isLoading: boolean;
};

const RecentSettlementsList = ({
  lastWeekSettledTransactionList,
  isLoading,
}: RecentSettlementListProps) => {
  const renderSkeletons = () => {
    return Array.from({ length: 3 }).map((_, index) => (
      <Box
        key={index}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Skeleton variant="text" width={100} height={24} />
        <Skeleton variant="text" width={90} height={24} />
        <Skeleton variant="text" width={80} height={24} />
      </Box>
    ));
  };

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
          {isLoading && renderSkeletons()}
          {lastWeekSettledTransactionList.length === 0 ? (
            <Typography
              variant="body2"
              sx={{ textAlign: "center", color: "text.secondary" }}
            >
              No transactions were settled in the past week.
            </Typography>
          ) : (
            lastWeekSettledTransactionList.map(
              ({ counterPartyName, transactionAmount, clearedAt }) => {
                const dateOnly = clearedAt.split("T")[0];
                return (
                  <Box
                    key={`${counterPartyName}-${dateOnly}`}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body1" sx={{ width: "45%" }}>
                      {counterPartyName}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ width: "35%", textAlign: "left" }}
                    >
                      {`${formatNumberWithLocaleAndNegatives(
                        transactionAmount
                      )}₩`}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        width: "20%",
                        color: grey[500],
                        textAlign: "right",
                      }}
                    >
                      {dateOnly}
                    </Typography>
                  </Box>
                );
              }
            )
          )}
        </Stack>
      </Paper>
    </Stack>
  );
};

export default RecentSettlementsList;
