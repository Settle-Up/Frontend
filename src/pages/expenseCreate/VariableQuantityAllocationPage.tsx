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

const initializeItemAllocationDetails = (
  itemOrderDetailsList: ItemOrderDetails[]
): ItemsAllocationStatusMap => {
  const initialItemsAllocationStatusMap: ItemsAllocationStatusMap = {};
  itemOrderDetailsList.forEach((item) => {
    initialItemsAllocationStatusMap[item.itemId] = {
      totalAllocatedQuantity: 0,
      isItemFullyAllocated: false,
    };
  });
  return initialItemsAllocationStatusMap;
};

const VariableQuantityAllocationPage = () => {
  const navigate = useNavigate();
  const [newExpense, setNewExpense] = useRecoilState(newExpenseState);

  const { expenseParticipantList, itemOrderDetailsList } = newExpense;

  const [selectedItemId, setSelectedItemId] = useState<string>(
    itemOrderDetailsList[0].itemId
  );

  const itemNameList = itemOrderDetailsList.map(({ itemId, itemName }) => ({
    itemId,
    itemName,
  }));

  const selectedItemOrderDetails = itemOrderDetailsList.find(
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
    value: string | AllocationType | ItemOrderDetails[] | GeneralUser[]
  ) => {
    setNewExpense((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const [itemsAllocationStatusMap, setItemsAllocationStatusMap] = useState(() =>
    initializeItemAllocationDetails(itemOrderDetailsList)
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

  const [showAllocationIncompleteAlert, setShowAllocationIncompleteAlert] =
    useState(false);

  const areAllItemsFullyAllocated = () => {
    return Object.values(itemsAllocationStatusMap).every(
      (detail) => detail.isItemFullyAllocated
    );
  };

  const handleConfirmClick = () => {
    if (areAllItemsFullyAllocated()) {
      navigate("/expense-summary-review");
    } else {
      setShowAllocationIncompleteAlert(true);
    }
  };

  return (
    <>
      <Stack sx={{ flexGrow: 1, justifyContent: "space-between" }}>
        {/* <PageHeading
          headingText="Allocate Quantities of Items Per Member"
          tipMessage="For each item, specify the quantity each member purchased. Adjust the quantities using the plus and minus controls beside each name."
        /> */}
        <Stack spacing={2}>
          <SelectableItemChipList
            itemsAllocationStatusMap={itemsAllocationStatusMap}
            itemNameList={itemNameList}
            selectedItemId={selectedItemId}
            setSelectedItemId={setSelectedItemId}
          />
          <Card sx={{ p: 2 }}>
            <ItemDescription
              itemName={itemName}
              unitPrice={unitPrice}
              itemQuantity={itemQuantity}
              itemTotalPrice={itemTotalPrice}
            />
          </Card>
          <PurchasedItemQuantityAdjustList
            expenseParticipantList={expenseParticipantList}
            handleNewExpenseChange={handleNewExpenseChange}
            itemsAllocationStatusMap={itemsAllocationStatusMap}
            itemOrderDetailsList={itemOrderDetailsList}
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
            width: "100%",
            mt: 5,
          }}
        >
          Confirm
        </CustomButton>
      </Stack>
      <CustomSnackbar
        handleClose={() => setShowAllocationIncompleteAlert(false)}
        message="Please ensure all items are fully allocated before proceeding. Every item must be allocated to its full quantity."
        severity="warning"
        show={showAllocationIncompleteAlert}
      />
    </>
  );
};

export default VariableQuantityAllocationPage;
