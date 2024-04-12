import { useEffect, useState } from "react";
import { Divider, Paper, Stack, Typography } from "@mui/material";
import SelectableParticipantChipList from "@components/SelectableParticipantChipList";
import PurchasedItemToggletList from "@components/PurchasedItemToggletList";
import GeneralExpenseDescription from "@components/GeneralExpenseDescription";
import ParticipantExpenseAccordion from "@components/ParticipantExpenseAccordion";

type ExpenseDetailsProps = {
  createdAt?: string;
  expense: CoreGroupExpenseDetails;
};

const ExpenseDetails = ({ createdAt, expense }: ExpenseDetailsProps) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const toggleAccordion =
    (panelId: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panelId : false);
    };

  const {
    payerUserName,
    allocationType,
    expenseParticipantList,
    itemOrderDetailsList,
    receiptName,
    address,
    receiptDate,
    receiptTotalPrice,
  } = expense;

  const parsePrice = (price: string) => {
    return parseFloat(price.replace(/[^0-9.-]+/g, ""));
  };

  const calculateParticipantExpenses = (participantId: string) => {
    const purchasedItemList: (
      | EqualShareItemDetails
      | VariableShareItemDetails
    )[] = [];
    let totalPurchasedCost = 0;

    if (allocationType === "Equal Quantity") {
      itemOrderDetailsList.forEach((item) => {
        const isPurchaser = item.jointPurchaserList?.some(
          (purchaser) => purchaser.userId === participantId
        );

        if (isPurchaser) {
          const jointPurchaserCount = item.jointPurchaserList?.length!;
          const itemPurchasedCost =
            parseFloat(item.itemTotalPrice) / jointPurchaserCount!;

          purchasedItemList.push({
            itemName: item.itemName,
            itemTotalPrice: item.itemTotalPrice,
            jointPurchaserCount: jointPurchaserCount,
            itemPurchasedCost,
          } as EqualShareItemDetails);

          totalPurchasedCost += itemPurchasedCost;
        }
      });
    } else if (allocationType === "Variable Quantity") {
      itemOrderDetailsList.forEach((item) => {
        const isPurchaser = item.jointPurchaserList?.some(
          (purchaser) => purchaser.userId === participantId
        );

        if (isPurchaser) {
          const unitPrice = parsePrice(item.unitPrice);
          const purchasedQuantity =
            Number(
              item.jointPurchaserList?.find(
                (purchaser) => purchaser.userId === participantId
              )?.purchasedQuantity
            ) || 0;

          const itemPurchasedCost = unitPrice * purchasedQuantity;
          purchasedItemList.push({
            itemName: item.itemName,
            unitPrice: item.unitPrice,
            purchasedQuantity,
            itemPurchasedCost,
          } as VariableShareItemDetails);

          totalPurchasedCost += itemPurchasedCost;
        }
      });
    }

    return {
      purchasedItemList: purchasedItemList,
      totalPurchasedCost: totalPurchasedCost,
    };
  };

  return (
    <Paper sx={{ backgroundColor: "white", borderRadius: 3, padding: 3 }}>
      <GeneralExpenseDescription
        createdAt={createdAt}
        receiptName={receiptName}
        address={address}
        receiptDate={receiptDate}
        receiptTotalPrice={receiptTotalPrice}
        itemOrderDetailsList={itemOrderDetailsList}
      />
      <Divider />
      <Typography variant="subtitle2">Payer</Typography>
      <Typography gutterBottom color="text.secondary">
        {payerUserName}
      </Typography>
      <Typography variant="subtitle2">Allocation Type</Typography>
      <Typography gutterBottom color="text.secondary">
        {allocationType}
      </Typography>
      <Divider />
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Cost Breakdown Per Person
      </Typography>
      {expenseParticipantList.map((participant: GeneralUser) => {
        const { userId } = participant;
        const participantExpenses = calculateParticipantExpenses(userId);

        return (
          <ParticipantExpenseAccordion
            key={userId}
            allocationType={allocationType}
            expanded={expanded === userId}
            participant={participant}
            participantExpense={participantExpenses}
            toggleAccordion={toggleAccordion(userId)}
          />
        );
      })}
    </Paper>
  );
};

export default ExpenseDetails;
