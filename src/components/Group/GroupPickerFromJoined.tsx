import { useEffect, useState } from "react";
import SearchableSelect from "@components/SearchableSelect";
import { useRecoilState } from "recoil";
import { newExpenseState } from "@store/expenseStore";
import { useInfiniteQuery } from "react-query";
import { getGroupList } from "@apis/groups/getGroupList";
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";
import { Skeleton } from "@mui/material";

type GroupOption = {
  id: string;
  label: string;
};

type GroupPickerFromJoinedProps = {
  groupError: string;
};

const GroupPickerFromJoined = ({ groupError }: GroupPickerFromJoinedProps) => {
  const setSnackbar = useSetRecoilState(snackbarState);

  const [possibleGroupOptions, setPossibleGroupOptions] = useState<
    GroupOption[] | null
  >(null);
  const [newExpense, setNewExpense] = useRecoilState(newExpenseState);

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    "groupSummaryList",
    ({ pageParam = 1 }) => getGroupList({ page: pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.hasNextPage) {
          return allPages.length + 1;
        } else {
          return undefined;
        }
      },
    }
  );

  const lastElementRef = useIntersectionObserver({
    isError,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const lastSuccessfullyFetchedPage = data?.pages.length || 0;

  useEffect(() => {
    if (isError && lastSuccessfullyFetchedPage > 0) {
      setSnackbar({
        show: true,
        message:
          "Sorry, we encountered an issue loading more groups. Please try again later.",
        severity: "error",
      });
    }
  }, [isError, setSnackbar, lastSuccessfullyFetchedPage]);

  useEffect(() => {
    if (data && data.pages.length > 0) {
      const x: GroupOption[] = [];

      data.pages.forEach((page) => {
        page?.dataList.forEach((group: JoinedGroupSummary) =>
          x.push({
            id: group.groupId,
            label: group.groupName,
          })
        );
      });

      setPossibleGroupOptions(x);
    }
  }, [data]);

  const changeGroup = (selectedGroup: GroupOption | GroupOption[] | null) => {
    if (selectedGroup && !Array.isArray(selectedGroup)) {
      setNewExpense((prev) => ({
        ...prev,
        groupId: selectedGroup.id,
        groupName: selectedGroup.label,
      }));
    }
  };

  const renderSkeletons = () =>
    [...Array(10)].map((_, index) => (
      <Skeleton
        key={index}
        variant="text"
        width={170}
        sx={{ fontSize: "16px" }}
        animation="wave"
      />
    ));

  const paginationTrigger = (
    <>
      {(isLoading || isFetchingNextPage) && renderSkeletons()}
      {!isError && (
        <div
          ref={lastElementRef}
          style={{
            display: hasNextPage ? "inline" : "none",
            border: "3px solid blue",
          }}
        />
      )}
    </>
  );

  return (
    <SearchableSelect
      ariaLabelledby="group"
      label="Choose Group"
      handleSelectionChange={changeGroup}
      helperText={groupError}
      possibleOptions={possibleGroupOptions}
      selectedOptions={{
        id: newExpense.groupId,
        label: newExpense.groupName,
      }}
      endOfListElement={paginationTrigger}
    />
  );
};

export default GroupPickerFromJoined;
