import { List, ListItem, Checkbox } from "@mui/material";
import ItemDescription from "./ItemDescription";

type PurchasedItemToggleListProps = {
  handleNewExpenseChange: (key: string, value: Item[]) => void;
  itemList: Item[];
  userId: string;
};

const PurchasedItemToggleList = ({
  handleNewExpenseChange,
  itemList,
  userId,
}: PurchasedItemToggleListProps) => {
  const handleCheckboxToggle = (itemId: string) => {
    const updatedItemOrderDetailsList: Item[] = itemList.map((Item) => {
      if (Item.itemId === itemId) {
        const isItemAlreadyPurchasedByUser = Item.jointPurchaserList?.some(
          (purchaser) => purchaser.userId === userId
        );

        let updatedJointPurchaserList;

        if (isItemAlreadyPurchasedByUser) {
          updatedJointPurchaserList = Item.jointPurchaserList?.filter(
            (purchaser) => purchaser.userId !== userId
          );
        } else {
          const newPurchaser = { userId };
          updatedJointPurchaserList = Item.jointPurchaserList
            ? [...Item.jointPurchaserList, newPurchaser]
            : [newPurchaser];
        }

        return {
          ...Item,
          jointPurchaserList: updatedJointPurchaserList,
        };
      }
      return Item;
    });
    handleNewExpenseChange("itemList", updatedItemOrderDetailsList);
  };

  return (
    <List>
      {itemList.map(
        ({
          itemId,
          itemName,
          unitPrice,
          itemQuantity,
          itemTotalPrice,
          jointPurchaserList,
        }: Item) => {
          const labelId = `checkbox-list-label-${itemId}`;
          return (
            <ListItem
              key={itemId}
              dense
              onClick={() => handleCheckboxToggle(itemId)}
              sx={{ cursor: "pointer" }}
            >
              <Checkbox
                checked={(jointPurchaserList || []).some((purchaserDetails) => {
                  return purchaserDetails.userId === userId;
                })}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
                sx={{ mb: "auto", mr: 2, p: 0 }}
                tabIndex={-1}
              />
              <ItemDescription
                itemName={itemName}
                initialAmount={unitPrice}
                quantity={itemQuantity}
                calculatedTotal={itemTotalPrice}
                mode="itemDetail"
              />
            </ListItem>
          );
        }
      )}
    </List>
  );
};

export default PurchasedItemToggleList;
