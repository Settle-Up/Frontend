import SingleDayExpenseList from "@components/SingleDayExpenseList";
import { useMemo } from "react";

type GroupExpenseListProps = {
  expenseList: UserSpecificExpenseSummary[];
};

type ExpenseListByDate = {
  [date: string]: UserSpecificExpenseSummary[];
};

const GroupExpenseList = ({ expenseList }: GroupExpenseListProps) => {
  const expensesByDate = useMemo(() => {
    const expensesByDateObject: ExpenseListByDate = {};

    expenseList.forEach((expense: UserSpecificExpenseSummary) => {
      const date = expense.createdAt.split("T")[0];
      if (!expensesByDateObject[date]) {
        expensesByDateObject[date] = [];
      }
      expensesByDateObject[date].push(expense);
    });

    return expensesByDateObject;
  }, [expenseList]);
  return (
    <>
      {Object.entries(expensesByDate).map(([date, singleDayExpenseList]) => (
        <SingleDayExpenseList
          key={date} 
          date={date}
          singleDayExpenseList={singleDayExpenseList}
        />
      ))}
    </>
  );
};

export default GroupExpenseList;
