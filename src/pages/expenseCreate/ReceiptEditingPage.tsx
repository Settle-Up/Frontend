import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Divider, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StandardLabeledInput from "@components/StandardLabeledInput";
import EastIcon from "@mui/icons-material/East";
import AddItemModal from "@components/AddItemModal";
import { useRecoilState } from "recoil";
import { newExpenseState } from "@store/expenseStore";
import DateSelector from "@components/DateSelector";
import CustomIconButton from "@components/CustomIconButton";
import ExpenseItemAccordionList from "@components/ExpenseItemAccordionList";
import { useSetRecoilState } from "recoil";
import { isNewExpenseFormFlowInitiatedState } from "@store/expenseStore";
import validateExpenseInput from "@utils/validateExpenseInput";
import { snackbarState } from "@store/snackbarStore";

const ReceiptEditingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const setSnackbar = useSetRecoilState(snackbarState);

  const setIsNewExpenseFormFlowInitiated = useSetRecoilState(
    isNewExpenseFormFlowInitiatedState
  );

  useEffect(() => {
    setIsNewExpenseFormFlowInitiated(true);
  }, [setIsNewExpenseFormFlowInitiated]);

  useEffect(() => {
    if (location.state && !location.state.isValid) {
      setSnackbar({
        show: true,
        message:
          "Please ensure all required fields have valid values before proceeding.",
        severity: "warning",
      });
    }
    setIsNewExpenseFormFlowInitiated(true);
  }, [location.state]);

  const [newExpense, setNewExpense] = useRecoilState(newExpenseState);

  const { receiptName, address, receiptDate, receiptTotalPrice, itemList } =
    newExpense;

  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const [newExpenseErrors, setNewExpenseErrors] = useState<NewExpenseError>(
    location.state?.errors || {}
  );

  const moveToNextStep = () => {
    const { errors, isValid } = validateExpenseInput(newExpense, "NewExpense");
    setNewExpenseErrors(errors);

    if (!isValid) {
      setSnackbar({
        show: true,
        message:
          "Please ensure all required fields have valid values before proceeding.",
        severity: "warning",
      });
    }

    if (isValid) {
      navigate("/expense/review/final");
    }
  };

  const addItem = (item: Item) => {
    setNewExpense({
      ...newExpense,
      itemList: [...newExpense.itemList, item],
    });
  };

  const removeItem = (itemId: string) => {
    setNewExpense({
      ...newExpense,
      itemList: newExpense.itemList.filter((item) => item.itemId !== itemId),
    });
  };

  const updateItemField = (
    itemId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    const updatedItemList = newExpense.itemList.map((item) =>
      item.itemId === itemId ? { ...item, [name]: value } : item
    );
    setNewExpense({ ...newExpense, itemList: updatedItemList });
  };

  const updateField = (e: {
    target: { name: string; value: string | null };
  }) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({
      ...prev,
      [name as keyof NewExpense]: value,
    }));
  };

  return (
    <Fragment>
      <Stack divider={<Divider />}>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ alignSelf: "center" }}
        >
          Enter Receipt Details Manually
        </Typography>
        <StandardLabeledInput
          error={newExpenseErrors.receiptName}
          changeInput={updateField}
          label="Receipt Name *"
          name="receiptName"
          value={receiptName}
        />
        <StandardLabeledInput
          error={newExpenseErrors.address}
          changeInput={updateField}
          label="Merchant Address *"
          name="address"
          value={address}
        />
        <DateSelector
          error={newExpenseErrors.receiptDate}
          label="Transaction Date *"
          name="receiptDate"
          changeDate={updateField}
          selectedOption={receiptDate}
        />
        <StandardLabeledInput
          error={newExpenseErrors.receiptTotalPrice}
          changeInput={updateField}
          label="Total Price *"
          name="receiptTotalPrice"
          value={receiptTotalPrice}
        />
        <Stack>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Typography variant="subtitle2">Items</Typography>
            <CustomIconButton
              ariaLabel="Add new item"
              icon={<AddIcon sx={{ fontSize: "24px" }} />}
              handleClick={() => setShowAddItemModal(true)}
              shape="round"
              sx={{ p: 0 }}
              variant="primary"
            />
            <AddItemModal
              addItem={addItem}
              closeModal={() => setShowAddItemModal(false)}
              open={showAddItemModal}
            />
          </Box>
          <ExpenseItemAccordionList
            itemList={itemList}
            itemErrorList={newExpenseErrors.itemList}
            updateItemField={updateItemField}
            removeItem={removeItem}
          />
        </Stack>
      </Stack>
      <Stack>
        <CustomIconButton
          ariaLabel="Move on to next step"
          icon={<EastIcon sx={{ fontSize: "30px" }} />}
          shape="round"
          sx={{
            alignSelf: "flex-end",
            mt: 5,
          }}
          handleClick={() => moveToNextStep()}
        />
      </Stack>
    </Fragment>
  );
};

export default ReceiptEditingPage;
