import { Box, Stack, Typography } from "@mui/material";
import theme from "@theme";

type ItemDescriptionProps = {
  itemName: string;
  mode: "itemDetail" | "variableQuantity" | "equalQuantity";
  initialAmount: string;
  quantity: string;
  calculatedTotal: string;
};

const ItemDescription = ({
  itemName,
  mode,
  initialAmount,
  quantity,
  calculatedTotal,
}: ItemDescriptionProps) => {
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
        }}
      >
        <Typography>{itemName}</Typography>
        <Typography variant="caption" color="textSecondary">
          {initialAmount}₩ {operator} {quantity}
        </Typography>
      </Stack>
      <Typography
        variant="subtitle2"
        sx={{
          backgroundColor: theme.palette.tertiary.main,
          borderRadius: 10,
          px: 1.2,
          py: 0.2,
        }}
      >
        {`${calculatedTotal}₩`}
      </Typography>
    </Box>
  );
};

export default ItemDescription;
