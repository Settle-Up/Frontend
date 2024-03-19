import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import CustomButton from "@components/CustomButton";
import SelectableParticipantChipList from "@components/SelectableParticipantChipList";
import PurchasedItemToggletList from "@components/PurchasedItemToggletList";
import { useRecoilState } from "recoil";
import { newExpenseState } from "@store/expenseStore";

const EqualQuantityAllocationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { groupMemberList } = location.state;
  const [newExpense, setNewExpense] = useRecoilState(newExpenseState);
  const { expenseParticipantList, itemOrderDetailsList } = newExpense;
  const [selectedParticipantId, setSelectedParticipantId] = useState<string>(
    expenseParticipantList[0].userId
  );

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

  return (
    <Stack sx={{ flexGrow: 1, justifyContent: "space-between" }}>
      <Stack spacing={2}>
        {/* <PageHeading headingText="Allocate Items to Members" tipMessage="Select the items each member was involved in purchasing. Tap on a member's name to highlight it, then check the items they contributed to."/> */}
        <SelectableParticipantChipList
          expenseParticipantList={expenseParticipantList}
          groupMemberList={groupMemberList}
          handleNewExpenseChange={handleNewExpenseChange}
          itemOrderDetailsList={itemOrderDetailsList}
          selectedParticipantId={selectedParticipantId}
          setSelectedParticipantId={setSelectedParticipantId}
        />
        <PurchasedItemToggletList
          handleNewExpenseChange={handleNewExpenseChange}
          itemOrderDetailsList={itemOrderDetailsList}
          userId={selectedParticipantId}
        />
      </Stack>
      <CustomButton
        buttonStyle="default"
        onClick={() => {
          navigate("/expense-summary-review");
        }}
        sx={{
          alignSelf: "flex-end",
          width: "100%",
          mt: 5,
        }}
      >
        Confirm
      </CustomButton>
    </Stack>
  );
};

export default EqualQuantityAllocationPage;
