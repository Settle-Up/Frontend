import { Box, Stack, Typography } from "@mui/material";
import theme from "@theme";

type ItemDescriptionProps = {
  itemName: string;
  unitPrice: string;
  itemQuantity: string;
  itemTotalPrice: string;
};
const ItemDescription = ({
  itemName,
  unitPrice,
  itemQuantity,
  itemTotalPrice,
}: ItemDescriptionProps) => {
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
          width: "80%",
        }}
      >
        <Typography>{itemName}</Typography>
        <Typography variant="caption" color="textSecondary">
          ({unitPrice.toLocaleString()}₩ x {itemQuantity})
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
        {`${itemTotalPrice.toLocaleString()}₩`}
      </Typography>
    </Box>
  );
};

export default ItemDescription;
