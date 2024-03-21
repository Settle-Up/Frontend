import { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import StandardLabeledInput from "@components/StandardLabeledInput";
import CustomButton from "./CustomButton";
import theme from "@theme";
import { useSetRecoilState } from "recoil";
import { newExpenseState } from "@store/expenseStore";
import { v4 as uuidv4 } from "uuid";
import { formatNumberInput } from "@utils/numberStringConversions";

type AddItemModalProps = {
  handleClose: () => void;
  open: boolean;
  setItemErrors: React.Dispatch<
    React.SetStateAction<ItemOrderDetailsListError>
  >;
};

const AddItemModal = ({
  handleClose,
  open,
  setItemErrors,
}: AddItemModalProps) => {
  const setNewExpense = useSetRecoilState(newExpenseState);

  const [item, setItem] = useState<ItemOrderDetails>({
    itemName: "",
    unitPrice: "",
    itemQuantity: "",
    itemTotalPrice: "",
    itemId: "",
  });
  const [itemError, setItemError] = useState<ItemError>({
    itemName: { hasError: false, message: "" },
    unitPrice: { hasError: false, message: "" },
    itemQuantity: { hasError: false, message: "" },
    itemTotalPrice: { hasError: false, message: "" },
  });

  const { itemName, unitPrice, itemQuantity, itemTotalPrice } = item;

  const validateItem = () => {
    const newItemErrors = { ...itemError };
    Object.keys(newItemErrors).forEach((key) => {
      if (key in item) {
        newItemErrors[key as keyof typeof newItemErrors].hasError =
          !item[key as keyof typeof item];
      }
    });

    return newItemErrors;
  };

  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const updatedItemError = validateItem();
    setItemError(updatedItemError);

    const noItemErrors = Object.values(updatedItemError).every(
      (value) => value.hasError === false
    );

    const randomId = uuidv4();

    if (noItemErrors) {
      setNewExpense((prevExpense: NewGroupExpense) => ({
        ...prevExpense,
        itemOrderDetailsList: [
          ...prevExpense.itemOrderDetailsList,
          { ...item, id: randomId },
        ],
      }));

      setItem({
        itemName: "",
        unitPrice: "",
        itemQuantity: "",
        itemTotalPrice: "",
        itemId: "",
      });

      setItemErrors((prev) => ({
        ...prev,
        [randomId]: {
          itemName: { hasError: false, message: "" },
          unitPrice: { hasError: false, message: "" },
          itemQuantity: { hasError: false, message: "" },
          itemTotalPrice: { hasError: false, message: "" },
        },
      }));

      handleClose();
    } else {
      // triggerRequiredFieldsAlert();
    }
  };

  const handleCancel = () => {
    setItem({
      itemName: "",
      unitPrice: "",
      itemQuantity: "",
      itemTotalPrice: "",
      itemId: "",
    });

    handleClose();
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue: string = value;
    if (["unitPrice", "itemQuantity", "itemTotalPrice"].includes(name)) {
      formattedValue = formatNumberInput(value!);
      setItemError((prev) => ({
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

    setItem((prevItem) => ({
      ...prevItem,
      [name]: formattedValue ?? value,
    }));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-item-modal"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: 4,
          border: `1px solid ${theme.palette.primary.main}`,
          p: 4,
          m: 2,
          width: 400,
        }}
      >
        <form onSubmit={handleAddItem} noValidate autoComplete="off">
          <Typography variant="h6" gutterBottom color="text.secondary">
            Add Item
          </Typography>
          <StandardLabeledInput
            error={itemError.itemName.hasError}
            errorText={itemError.itemName.message}
            handleInputChange={handleItemChange}
            label="Item Name"
            name="itemName"
            sx={{ mb: 2 }}
            value={itemName}
          />
          <StandardLabeledInput
            error={itemError.unitPrice.hasError}
            errorText={itemError.unitPrice.message}
            handleInputChange={handleItemChange}
            label="Unit Price"
            name="unitPrice"
            sx={{ mb: 2 }}
            value={unitPrice}
          />
          <StandardLabeledInput
            error={itemError.itemQuantity.hasError}
            errorText={itemError.itemQuantity.message}
            handleInputChange={handleItemChange}
            label="Quantity"
            name="itemQuantity"
            sx={{ mb: 2 }}
            value={itemQuantity}
          />
          <StandardLabeledInput
            error={itemError.itemTotalPrice.hasError}
            errorText={itemError.itemTotalPrice.message}
            handleInputChange={handleItemChange}
            label="Total Price"
            name="itemTotalPrice"
            sx={{ mb: 2 }}
            value={itemTotalPrice}
          />
          <Box sx={{ display: "flex", gap: 1 }} mt={2}>
            <CustomButton
              buttonStyle="secondaryOutline"
              onClick={handleCancel}
              sx={{ flex: 1 }}
            >
              Cancel
            </CustomButton>
            <CustomButton
              buttonStyle="secondary"
              sx={{ flex: 1 }}
              type="submit"
            >
              Add
            </CustomButton>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddItemModal;
