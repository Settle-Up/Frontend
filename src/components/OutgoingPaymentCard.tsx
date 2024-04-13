import { useEffect } from "react";
import { Box, ListItem, Stack, Typography } from "@mui/material";
import { formatNumberWithLocaleAndNegatives } from "@utils/numberStringConversions";
import { useSetRecoilState } from "recoil";
import { settleTxModalState } from "@store/settleTxModalStore";
import CustomButton from "@components/CustomButton";

type RequiredTransactionCardProps = {
  transaction: RequiredTransaction;
};

const OutgoingPaymentCard = ({ transaction }: RequiredTransactionCardProps) => {
  const { counterPartyName, transactionAmount } = transaction;

  const setSettleTxModal = useSetRecoilState(settleTxModalState);

  const openSettleTxModal = () => {
    setSettleTxModal((prevState) => ({
      ...prevState,
      isOpen: true,
      selectedTransaction: transaction,
    }));
  };

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
            sx={{
              width: "55%",
            }}
          >
            {counterPartyName}
          </Typography>
          <Typography
            sx={{
              width: "40%",
              wordBreak: "normal",
              textAlign: "left",
            }}
          >
            {`${formatNumberWithLocaleAndNegatives(transactionAmount)}₩`}
          </Typography>
          <CustomButton onClick={() => openSettleTxModal()}>Pay</CustomButton>
        </Box>
      </Stack>
    </ListItem>
  );
};

export default OutgoingPaymentCard;
