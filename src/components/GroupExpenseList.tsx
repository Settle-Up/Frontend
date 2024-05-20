import SingleDayExpenseList from "@components/SingleDayExpenseList";
import SingleDayExpenseListSkeleton from "@components/SingleDayExpenseListSkeleton";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { getGroupExpenseList } from "@apis/group/getGroupExpenseList";
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";
import { Stack,Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Spinner from "@components/Spinner";

type ExpenseListByDate = {
  [date: string]: UserSpecificExpenseSummary[];
};

type GroupExpenseListProps = {
  groupId: string;
};

const GroupExpenseList = ({ groupId }: GroupExpenseListProps) => {
  const setSnackbar = useSetRecoilState(snackbarState);

  const [expensesByDate, setExpensesByDate] = useState<ExpenseListByDate>({});

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["groupExpenseList", groupId],
    ({ pageParam = 1 }) =>
      groupId ? getGroupExpenseList({ groupId, page: pageParam }) : undefined,
    {
      enabled: !!groupId,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage?.hasNextPage) {
          return allPages.length + 1;
        } else {
          return undefined;
        }
      },
    }
  );

  const lastElementRef = useIntersectionObserver({
    containerId: "groupListContainer",
    isError,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });


  const lastSuccessfullyFetchedPage = data?.pages?.length ?? 0;

  useEffect(() => {
    if (isError && lastSuccessfullyFetchedPage > 0) {
      setSnackbar({
        show: true,
        message:
          "Sorry, we encountered an issue loading more expenses. Please try again later.",
        severity: "error",
      });
    }
  }, [isError, setSnackbar, lastSuccessfullyFetchedPage]);

  useEffect(() => {
    if (data && data.pages.length > 0) {
      const newExpensesByDate: ExpenseListByDate = {};

      data.pages.forEach((page) => {
        page?.expenses.forEach((expense) => {
          const date = expense.createdAt.split("T")[0];
          if (!newExpensesByDate[date]) {
            newExpensesByDate[date] = [];
          }
          const existingExpense = newExpensesByDate[date].find(
            (e) => e.receiptId === expense.receiptId
          );
          if (!existingExpense) {
            newExpensesByDate[date].push(expense);
          }
        });
      });

      setExpensesByDate(newExpensesByDate);
    }
  }, [data]);

  // useEffect(() => {
  //   if (data && data.pages.length > 0) {
  //     const newPageData = data.pages[data.pages.length - 1];
  //     const newExpensesByDate: ExpenseListByDate = { ...expensesByDate };

  //     if (!newPageData) {
  //       return;
  //     }

  //     newPageData.expenses.forEach((expense) => {
  //       const date = expense.createdAt.split("T")[0];
  //       if (!newExpensesByDate[date]) {
  //         newExpensesByDate[date] = [];
  //       }
  //       newExpensesByDate[date].push(expense);
  //     });

  //     setExpensesByDate(newExpensesByDate);
  //   }
  // }, [data]);

  return (
    <Stack spacing={4}>
      {lastSuccessfullyFetchedPage === 0 && isError && (
        <Typography
        variant="subtitle2"
          sx={{
            color: grey[500],
            textAlign: "center",
            m: 5,
          }}
        >
          Sorry, we encountered an issue retrieving your group's expense list.
          <br />
          Please try again later.
        </Typography>
      )}
      {isLoading &&
        [...Array(2)].map((_, index) => (
          <SingleDayExpenseListSkeleton key={index} />
        ))}
      {data && data.pages[0]?.expenses.length === 0 && (
        <Typography
          variant="subtitle2"
          sx={{
            color: grey[500],
            textAlign: "center",
            m: 5,
          }}
        >
          Seems like your group doesn't have any expenses recorded yet.
        </Typography>
      )}
      {Object.entries(expensesByDate).map(([date, singleDayExpenseList]) => (
        <SingleDayExpenseList
          key={date}
          date={date}
          singleDayExpenseList={singleDayExpenseList}
        />
      ))}
      {isFetchingNextPage && <Spinner size={25} />}
      {!isError && (
        <div
          ref={hasNextPage ? lastElementRef : undefined}
          style={{
            display: hasNextPage ? "inline" : "none",
            border: "3px solid blue",
          }}
        />
      )}
    </Stack>
  );
};

export default GroupExpenseList;
