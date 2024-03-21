import { useState } from "react";
import { Button, Box, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddParticipantModal from "@components/AddParticipantModal";
import theme from "@theme";
import { grey } from "@mui/material/colors";

type SelectableParticipantChipListProps = {
  expenseParticipantList: GeneralUser[];
  groupMemberList: GeneralUser[];
  handleNewExpenseChange: (key: string, value: GeneralUser[]) => void;
  itemOrderDetailsList: ItemOrderDetails[];
  selectedParticipantId: string;
  setSelectedParticipantId: (id: string) => void;
};

const SelectableParticipantChipList = ({
  expenseParticipantList,
  groupMemberList,
  handleNewExpenseChange,
  itemOrderDetailsList,
  selectedParticipantId,
  setSelectedParticipantId,
}: SelectableParticipantChipListProps) => {
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] =
    useState<boolean>(false);

  const isUserLinkedToAnyItems = (userId: string) =>
    itemOrderDetailsList.some((itemOrderDetail) =>
      itemOrderDetail.jointPurchaserList?.some(
        (purchaser) => purchaser.userId === userId
      )
    );

  const getParticipantChipStyle = (userId: string) => {
    if (selectedParticipantId === userId) {
      return {
        background: theme.palette.primary.main,
        color: "white",
        "&.MuiChip-root": {
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
          },
        },
      };
    } else if (!isUserLinkedToAnyItems(userId)) {
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
        {expenseParticipantList.map(({ userId, userName }) => (
          <Chip
            label={userName}
            key={userId}
            variant="outlined"
            onClick={() => setSelectedParticipantId(userId)}
            sx={getParticipantChipStyle(userId)}
          />
        ))}
        <Button
          onClick={() => setIsAddMemberModalOpen(true)}
          variant="outlined"
          sx={{
            borderRadius: 30,
            borderColor: "primary.main",
            "&:hover": {
              backgroundColor: "tertiary.main",
            },
          }}
        >
          <AddIcon />
        </Button>
      </Box>
      <AddParticipantModal
        expenseParticipantList={expenseParticipantList}
        isOpen={isAddMemberModalOpen}
        handleClose={() => setIsAddMemberModalOpen(false)}
        handleNewExpenseChange={handleNewExpenseChange}
        groupMemberList={groupMemberList}
      />
    </>
  );
};

export default SelectableParticipantChipList;
