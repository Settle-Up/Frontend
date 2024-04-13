import { useEffect, useMemo } from "react";
import { Stack } from "@mui/material";
import OutgoingPaymentList from "./OutgoingPaymentList";
import { useRecoilState } from "recoil";
import { settleTxModalState } from "@store/settleTxModalStore";
import { outgoingPaymentListState } from "@store/transactionStore";
import IncomingPaymentList from "@components/IncomingPaymentList";

type RequiredSettlementsOverviewProps = {
  isLoading: boolean;
  neededTransactionList: RequiredTransaction[];
};

const RequiredSettlementsOverview = ({
  isLoading,
  neededTransactionList,
}: RequiredSettlementsOverviewProps) => {
  // const [
  //   { selectedTransaction, isTransactionSuccessfullySettled },
  //   setSettleTxModal,
  // ] = useRecoilState(settleTxModalState);

  const [outgoingPaymentList, setOutgoingPaymentList] = useRecoilState(
    outgoingPaymentListState
  );

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

  useEffect(() => {
    setOutgoingPaymentList(oweList);
  }, [oweList, setOutgoingPaymentList]);

  // useEffect(() => {
  //   if (selectedTransaction && isTransactionSuccessfullySettled) {
  //     setOutgoingPaymentList((prevList: BaseTransaction[] | null) => {
  //       if (prevList === null) {
  //         return null;
  //       }
  //       return prevList.filter(
  //         (transaction) =>
  //           transaction.transactionId !== selectedTransaction.transactionId
  //       );
  //     });

  //     setSettleTxModal({
  //       isOpen: false,
  //       selectedTransaction: null,
  //       isTransactionSuccessfullySettled: null,
  //     });
  //     // remove the transaction from required transaction section and add it to the transactions settled in the past week
  //   }
  // }, [isTransactionSuccessfullySettled, setSettleTxModal]);

  return (
    <Stack>
      <Stack spacing={4}>
        <OutgoingPaymentList
          isLoading={isLoading}
          title="Payments To Make"
          transactionList={outgoingPaymentList || undefined}
        />
        <IncomingPaymentList
          isLoading={isLoading}
          title="Payments To Receive"
          transactionList={owedList}
        />
      </Stack>
    </Stack>
  );
};

export default RequiredSettlementsOverview;
