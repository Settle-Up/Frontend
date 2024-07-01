import { Box, ListItem, Stack, Typography } from "@mui/material";
import { useFormatNumberAsKoreanWon } from "@hooks/useFormatNumberAsKoreanWon";
import { useSetRecoilState } from "recoil";
import { selectedTransactionForPaymentState } from "@store/transactionStore";
import CustomButton from "@components/CustomButton";

type RequiredTransactionCardProps = {
  transaction: RequiredTransaction;
};

const OutgoingPaymentCard = ({ transaction }: RequiredTransactionCardProps) => {
  const formatToKoreanWon = useFormatNumberAsKoreanWon();

  const { counterPartyName, transactionAmount } = transaction;

  const setSelectedTransactionForPayment = useSetRecoilState(
    selectedTransactionForPaymentState
  );

  return (
    <ListItem
      dense
      sx={{
        "&:hover": { backgroundColor: "transparent" },
      }}
    >
      <Stack sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{
              width: "55%",
            }}
          >
            {counterPartyName}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              width: "40%",
              wordBreak: "normal",
              textAlign: "left",
            }}
          >
            {formatToKoreanWon(transactionAmount)}
          </Typography>
          <CustomButton
            onClick={() => {
              setSelectedTransactionForPayment(transaction);
            }}
            sx={{ py: 0.5 }}
          >
            Pay
          </CustomButton>
        </Box>
      </Stack>
    </ListItem>
  );
};

export default OutgoingPaymentCard;
