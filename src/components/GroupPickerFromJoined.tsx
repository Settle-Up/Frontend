import { Typography } from "@mui/material";
import SearchableSelect from "@components/SearchableSelect";
import { useRecoilState } from "recoil";
import { newExpenseState } from "@store/expenseStore";
import { useQuery } from "react-query";
import { getGroupSummaryList } from "@apis/group/getGroupSummaryList";

import { mockJoinedGroupSummaryData } from "@mock/groupMock";

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

  const handleSelectedGroupChange = (
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

  const extractedGroupData = mockJoinedGroupSummaryData.map((group) => ({
    id: group.groupId,
    label: group.groupName,
  }));

  return (
    <>
      <Typography id="select-group" variant="subtitle2">
        Choose Group
      </Typography>
      <SearchableSelect
        ariaLabelledby="select-group"
        // possibleOptions={possibleGroupOptions}
        possibleOptions={extractedGroupData}
        selectedOptions={{
          id: newExpense.groupId,
          label: newExpense.groupName,
        }}
        handleSelectionChange={handleSelectedGroupChange}
      />
    </>
  );
};

export default GroupPickerFromJoined;
