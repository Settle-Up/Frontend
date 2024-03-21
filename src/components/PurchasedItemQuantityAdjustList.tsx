import {
  Box,
  Button,
  ButtonGroup,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import theme from "@theme";

type PurchasedItemQuantityAdjustListProps = {
  expenseParticipantList: GeneralUser[];
  handleNewExpenseChange: (key: string, value: ItemOrderDetails[]) => void;
  itemsAllocationStatusMap: ItemsAllocationStatusMap;
  itemOrderDetailsList: ItemOrderDetails[];
  jointPurchaserList: PurchaserDetails[];
  selectedItemId: string;
  updateItemsAllocationStatusMap: (
    itemId: string,
    updatedTotalAllocatedQuantity: number
  ) => void;
};
const PurchasedItemQuantityAdjustList = ({
  expenseParticipantList,
  handleNewExpenseChange,
  itemsAllocationStatusMap,
  itemOrderDetailsList,
  jointPurchaserList,
  selectedItemId,
  updateItemsAllocationStatusMap,
}: PurchasedItemQuantityAdjustListProps) => {
  const handleQuantityChange = (userId: string, delta: number) => {
    if (
      delta > 0 &&
      itemsAllocationStatusMap[selectedItemId].isItemFullyAllocated
    ) {
      // Prevent increasing the quantity if the item is fully allocated
      return;
    }

    const updatedItemOrderDetailsList: ItemOrderDetails[] =
      itemOrderDetailsList.map((item) => {
        if (item.itemId === selectedItemId) {
          const newItem = { ...item };
          newItem.jointPurchaserList = item.jointPurchaserList
            ? item.jointPurchaserList.map((jp) => ({ ...jp }))
            : [];

          const existingPurchaserIndex = newItem.jointPurchaserList.findIndex(
            (p) => p.userId === userId
          );

          if (existingPurchaserIndex >= 0) {
            let currentQuantity = parseInt(
              newItem.jointPurchaserList[existingPurchaserIndex]
                .purchasedQuantity || "0"
            );
            // Prevent reducing the quantity below zero
            currentQuantity = Math.max(0, currentQuantity + delta);

            newItem.jointPurchaserList[
              existingPurchaserIndex
            ].purchasedQuantity = currentQuantity.toString();
            if (currentQuantity === 0) {
              newItem.jointPurchaserList.splice(existingPurchaserIndex, 1);
            }
          } else if (delta > 0) {
            newItem.jointPurchaserList.push({ userId, purchasedQuantity: "1" });
          }

          return newItem;
        }
        return item;
      });

    const selectedUpdatedItem = updatedItemOrderDetailsList.find(
      (item) => item.itemId === selectedItemId
    );
    const totalAllocatedQuantityForSelectedItem =
      selectedUpdatedItem?.jointPurchaserList
        ? selectedUpdatedItem.jointPurchaserList.reduce(
            (total, jp) => total + parseInt(jp.purchasedQuantity || "0", 10),
            0
          )
        : 0;

    const updatedTotalAllocatedQuantity = Math.max(
      0,
      totalAllocatedQuantityForSelectedItem
    );
    updateItemsAllocationStatusMap(
      selectedItemId,
      updatedTotalAllocatedQuantity
    );
    handleNewExpenseChange("itemOrderDetailsList", updatedItemOrderDetailsList);
  };

  const getPurchasedQuantity = (userId: string) => {
    const purchaserDetails = jointPurchaserList.find(
      (jointPurchaser) => jointPurchaser.userId === userId
    );

    return purchaserDetails ? purchaserDetails?.purchasedQuantity : 0;
  };

  return (
    <List>
      {expenseParticipantList.map(({ userId, userName }) => {
        // Call getPurchasedQuantity once per user
        const purchasedQuantity = getPurchasedQuantity(userId);

        return (
          <ListItem
            key={userId}
            sx={{
              py: 2,
              backgroundColor:
                parseInt(purchasedQuantity || "0", 10) > 0
                  ? theme.palette.tertiary.main
                  : null,
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Typography
                sx={{ width: "65%", wordBreak: "break-all" }}
                variant="body1"
              >
                {userName}
              </Typography>
              <Typography sx={{ width: "5%", mx: 1 }} variant="body1">
                {purchasedQuantity}
              </Typography>
              <ButtonGroup
                size="medium"
                aria-label="medium button group"
                sx={{ width: "30%", justifyContent: "flex-end" }}
              >
                <Button onClick={() => handleQuantityChange(userId, -1)}>
                  <RemoveIcon />
                </Button>
                <Button
                  onClick={() => handleQuantityChange(userId, 1)}
                  disabled={
                    itemsAllocationStatusMap[selectedItemId]
                      .isItemFullyAllocated
                  }
                >
                  <AddIcon />
                </Button>
              </ButtonGroup>
            </Box>
          </ListItem>
        );
      })}
    </List>
  );
};

export default PurchasedItemQuantityAdjustList;
