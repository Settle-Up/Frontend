import {
  Box,
  List,
  ListItem,
  Checkbox,
  Stack,
  Typography,
} from "@mui/material";
import theme from "@theme";

type PurchasedItemToggletListProps = {
  handleNewExpenseChange: (key: string, value: ItemOrderDetails[]) => void;
  itemOrderDetailsList: ItemOrderDetails[];
  userId: string;
};

const PurchasedItemToggletList = ({
  handleNewExpenseChange,
  itemOrderDetailsList,
  userId,
}: PurchasedItemToggletListProps) => {
  const handleCheckboxToggle = (itemId: string) => {
    const updatedItemOrderDetailList: ItemOrderDetails[] =
      itemOrderDetailsList.map((itemOrderDetails) => {
        if (itemOrderDetails.id === itemId) {
          const isItemAlreadyPurchasedByUser = itemOrderDetails.jointPurchaserList?.some(
            (purchaser) => purchaser.userId === userId
          );

          let updatedJointPurchaserList;

          if (isItemAlreadyPurchasedByUser) {
            updatedJointPurchaserList = itemOrderDetails.jointPurchaserList?.filter(
              (purchaser) => purchaser.userId !== userId
            );
          } else {
            const newPurchaser = { userId };
            updatedJointPurchaserList = itemOrderDetails.jointPurchaserList
              ? [...itemOrderDetails.jointPurchaserList, newPurchaser]
              : [newPurchaser];
          }

          return {
            ...itemOrderDetails,
            jointPurchaserList: updatedJointPurchaserList,
          };
        }
        return itemOrderDetails;
      });

    handleNewExpenseChange("itemOrderDetailsList", updatedItemOrderDetailList);
  };

  return (
    <List>
      {itemOrderDetailsList.map(
        ({
          id,
          itemName,
          unitPrice,
          itemQuantity,
          itemTotalPrice,
          jointPurchaserList,
        }: ItemOrderDetails) => {
          const labelId = `checkbox-list-label-${id}`;
          return (
            <ListItem
              key={id}
              dense
              onClick={() => handleCheckboxToggle(id)}
              sx={{ cursor: "pointer" }}
            >
              <Checkbox
                checked={jointPurchaserList!.some(
                  (purchaserDetails) => purchaserDetails.userId === userId
                )}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
                sx={{ mb: "auto", mr: 2, p: 0 }}
                tabIndex={-1}
              />
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
            </ListItem>
          );
        }
      )}
    </List>
  );
};

export default PurchasedItemToggletList;
