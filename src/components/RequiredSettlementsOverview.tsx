import { useMemo } from "react";
import HeadingWithTip from "@components/HeadingWithTip";
import { Stack } from "@mui/material";
import RequiredTransactionList from "@components/RequiredTransactionList";

type RequiredSettlementsOverviewProps = {
  neededTransactionList: RequiredTransaction[];
};

const RequiredSettlementsOverview = ({
  neededTransactionList,
}: RequiredSettlementsOverviewProps) => {
  const { owedList, oweList } = useMemo(() => {
    let owedList: RequiredTransaction[] = [];
    let oweList: RequiredTransaction[] = [];

    neededTransactionList.forEach((transaction) => {
      if (transaction.transactionDirection === "OWED") {
        owedList.push(transaction);
      } else if (transaction.transactionDirection === "OWE") {
        oweList.push(transaction);
      }
    });

    return { owedList, oweList };
  }, [neededTransactionList]);

  return (
    <Stack>
      <HeadingWithTip
        heading="Needed Transactions"
        tipMessage="Check off a transaction in this section once you've settled it outside the app. This will notify the other party for their confirmation."
      />
      <Stack spacing={4}>
        <RequiredTransactionList title="You Owe" transactionList={oweList} />
        <RequiredTransactionList title="You Are Owed" transactionList={owedList} />
      </Stack>
    </Stack>
  );
};

export default RequiredSettlementsOverview;
