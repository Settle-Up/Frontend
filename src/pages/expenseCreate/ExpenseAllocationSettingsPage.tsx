import { Stack, TextField, Typography } from "@mui/material";
import SearchableSelect from "@components/SearchableSelect";
import { useQuery } from "react-query";
import { getGroupMemberList } from "@apis/group/getGroupMemberList";
import { useRecoilState } from "recoil";
import { newExpenseState } from "@store/expenseStore";
import { mockGroupMemberList } from "@mock/groupMock";
import CustomIconButton from "@components/CustomIconButton";
import EastIcon from "@mui/icons-material/East";

type MemberOption = {
  id: string;
  label: string;
};

type AllocationOption = {
  label: string;
};

const ExpenseAllocationSettingsPage = () => {
  const [newExpense, setNewExpense] = useRecoilState(newExpenseState);

  // const {
  //   data: groupMemberList,
  //   isLoading,
  //   error,
  // } = useQuery("groupMemberList", () =>
  //   getGroupMemberList(newExpense.groupId)
  // );

  // const possibleMemberOptions: MemberOption[] =
  //   groupMemberList?.map((member: GeneralUser) => ({
  //     id: member.userId,
  //     label: member.userName!,
  //   })) ?? [];

  const possibleAllocationOptions: AllocationOption[] = [
    { label: "Allocate by Variable Quantity" },
    { label: "Allocate by Equal Quantity" },
  ];

  const handlePayerChange = (
    selectedMember: MemberOption | MemberOption[] | null
  ) => {
    if (selectedMember && !Array.isArray(selectedMember)) {
      setNewExpense((prev) => ({
        ...prev,
        payerId: selectedMember.id,
        payerName: selectedMember.label,
      }));
    }
  };

  const handleExpenseParticipantListChange = (
    selectedMembers: MemberOption | MemberOption[] | null
  ) => {
    if (selectedMembers && Array.isArray(selectedMembers)) {
      setNewExpense((prev) => {
        return {
          ...prev,
          expenseParticipantList: selectedMembers.map((member) => ({
            userId: member.id,
            userName: member.label,
          })),
        };
      });
    }
  };

  const handleAllocationTypeChange = (
    selectedAllocationType: AllocationOption | AllocationOption[] | null
  ) => {
    if (selectedAllocationType && !Array.isArray(selectedAllocationType)) {
      setNewExpense((prev) => {
        return {
          ...prev,
          allocationType: selectedAllocationType?.label as AllocationType,
        };
      });
    }
  };

  const mockGroupMemberOptions = mockGroupMemberList.map((member) => ({
    id: member.userId,
    label: member.userName,
  }));

  return (
    <Stack sx={{ flexGrow: 1, justifyContent: "space-between" }}>
      <Stack spacing={6}>
        <SearchableSelect
          ariaLabelledby="expense-payer"
          label="Who paid for this expense?"
          handleSelectionChange={handlePayerChange}
          // possibleOptions={possibleMemberOptions}
          possibleOptions={mockGroupMemberOptions}
          selectedOptions={{
            id: newExpense.payerId,
            label: newExpense.payerName,
          }}
        />
        <SearchableSelect
          ariaLabelledby="expense-participants"
          label="Who participated in this expense?"
          handleSelectionChange={handleExpenseParticipantListChange}
          // possibleOptions={possibleMemberOptions}
          possibleOptions={mockGroupMemberOptions}
          selectedOptions={newExpense.expenseParticipantList.map((user) => ({
            id: user.userId!,
            label: user.userName!,
          }))}
          multiselect
        />
        <SearchableSelect
          ariaLabelledby="expense-allocation-type"
          label="How would you like to allocate the costs for items purchased?"
          handleSelectionChange={handleAllocationTypeChange}
          possibleOptions={possibleAllocationOptions}
          selectedOptions={{ label: newExpense.allocationType }}
        />
      </Stack>
      <CustomIconButton
        ariaLabel="Move on to next step"
        icon={<EastIcon sx={{ fontSize: "30px" }} />}
        shape="round"
        sx={{
          alignSelf: "flex-end",
          mt: 5,
        }}
        type="submit"
      />
    </Stack>
  );
};

export default ExpenseAllocationSettingsPage;
