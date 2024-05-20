import { useEffect } from "react";
import HeadingWithTip from "@components/HeadingWithTip";
import { Box, Paper, Stack, Skeleton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { formatNumberWithLocaleAndNegatives } from "@utils/numberStringConversions";
import { useRecoilState } from "recoil";
import { recentSettlementListState } from "@store/transactionStore";
import { settleTxModalState } from "@store/settleTxModalStore";

type RecentSettlementListProps = {
  lastWeekSettledTransactionList: ClearedTransaction[];
  isLoading: boolean;
};

const RecentSettlementsList = ({
  lastWeekSettledTransactionList,
  isLoading,
}: RecentSettlementListProps) => {
  // const [
  //   { selectedTransaction, isTransactionSuccessfullySettled },
  //   setSettleTxModal,
  // ] = useRecoilState(settleTxModalState);

  const [recentSettlementList, setRecentSettlementList] = useRecoilState(
    recentSettlementListState
  );

  useEffect(() => {
    setRecentSettlementList(lastWeekSettledTransactionList);
  }, [lastWeekSettledTransactionList, setRecentSettlementList]);

  // useEffect(() => {
  //   if (selectedTransaction && isTransactionSuccessfullySettled) {
  //     setRecentSettlementList((prevList: ClearedTransaction[] | null) => {
  //       const newClearedTx: ClearedTransaction = {
  //         ...selectedTransaction,
  //         clearedAt: dayjs().format("YYYY-MM-DD"),
  //       };

  //       if (prevList === null) {
  //         return [newClearedTx];
  //       }

  //       return [...prevList, newClearedTx];
  //     });

  //     setSettleTxModal({
  //       isOpen: false,
  //       selectedTransaction: null,
  //       isTransactionSuccessfullySettled: null,
  //     });
  //   }
  // }, [isTransactionSuccessfullySettled, setSettleTxModal]);

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
    <Stack spacing={1}>     
       <Typography variant="subtitle2">Settled Transactions in the Past Week</Typography>
      <Paper
        sx={{
          backgroundColor: "white",
          borderRadius: 3,
          p: 3,
        }}
      >
        <Stack spacing={2}>
          {isLoading && renderSkeletons()}
          {recentSettlementList && recentSettlementList.length === 0 ? (
            <Typography
              variant="body2"
              sx={{ textAlign: "center", color: "text.secondary" }}
            >
              No transactions were settled in the past week.
            </Typography>
          ) : (
            recentSettlementList?.map(
              ({
                counterPartyName,
                transactionAmount,
                clearedAt,
                transactionId,
              }) => {
                const dateOnly = clearedAt.split("T")[0];
                return (
                  <Box
                    key={transactionId}
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
