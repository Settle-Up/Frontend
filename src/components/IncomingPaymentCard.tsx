import { Box, ListItem, Stack, Typography } from "@mui/material";
import { useFormatNumberAsKoreanWon } from "@hooks/useFormatNumberAsKoreanWon";

type IncomingPaymentCardProps = {
  transaction: RequiredTransaction;
};

const IncomingPaymentCard = ({ transaction }: IncomingPaymentCardProps) => {
  const formatToKoreanWon = useFormatNumberAsKoreanWon();

  const { counterPartyName, transactionAmount } = transaction;

  return (
    <ListItem
      dense
      sx={{
        "&:hover": { backgroundColor: "transparent" },
      }}
    >
      <Stack sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography variant="subtitle2">{counterPartyName}</Typography>
          <Typography
            variant="subtitle2"
            sx={{
              wordBreak: "normal",
            }}
          >
            {formatToKoreanWon(transactionAmount)}
          </Typography>
        </Box>
      </Stack>
    </ListItem>
  );
};

export default IncomingPaymentCard;
