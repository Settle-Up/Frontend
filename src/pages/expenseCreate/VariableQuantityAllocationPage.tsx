import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "@components/CustomButton";
import { useRecoilState } from "recoil";
import { newExpenseState } from "@store/expenseStore";
import SelectableItemChipList from "@components/SelectableItemChipList";
import PurchasedItemQuantityAdjustList from "@components/PurchasedItemQuantityAdjustList";
import ItemDescription from "@components/ItemDescription";
import { Box, Card, Stack, Typography } from "@mui/material";
import CustomSnackbar from "@components/CustomSnackbar";
import HeadingWithTip from "@components/HeadingWithTip";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";

const initializeItemsAllocationStatusMap = (
  itemList: Item[]
): ItemsAllocationStatusMap => {
  const initialItemsAllocationStatusMap: ItemsAllocationStatusMap = {};

  itemList.forEach((item) => {
    // Calculate the sum of purchasedQuantity for each item
    const totalAllocatedQuantity =
      item.jointPurchaserList?.reduce((total, purchaser) => {
        return total + (Number(purchaser.purchasedQuantity) || 0);
      }, 0) || 0;

    // Check if the sum equals the itemQuantity
    const isItemFullyAllocated =
      totalAllocatedQuantity === Number(item.itemQuantity);

    initialItemsAllocationStatusMap[item.itemId] = {
      totalAllocatedQuantity,
      isItemFullyAllocated,
    };
  });

  return initialItemsAllocationStatusMap;
};

const VariableQuantityAllocationPage = () => {
  const navigate = useNavigate();

  const setSnackbar = useSetRecoilState(snackbarState);

  const [newExpense, setNewExpense] = useRecoilState(newExpenseState);

  const { expenseParticipantList, itemList } = newExpense;

  const [selectedItemId, setSelectedItemId] = useState<string>(
    itemList[0].itemId
  );

  const itemNameList = itemList.map(({ itemId, itemName }) => ({
    itemId,
    itemName,
  }));

  const selectedItemOrderDetails = itemList.find(
    (item) => item.itemId === selectedItemId
  );

  const {
    itemName,
    unitPrice,
    itemQuantity,
    itemTotalPrice,
    jointPurchaserList,
  } = selectedItemOrderDetails!;

  const handleNewExpenseChange = (
    key: string,
    value: string | AllocationType | Item[] | GeneralUser[]
  ) => {
    setNewExpense((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const [itemsAllocationStatusMap, setItemsAllocationStatusMap] = useState(() =>
    initializeItemsAllocationStatusMap(itemList)
  );

  const updateItemsAllocationStatusMap = (
    itemId: string,
    updatedTotalAllocatedQuantity: number
  ) => {
    setItemsAllocationStatusMap((prevDetails) => ({
      ...prevDetails,
      [itemId]: {
        totalAllocatedQuantity: updatedTotalAllocatedQuantity,
        isItemFullyAllocated:
          updatedTotalAllocatedQuantity ===
          parseInt(selectedItemOrderDetails!.itemQuantity, 10),
      },
    }));
  };

  const areAllItemsFullyAllocated = () => {
    return Object.values(itemsAllocationStatusMap).every(
      (detail) => detail.isItemFullyAllocated
    );
  };

  const handleConfirmClick = () => {
    if (areAllItemsFullyAllocated()) {
      navigate("/expense/submission/review");
    } else {
      setSnackbar({
        show: true,
        message:
          "To proceed, please ensure that each item's quantity is fully allocated among participants.",
        severity: "warning",
      });
    }
  };

  return (
    <>
      <Stack sx={{ flexGrow: 1, justifyContent: "space-between" }}>
        <Stack spacing={2}>
          <HeadingWithTip
            heading="Allocate Quantities of Items Per Member"
            tipMessage="For each item, specify the quantity each member purchased. Adjust the quantities using the plus and minus controls beside each name."
          />
          <SelectableItemChipList
            itemsAllocationStatusMap={itemsAllocationStatusMap}
            itemNameList={itemNameList}
            selectedItemId={selectedItemId}
            setSelectedItemId={setSelectedItemId}
          />
          <Card sx={{ p: 2 }}>
            <ItemDescription
              itemName={itemName}
              initialAmount={unitPrice}
              quantity={itemQuantity}
              calculatedTotal={itemTotalPrice}
              mode="itemDetail"
            />
          </Card>
          <PurchasedItemQuantityAdjustList
            expenseParticipantList={expenseParticipantList}
            handleNewExpenseChange={handleNewExpenseChange}
            itemsAllocationStatusMap={itemsAllocationStatusMap}
            itemList={itemList}
            jointPurchaserList={jointPurchaserList!}
            selectedItemId={selectedItemId}
            updateItemsAllocationStatusMap={updateItemsAllocationStatusMap}
          />
          <Box
            sx={{
              mt: 2,
              alignSelf: "flex-end",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h6" color="primary">{`${
              itemsAllocationStatusMap[selectedItemId]
                ?.totalAllocatedQuantity ?? 0
            }/${itemQuantity}`}</Typography>
            <Typography variant="subtitle1">Quantity Allocated</Typography>
          </Box>
        </Stack>
        <CustomButton
          buttonStyle="default"
          onClick={handleConfirmClick}
          sx={{
            alignSelf: "flex-end",
            width: { xs: "100%", sm: "auto" },
            mt: 5,
          }}
        >
          Confirm
        </CustomButton>
      </Stack>
    </>
  );
};

export default VariableQuantityAllocationPage;
