import { Typography } from "@mui/material";
import SearchableSelect from "@components/SearchableSelect";
import { useRecoilState } from "recoil";
import { newExpenseState } from "@store/expenseStore";
import { useQuery } from "react-query";
import { getGroupSummaryList } from "@apis/group/getGroupSummaryList";
import { mockJoinedGroupList } from "@mock/groupMock";

type GroupOption = {
  id: string;
  label: string;
};

const GroupPickerFromJoined = () => {
  const [newExpense, setNewExpense] = useRecoilState(newExpenseState);

  // const {
  //   data: groupSummaryList,
  //   isLoading,
  //   error,
  // } = useQuery("groupSummaryList", getGroupSummaryList);

  // const possibleGroupOptions: GroupOption[] =
  //   groupSummaryList?.map((group: JoinedGroupSummary) => ({
  //     id: group.groupId,
  //     label: group.groupName,
  //   })) ?? [];

  const handleGroupChange = (
    selectedGroup: GroupOption | GroupOption[] | null
  ) => {
    if (selectedGroup && !Array.isArray(selectedGroup)) {
      setNewExpense((prev) => ({
        ...prev,
        groupId: selectedGroup.id,
        groupName: selectedGroup.label,
      }));
    }
  };

  const mockGroupOptions = mockJoinedGroupList.map((group) => ({
    id: group.groupId,
    label: group.groupName,
  }));

  return (
    <SearchableSelect
      ariaLabelledby="group"
      label="Choose Group"
      // possibleOptions={possibleGroupOptions}
      handleSelectionChange={handleGroupChange}
      possibleOptions={mockGroupOptions}
      selectedOptions={{
        id: newExpense.groupId,
        label: newExpense.groupName,
      }}
    />
  );
};

export default GroupPickerFromJoined;
