import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditableLabeledInput from "@components/EditableLabeledInput";
import StandardLabeledInput from "@components/StandardLabeledInput";
import EastIcon from "@mui/icons-material/East";
import AddItemModal from "@components/AddItemModal";
import { useRecoilState } from "recoil";
import { newExpenseState } from "@store/expenseStore";
import DateSelector from "@components/DateSelector";
import CustomIconButton from "@components/CustomIconButton";
import ExpenseItemAccordionList from "@components/ExpenseItemAccordionList";
import { formatNumberWithLocaleAndNegatives } from "@utils/numberStringConversions";

const ReceiptEditingPage = () => {
  const navigate = useNavigate();
  const [newExpense, setNewExpense] = useRecoilState(newExpenseState);
  const {
    receiptName,
    address,
    receiptDate,
    receiptTotalPrice,
    itemOrderDetailsList,
  } = newExpense;

  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    receiptName: { hasError: false, message: "" },
    address: { hasError: false, message: "" },
    receiptDate: { hasError: false, message: "" },
    receiptTotalPrice: { hasError: false, message: "" },
  });

  const initialItemErrors = itemOrderDetailsList.reduce(
    (acc, item) => ({
      ...acc,
      [item.itemId]: {
        itemName: { hasError: false, message: "" },
        unitPrice: { hasError: false, message: "" },
        itemQuantity: { hasError: false, message: "" },
        itemTotalPrice: { hasError: false, message: "" },
      },
    }),
    {}
  );

  const [itemErrors, setItemErrors] =
    useState<ItemOrderDetailsListError>(initialItemErrors);

  const ComponentToRender = false ? EditableLabeledInput : StandardLabeledInput;

  const handleExpenseChange = (e: {
    target: { name: string; value: string | null };
  }) => {
    const { name, value } = e.target;
    let formattedValue: string;
    if (
      ["receiptTotalPrice"].includes(name)
    ) {
      formattedValue = formatNumberWithLocaleAndNegatives(value!);
      setFieldErrors((prev) => ({
        ...prev,
        [name]:
          formattedValue === ""
            ? {
                hasError: true,
                message: "Invalid input. Only numbers are allowed.",
              }
            : {
                hasError: false,
                message: "",
              },
      }));
    }
    setNewExpense((prevItem) => ({
      ...prevItem,
      [name]: formattedValue ?? value,
    }));
  };

  const validateGeneralExpenseFields = () => {
    const newFieldErrors = { ...fieldErrors };
    Object.keys(newFieldErrors).forEach((key) => {
      const isEmpty = !newExpense[key as keyof typeof newExpense];
      newFieldErrors[key as keyof typeof newFieldErrors] = {
        hasError: isEmpty,
        message: isEmpty ? "This field is required." : "",
      };
    });

    return newFieldErrors;
  };

  const validateEachExpenseItem = () => {
    const newItemErrors = { ...itemErrors };
    itemOrderDetailsList.forEach((item) => {
      newItemErrors[item.itemId] = {
        itemName: {
          hasError: !item.itemName,
          message: !item.itemName ? "Item name is required." : "",
        },
        unitPrice: {
          hasError: !item.unitPrice,
          message: !item.unitPrice ? "Unit price is required." : "",
        },
        itemQuantity: {
          hasError: !item.itemQuantity,
          message: !item.itemQuantity ? "Item quantity is required." : "",
        },
        itemTotalPrice: {
          hasError: !item.itemTotalPrice,
          message: !item.itemTotalPrice ? "Total price is required." : "",
        },
      };
    });

    return newItemErrors;
  };

  const moveToNextStep = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedFieldErrors = validateGeneralExpenseFields();
    setFieldErrors(updatedFieldErrors);

    const noFieldErrors = Object.values(fieldErrors).every(
      (field) => !field.hasError
    );

    const updatedItemErrors = validateEachExpenseItem();
    setItemErrors(updatedItemErrors);

    const noItemErrors = Object.values(updatedItemErrors).every((itemError) =>
      Object.values(itemError).every((value) => value.hasError === false)
    );

    if (noFieldErrors && noItemErrors) {
      navigate("/expense/review/final");
    }
  };

  return (
    <Fragment>
      <form onSubmit={moveToNextStep} noValidate autoComplete="off">
        <Stack divider={<Divider />}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ alignSelf: "center" }}
          >
            Enter Receipt Details Manually
          </Typography>
          <ComponentToRender
            error={fieldErrors.receiptName.hasError}
            errorText={fieldErrors.receiptName.message}
            handleInputChange={handleExpenseChange}
            label="Receipt Name *"
            name="receiptName"
            value={receiptName}
          />
          <ComponentToRender
            error={fieldErrors.address.hasError}
            errorText={fieldErrors.address.message}
            handleInputChange={handleExpenseChange}
            label="Merchant Address *"
            name="address"
            value={address}
          />
          <DateSelector
            error={fieldErrors.receiptDate.hasError}
            errorText={fieldErrors.receiptDate.message}
            label="Transaction Date *"
            name="receiptDate"
            onSelectionChange={handleExpenseChange}
            selectedOption={receiptDate}
          />
          <ComponentToRender
            error={fieldErrors.receiptTotalPrice.hasError}
            errorText={fieldErrors.receiptTotalPrice.message}
            handleInputChange={handleExpenseChange}
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
                closeModal={() => setShowAddItemModal(false)}
                open={showAddItemModal}
                setItemErrors={setItemErrors}
              />
            </Box>
            <ExpenseItemAccordionList
              itemErrors={itemErrors}
              setItemErrors={setItemErrors}
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
            type="submit"
          />
        </Stack>
      </form>
    </Fragment>
  );
};

export default ReceiptEditingPage;
