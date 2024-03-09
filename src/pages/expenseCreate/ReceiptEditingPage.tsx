import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditableLabeledInput from "@components/EditableLabeledInput";
import StandardLabeledInput from "@components/StandardLabeledInput";
import EastIcon from "@mui/icons-material/East";
import AddItemModal from "@components/AddItemModal";
import { useRecoilState } from "recoil";
import { newExpenseState } from "@store/expenseStore";
import DateSelector from "@components/DateSelector";
import CustomIconButton from "@components/CustomIconButton";
import CustomSnackbar from "@components/CustomSnackbar";
import ExpenseItemAccordionList from "@components/ExpenseItemAccordionList";

const ReceiptEditingPage = () => {
  const navigate = useNavigate();
  const [newExpense, setNewExpense] = useRecoilState(newExpenseState);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [alertToFillRequiredFields, setAlertToFillRequiredFields] =
    useState(false);

  const ComponentToRender = false ? EditableLabeledInput : StandardLabeledInput;

  const {
    receiptName,
    address,
    receiptDate,
    receiptTotalPrice,
    discountApplied,
    actualPaidPrice,
  } = newExpense;

  const handleExpenseChange = (e: {
    target: { name: string; value: string | null };
  }) => {
    const { name, value } = e.target;
    setNewExpense((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isFormValid =
      receiptName &&
      address &&
      receiptDate &&
      receiptTotalPrice &&
      discountApplied &&
      actualPaidPrice;

    if (isFormValid) {
      navigate("/receipt/final-review");
    } else {
      setAlertToFillRequiredFields(true);
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <Stack divider={<Divider />}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ alignSelf: "center" }}
          >
            Enter Receipt Details Manually
          </Typography>
          <ComponentToRender
            handleInputChange={handleExpenseChange}
            label="Receipt Name *"
            name="receiptName"
            value={receiptName}
          />
          <ComponentToRender
            handleInputChange={handleExpenseChange}
            label="Merchant Address *"
            name="address"
            value={address}
          />
          <DateSelector
            label="Transaction Date *"
            name="receiptDate"
            onSelectionChange={handleExpenseChange}
            selectedOption={receiptDate}
          />
          <ComponentToRender
            handleInputChange={handleExpenseChange}
            label="Total Price *"
            name="receiptTotalPrice"
            value={receiptTotalPrice}
          />
          <ComponentToRender
            handleInputChange={handleExpenseChange}
            label="Discount Applied *"
            name="discountApplied"
            value={discountApplied}
          />
          <ComponentToRender
            handleInputChange={handleExpenseChange}
            label="Actual Paid Price *"
            name="actualPaidPrice"
            value={actualPaidPrice}
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
                handleClose={() => setShowAddItemModal(false)}
                open={showAddItemModal}
                triggerRequiredFieldsAlert={() =>
                  setAlertToFillRequiredFields(true)
                }
              />
            </Box>
            <ExpenseItemAccordionList />
          </Stack>
        </Stack>
        <Stack sx={{ mt: 8 }}>
          <CustomIconButton
            ariaLabel="Move on to next step"
            icon={<EastIcon sx={{ fontSize: "30px" }} />}
            shape="round"
            sx={{
              alignSelf: "flex-end",
            }}
            type="submit"
          />
        </Stack>
      </form>
      <CustomSnackbar
        handleClose={() => setAlertToFillRequiredFields(false)}
        message="Please fill in all required fields."
        severity="warning"
        show={alertToFillRequiredFields}
      />
    </Fragment>
  );
};

export default ReceiptEditingPage;
