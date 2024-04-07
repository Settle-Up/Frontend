import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider, Paper, Stack, Typography } from "@mui/material";
import CustomButton from "@components/CustomButton";
import SelectableParticipantChipList from "@components/SelectableParticipantChipList";
import PurchasedItemToggletList from "@components/PurchasedItemToggletList";
import { useRecoilValue } from "recoil";
import { newExpenseState } from "@store/expenseStore";
import { useMutation } from "react-query";
import { createNewExpense } from "@apis/expense/createNewExpense";
import HeadingWithTip from "@components/HeadingWithTip";
import GeneralExpenseDescription from "@components/GeneralExpenseDescription";
import ParticipantExpenseAccordion from "@components/ParticipantExpenseAccordion";

const ExpenseSubmissionPage = () => {
  const newExpense = useRecoilValue(newExpenseState);
  const {
    payerUserName,
    allocationType,
    expenseParticipantList,
    itemOrderDetailsList,
  } = newExpense;

  const createNewGroupMutation = useMutation(createNewExpense, {
    onSuccess: () => {},
  });

  const handleSubmit = () => {
    createNewGroupMutation.mutate(newExpense);
  };

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

  const [expanded, setExpanded] = useState<string | false>(false);

  const toggleAccordion =
    (panelId: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panelId : false);
    };

  return (
    <Stack sx={{ flexGrow: 1, justifyContent: "space-between" }}>
      <Stack spacing={2}>
        <HeadingWithTip
          heading="Here's how your receipt and item allocations look"
          tipMessage="Please carefully review all the details  and ensure everything is accurate as this will be recorded in the system upon submission."
        />
        <Paper sx={{ backgroundColor: "white", borderRadius: 3, padding: 3 }}>
          <GeneralExpenseDescription />
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
      </Stack>
      <CustomButton
        buttonStyle="default"
        onClick={() => handleSubmit()}
        sx={{
          alignSelf: "flex-end",
          width: { xs: "100%", sm: "auto" },
          mt: 5,
        }}
      >
        Submit
      </CustomButton>
    </Stack>
  );
};

export default ExpenseSubmissionPage;

// const calculateParticipantExpenses = (
//   participantId: string
// ): ParticipantPurchaseDetails => {
//   return itemOrderDetailsList.reduce<ParticipantPurchaseDetails>(
//     (acc, item) => {
//       const isPurchaser = item.jointPurchaserList?.some(
//         (purchaser) => purchaser.userId === participantId
//       );
//       if (isPurchaser) {
//         const unitPrice = parsePrice(item.unitPrice);
//         const purchasedQuantity =
//           Number(
//             item.jointPurchaserList?.find(
//               (purchaser) => purchaser.userId === participantId
//             )?.purchasedQuantity
//           ) || 0;
//         const totalPrice = unitPrice * purchasedQuantity;
//         acc.purchasedItemList.push({
//           itemName: item.itemName,
//           unitPrice: item.unitPrice,
//           purchasedQuantity,
//           itemPurchasedCost: totalPrice,
//         } as VariableShareItemDetails);
//         acc.totalPurchasedCost += totalPrice;
//       }
//       return acc;
//     },
//     { purchasedItemList: [], totalPurchasedCost: 0 }
//   );
// };
