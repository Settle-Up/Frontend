import { Box, Stack, Typography } from "@mui/material";
import theme from "@theme";
import { useFormatNumberAsKoreanWon } from "@hooks/useFormatNumberAsKoreanWon";

type ItemDescriptionProps = {
  itemName: string;
  mode: "itemDetail" | "variableQuantity" | "equalQuantity";
  initialAmount: string | number;
  quantity: string | number;
  calculatedTotal: string | number;
};

const ItemDescription = ({
  itemName,
  mode,
  initialAmount,
  quantity,
  calculatedTotal,
}: ItemDescriptionProps) => {
  const formatToKoreanWon = useFormatNumberAsKoreanWon();

  const operator = mode === "equalQuantity" ? "/" : "x";

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Stack
        sx={{
          wordBreak: "break-all",
          flexWrap: "wrap",
          width: "60%",
        }}
      >
        <Typography variant="subtitle2">{itemName}</Typography>
        <Typography variant="caption" color="textSecondary">
          {formatToKoreanWon(initialAmount)} {operator} {quantity}
        </Typography>
      </Stack>
      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            backgroundColor: theme.palette.tertiary.main,
            borderRadius: 10,
            px: 1.2,
            py: 0.2,
            width: "auto",
            whiteSpace: "nowrap",
          }}
        >
          {formatToKoreanWon(calculatedTotal)}
        </Typography>
      </Box>
    </Box>
  );
};

export default ItemDescription;
