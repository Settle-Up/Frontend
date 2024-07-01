import { useMemo, useState } from "react";
import { Typography } from "@mui/material";
import SearchableSelect from "@components/SearchableSelect";
import CustomButton from "@components/CustomButton";
import Modal from "@components/Modal";

type MemberOption = {
  id: string;
  label: string;
};

type AddParticipantModalProps = {
  expenseParticipantList: GeneralUser[];
  groupMemberList: GeneralUser[];
  handleClose: () => void;
  handleNewExpenseChange: (key: string, value: GeneralUser[]) => void;
  isOpen: boolean;
};

const AddParticipantModal = ({
  expenseParticipantList,
  groupMemberList,
  handleClose,
  handleNewExpenseChange,
  isOpen,
}: AddParticipantModalProps) => {
  const [additionalParticipantList, setAdditionalParticipantList] = useState<
    MemberOption[]
  >([]);

  const handleAddMembers = () => {
    if (additionalParticipantList) {
      handleNewExpenseChange("expenseParticipantList", [
        ...expenseParticipantList,
        ...additionalParticipantList.map((member) => ({
          userId: member.id,
          userName: member.label,
        })),
      ]);
    }
    handleClose();
    setAdditionalParticipantList([]);
  };

  const alreadySelectedParticipantIds = useMemo(
    () =>
      new Set(
        expenseParticipantList.map(
          (participant: GeneralUser) => participant.userId
        )
      ),
    [expenseParticipantList]
  );

  const additionalMemberOptions = useMemo(() => {
    return groupMemberList
      .filter(
        (member: GeneralUser) =>
          !alreadySelectedParticipantIds.has(member.userId)
      )
      .map((member: GeneralUser) => ({
        id: member.userId,
        label: member.userName!,
      }));
  }, [groupMemberList, alreadySelectedParticipantIds]);

  const handleAdditionalParticipantListChange = (
    selectedMembers: MemberOption | MemberOption[] | null
  ) => {
    if (selectedMembers && Array.isArray(selectedMembers)) {
      setAdditionalParticipantList(selectedMembers);
    }
  };

  return (
    <Modal
      ariaLabel="Add New Member"
      closeModal={handleClose}
      isOpen={isOpen}
      showCloseButton
    >
      <Typography variant="subtitle1" color="text.secondary">
        Add More Members to This Expense
      </Typography>
      <Typography>
        Did you forget to include someone in this expense? Add their name here
        to include them in the cost allocation.
      </Typography>
      <SearchableSelect
        ariaLabelledby="additional-expense-participants"
        possibleOptions={additionalMemberOptions}
        handleSelectionChange={handleAdditionalParticipantListChange}
        selectedOptions={additionalParticipantList}
        multiselect
      />
      <CustomButton
        buttonStyle="default"
        disabled={additionalParticipantList.length === 0}
        type="submit"
        sx={{ width: "100%" }}
        onClick={handleAddMembers}
      >
        Add Members
      </CustomButton>
    </Modal>
  );
};

export default AddParticipantModal;
