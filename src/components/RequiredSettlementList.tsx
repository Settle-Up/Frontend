import { useMemo } from "react";
import { Stack } from "@mui/material";
import PaymentList from "@components/PaymentList";
import OutgoingPaymentCard from "@components/OutgoingPaymentCard";
import IncomingPaymentCard from "@components/IncomingPaymentCard";
import PaymentConfirmationModal from "@components/PaymentConfirmationModal";
import { useRecoilState } from "recoil";
import { selectedTransactionForPaymentState } from "@store/transactionStore";

type RequiredSettlementListProps = {
  groupId: string;
  isLoading: boolean;
  neededTransactionList: RequiredTransaction[];
};

const RequiredSettlementList = ({
  groupId,
  isLoading,
  neededTransactionList,
}: RequiredSettlementListProps) => {
  const [selectedTransactionForPayment, setSelectedTransactionForPayment] =
    useRecoilState(selectedTransactionForPaymentState);

  const { incomingPaymentList, outgoingPaymentList } = useMemo(() => {
    const incomingPaymentList: RequiredTransaction[] = [];
    const outgoingPaymentList: RequiredTransaction[] = [];

    neededTransactionList.forEach((transaction) => {
      if (transaction.transactionDirection === "OWED") {
        incomingPaymentList.push(transaction);
      } else if (transaction.transactionDirection === "OWE") {
        outgoingPaymentList.push(transaction);
      }
    });

    return { incomingPaymentList, outgoingPaymentList };
  }, [neededTransactionList]);

  return (
    <>
      <Stack spacing={4}>
        <PaymentList
          isLoading={isLoading}
          title="Payments To Make"
          transactionList={outgoingPaymentList}
          CardComponent={OutgoingPaymentCard}
          skeletonWidths={{ text1: 100, text2: 90, rounded: 40 }}
        />
        <PaymentList
          isLoading={isLoading}
          title="Payments To Receive"
          transactionList={incomingPaymentList}
          CardComponent={IncomingPaymentCard}
          skeletonWidths={{ text1: 100, text2: 80 }}
        />
      </Stack>
      {selectedTransactionForPayment && (
        <PaymentConfirmationModal
          groupId={groupId}
          selectedTransactionForPayment={selectedTransactionForPayment}
          closeModal={() => setSelectedTransactionForPayment(null)}
        />
      )}
    </>
  );
};

export default RequiredSettlementList;
