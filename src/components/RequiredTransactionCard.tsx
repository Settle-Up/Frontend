import { useEffect, useState } from "react";
import { Box, Checkbox, ListItem, Stack, Typography } from "@mui/material";
import { formatNumberWithLocaleAndNegatives } from "@utils/numberStringConversions";
import theme from "@theme";
import { useRecoilState } from "recoil";
import { settleTxModalState } from "@store/settleTxModalStore";
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

  const [{ transactionUpdateSuccess }, setSettleTxModal] =
    useRecoilState(settleTxModalState);

  useEffect(() => {
    if (transactionUpdateSuccess === transaction.transactionId) {
      setChecked((prevChecked) => !prevChecked);
      setSettleTxModal((prevState) => ({
        ...prevState,
        transactionUpdateSuccess: null,
      }));
    }
  }, [transactionUpdateSuccess, transaction.transactionId, setSettleTxModal]);

  const openSettleTxModal = () => {
    if (!checked) {
      setSettleTxModal((prevState) => ({
        ...prevState,
        isOpen: true,
        selectedTransaction: transaction,
      }));
    }
  };

  return (
    <ListItem
      dense
      onClick={openSettleTxModal}
      sx={{
        cursor: "pointer",
        backgroundColor: checked
          ? isRejected
            ? theme.palette.tertiary.main
            : grey[100]
          : null,
        "&:hover": {
          backgroundColor: checked
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
              color: checked
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
              color: checked
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
