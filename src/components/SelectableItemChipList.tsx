import { useState } from "react";
import { Button, Box, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddParticipantModal from "@components/AddParticipantModal";
import theme from "@theme";
import { grey } from "@mui/material/colors";

type ItemsAllocationStatusMap = {
  [itemId: string]: {
    totalAllocatedQuantity: number;
    isItemFullyAllocated: boolean;
  };
};

type SelectableItemChipListProps = {
  itemsAllocationStatusMap: ItemsAllocationStatusMap;
  itemNameList: { itemId: string; itemName: string }[];
  selectedItemId: string;
  setSelectedItemId: (id: string) => void;
};

const SelectableItemChipList = ({
  itemsAllocationStatusMap,
  itemNameList,
  selectedItemId,
  setSelectedItemId,
}: SelectableItemChipListProps) => {
  const getParticipantChipStyle = (itemId: string) => {
    if (selectedItemId === itemId) {
      return {
        background: theme.palette.primary.main,
        color: "white",
        "&.MuiChip-root": {
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
          },
        },
      };
    } else if (!itemsAllocationStatusMap[itemId].isItemFullyAllocated) {
      return {
        background: grey[400],
        color: grey[600],
        borderColor: grey[600],
        "&.MuiChip-root": {
          "&:hover": {
            backgroundColor: grey[300],
          },
        },
      };
    } else {
      return {};
    }
  };

  return (
    <>
      <Box
        className="custom-scrollbar"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          overflowX: "auto",
        }}
      >
        {itemNameList.map(({ itemId, itemName }) => (
          <Chip
            label={itemName}
            key={itemId}
            variant="outlined"
            onClick={() => setSelectedItemId(itemId)}
            sx={getParticipantChipStyle(itemId)}
          />
        ))}
      </Box>
    </>
  );
};

export default SelectableItemChipList;
