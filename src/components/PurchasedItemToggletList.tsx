import {
  Box,
  List,
  ListItem,
  Checkbox,
  Stack,
  Typography,
} from "@mui/material";
import theme from "@theme";
import ItemDescription from "./ItemDescription";

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
    const updatedItemOrderDetailsList: ItemOrderDetails[] =
      itemOrderDetailsList.map((itemOrderDetails) => {
        if (itemOrderDetails.itemId === itemId) {
          const isItemAlreadyPurchasedByUser =
            itemOrderDetails.jointPurchaserList?.some(
              (purchaser) => purchaser.userId === userId
            );

          let updatedJointPurchaserList;

          if (isItemAlreadyPurchasedByUser) {
            updatedJointPurchaserList =
              itemOrderDetails.jointPurchaserList?.filter(
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

    handleNewExpenseChange("itemOrderDetailsList", updatedItemOrderDetailsList);
  };
  

  return (
    <List>
      {itemOrderDetailsList.map(
        ({
          itemId,
          itemName,
          unitPrice,
          itemQuantity,
          itemTotalPrice,
          jointPurchaserList,
        }: ItemOrderDetails) => {
          const labelId = `checkbox-list-label-${itemId}`;
          return (
            <ListItem
              key={itemId}
              dense
              onClick={() => handleCheckboxToggle(itemId)}
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
              <ItemDescription
                itemName={itemName}
                unitPrice={unitPrice}
                itemQuantity={itemQuantity}
                itemTotalPrice={itemTotalPrice}
              />
            </ListItem>
          );
        }
      )}
    </List>
  );
};

export default PurchasedItemToggletList;
