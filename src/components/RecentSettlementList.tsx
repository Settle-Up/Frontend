import { Box, Paper, Stack, Skeleton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useFormatNumberAsKoreanWon } from "@hooks/useFormatNumberAsKoreanWon";
import VerifiedIcon from "@mui/icons-material/Verified";

type RecentSettlementListProps = {
  lastWeekSettledTransactionList: ClearedTransaction[];
  isLoading: boolean;
};

const RecentSettlementList = ({
  lastWeekSettledTransactionList,
  isLoading,
}: RecentSettlementListProps) => {
  const formatToKoreanWon = useFormatNumberAsKoreanWon();

  const hasTransactions =
    lastWeekSettledTransactionList &&
    lastWeekSettledTransactionList.length === 0;

  const SkeletonSettlementCard = (index: number) => (
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
  );

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2">
        Settled Transactions in the Past Week
      </Typography>
      <Paper
        sx={{
          backgroundColor: "white",
          borderRadius: 3,
          p: 3,
        }}
      >
        <Stack
          spacing={2}
          sx={{ alignItems: hasTransactions ? "normal" : "center" }}
        >
          {isLoading &&
            Array.from({ length: 3 }, (_, index) =>
              SkeletonSettlementCard(index)
            )}
          {hasTransactions ? (
            lastWeekSettledTransactionList?.map(
              ({
                counterPartyName,
                transactionAmount,
                clearedAt,
                transactionId,
              }) => {
                return (
                  <Box
                    key={transactionId}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ width: "35%" }}>
                      {counterPartyName}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        width: "35%",
                        textAlign: "left",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatToKoreanWon(transactionAmount)}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        width: "30%",
                        color: grey[500],
                        textAlign: "right",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {clearedAt?.split("T")[0]}
                    </Typography>
                  </Box>
                );
              }
            )
          ) : (
            <VerifiedIcon sx={{ margin: 2 }} />
          )}
        </Stack>
      </Paper>
    </Stack>
  );
};

export default RecentSettlementList;
