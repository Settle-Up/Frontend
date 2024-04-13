import { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import StandardLabeledInput from "@components/StandardLabeledInput";
import CustomButton from "./CustomButton";
import theme from "@theme";
import { useSetRecoilState } from "recoil";
import { newExpenseState } from "@store/expenseStore";
import { v4 as uuidv4 } from "uuid";
import { formatNumberWithLocaleAndNegatives } from "@utils/numberStringConversions";
import CustomModal from "@components/CustomModal";

type AddItemModalProps = {
  closeModal: () => void;
  open: boolean;
  setItemErrors: React.Dispatch<
    React.SetStateAction<ItemOrderDetailsListError>
  >;
};

const AddItemModal = ({
  closeModal,
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

  // const validateAllFieldsHaveNoErrors = () => {
  //   const newItemErrors = { ...itemError };
  //   Object.keys(newItemErrors).forEach((key) => {
  //     if (key in item) {
  //       newItemErrors[key as keyof typeof newItemErrors].hasError =
  //         !item[key as keyof typeof item];
  //     }
  //   });

  //   return newItemErrors;
  // };

  const verifyAllFieldsAreFilled = () => {
    const newItemErrors: ItemError = { ...itemError };

    Object.keys(itemError).forEach((key) => {
      const isEmpty = !item[key as keyof typeof item];
      console.log(key, isEmpty, item[key as keyof typeof item]);
      newItemErrors[key as keyof typeof newItemErrors] = {
        hasError: isEmpty,
        message: isEmpty ? "This field is required." : "",
      };
    });

    console.log("_____________________", newItemErrors);

    setItemError(newItemErrors);
  };

  const verifyQuantityTimesUnitPriceEqualsTotalPrice = () => {
    const price = parseFloat(unitPrice.replace(/,/g, ""));
    const quantity = parseFloat(itemQuantity.replace(/,/g, ""));
    const totalPrice = parseFloat(itemTotalPrice.replace(/,/g, ""));

    if (!isNaN(price) && !isNaN(quantity) && !isNaN(totalPrice)) {
      const calculatedTotal = price * quantity;
      if (calculatedTotal !== totalPrice) {
        setItemError((prev) => ({
          ...prev,
          itemTotalPrice: {
            hasError: true,
            message:
              "Total price does not match unit price multiplied by quantity.",
          },
        }));
      }
    }
  };

  const addItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    verifyAllFieldsAreFilled();
    verifyQuantityTimesUnitPriceEqualsTotalPrice();

    // const updatedItemError = validateAllFieldsHaveNoErrors();
    // setItemError(updatedItemError);

    const noItemErrors = Object.values(itemError).every(
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

      closeModal();
    }
  };

  const cancelAddItem = () => {
    setItem({
      itemName: "",
      unitPrice: "",
      itemQuantity: "",
      itemTotalPrice: "",
      itemId: "",
    });

    setItemError({
      itemName: { hasError: false, message: "" },
      unitPrice: { hasError: false, message: "" },
      itemQuantity: { hasError: false, message: "" },
      itemTotalPrice: { hasError: false, message: "" },
    });

    closeModal();
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue: string = value;
    if (["unitPrice", "itemQuantity", "itemTotalPrice"].includes(name)) {
      formattedValue = formatNumberWithLocaleAndNegatives(value!);
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
    <CustomModal ariaLabel="Add Item" closeModal={closeModal} isOpen={open}>
      <Box
        sx={{
          textAlign: "left",
        }}
      >
        <form onSubmit={addItem} noValidate autoComplete="off">
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
              onClick={cancelAddItem}
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
    </CustomModal>
  );
};

export default AddItemModal;
