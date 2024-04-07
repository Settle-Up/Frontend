import React, { useEffect, useState } from "react";
import { Box, Checkbox, ListItem, Stack, Typography } from "@mui/material";
import { formatNumberWithLocaleAndNegatives } from "@utils/numberStringConversions";
import theme from "@theme";
import { useRecoilState } from "recoil";
import { requiredTxModalState } from "@store/requiredTxModalStore";
import { grey } from "@mui/material/colors";

type RequiredTransactionCardProps = {
  transaction: RequiredTransaction;
};

const RequiredTransactionCard = ({
  transaction,
}: RequiredTransactionCardProps) => {
  const { counterPartyName, transactionAmount, hasSentOrReceived, isRejected } =
    transaction;
  const [checked, setChecked] = useState(hasSentOrReceived);

  const [{ transactionUpdateSuccess }, setRequiredTxModal] =
    useRecoilState(requiredTxModalState);

  useEffect(() => {
    if (transactionUpdateSuccess === transaction.transactionId) {
      setChecked((prevChecked) => !prevChecked);
      setRequiredTxModal((prevState) => ({
        ...prevState,
        transactionUpdateSuccess: null,
      }));
    }
  }, [
    transactionUpdateSuccess,
    transaction.transactionId,
    setRequiredTxModal,
  ]);

  const handleItemClick = () => {
    if (!checked) {
      setRequiredTxModal((prevState) => ({
        ...prevState,
        isOpen: true,
        selectedTransaction: transaction,
      }));
    }
  };

  return (
    <ListItem
      dense
      onClick={handleItemClick}
      sx={{
        cursor: "pointer",
        backgroundColor: hasSentOrReceived
          ? isRejected
            ? theme.palette.tertiary.main
            : grey[100]
          : null,
        "&:hover": {
          backgroundColor: hasSentOrReceived
            ? isRejected
              ? theme.palette.tertiary.main
              : grey[100]
            : null,
        },
      }}
    >
      <Stack sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            sx={{
              width: "55%",
              color: hasSentOrReceived
                ? isRejected
                  ? theme.palette.text.secondary
                  : grey[600]
                : null,
            }}
          >
            {counterPartyName}
          </Typography>
          <Typography
            sx={{
              width: "40%",
              wordBreak: "normal",
              textAlign: "left",
              color: hasSentOrReceived
                ? isRejected
                  ? theme.palette.text.secondary
                  : grey[600]
                : null,
            }}
          >
            {`${formatNumberWithLocaleAndNegatives(transactionAmount)}₩`}
          </Typography>
          <Checkbox
            checked={checked}
            disabled={checked}
            inputProps={{
              "aria-labelledby": `checkbox-list-label-${counterPartyName}`,
            }}
            tabIndex={-1}
            sx={{ width: "5%" }}
          />
        </Box>
        {isRejected && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontWeight: 600 }}
          >
            Settlement Not Acknowledged
          </Typography>
        )}
      </Stack>
    </ListItem>
  );
};

export default RequiredTransactionCard;
