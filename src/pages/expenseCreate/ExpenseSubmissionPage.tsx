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
import ExpenseDetails from "@components/ExpenseDetails";

const ExpenseSubmissionPage = () => {
  const newExpense = useRecoilValue(newExpenseState);

  const createNewGroupMutation = useMutation(createNewExpense, {
    onSuccess: () => {},
  });

  const handleSubmit = () => {
    createNewGroupMutation.mutate(newExpense);
  };


  return (
    <Stack sx={{ flexGrow: 1, justifyContent: "space-between" }}>
      <Stack spacing={2}>
        <HeadingWithTip
          heading="Here's how your receipt and item allocations look"
          tipMessage="Please carefully review all the details  and ensure everything is accurate as this will be recorded in the system upon submission."
        />
      
      </Stack>
      <ExpenseDetails expense={newExpense} />
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
