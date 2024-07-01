import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider, Paper, Stack, Typography } from "@mui/material";
import CustomButton from "@components/CustomButton";
import SelectableParticipantChipList from "@components/SelectableParticipantChipList";
import PurchasedItemToggleList from "@components/PurchasedItemToggleList";
import { useRecoilValue } from "recoil";
import { newExpenseState } from "@store/expenseStore";
import { useMutation } from "react-query";
import { createNewExpense } from "@apis/expenses/createNewExpense";
import HeadingWithTip from "@components/HeadingWithTip";
import ExpenseDetails from "@components/ExpenseDetails";
import useFeedbackHandler from "@hooks/useFeedbackHandler";
import { useResetRecoilState } from "recoil";

const ExpenseSubmissionPage = () => {
  const navigate = useNavigate();
  const newExpense = useRecoilValue(newExpenseState);
  const resetNewExpense = useResetRecoilState(newExpenseState);

  const {
    mutate: executeCreateNewExpense,
    isSuccess,
    isError,
  } = useMutation(() => createNewExpense(newExpense));

  useFeedbackHandler({
    isError,
    errorMessage:
      "Sorry, we encountered an issue adding new expense. Please try again later.",
    isSuccess,
    successMessage: "Expense successfully added.",
    successAction: useCallback(() => {
      navigate("/");
      resetNewExpense();
    }, []),
  });

  return (
    <Stack sx={{ flexGrow: 1, justifyContent: "space-between" }}>
      <Stack spacing={2}>
        <HeadingWithTip
          heading="Here's how your receipt and item allocations look"
          tipMessage="Please carefully review all the details  and ensure everything is accurate as this will be recorded in the system upon submission."
        />
      </Stack>
      <ExpenseDetails expense={newExpense} showReceiptName />
      <CustomButton
        buttonStyle="default"
        onClick={() => executeCreateNewExpense()}
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
