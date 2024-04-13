import { Box, ListItem, Stack, Typography } from "@mui/material";
import { formatNumberWithLocaleAndNegatives } from "@utils/numberStringConversions";

type IncomingPaymentCardProps = {
  transaction: RequiredTransaction;
};

const IncomingPaymentCard = ({ transaction }: IncomingPaymentCardProps) => {
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
          <Typography>{counterPartyName}</Typography>
          <Typography
            sx={{
              wordBreak: "normal",
            }}
          >
            {`${formatNumberWithLocaleAndNegatives(transactionAmount)}₩`}
          </Typography>
        </Box>
      </Stack>
    </ListItem>
  );
};

export default IncomingPaymentCard;
