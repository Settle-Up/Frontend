import { useState } from "react";
import { Box, Typography } from "@mui/material";
import StandardLabeledInput from "@components/StandardLabeledInput";
import CustomButton from "./CustomButton";
import { v4 as uuidv4 } from "uuid";
import Modal from "@components/Modal";
import validateExpenseInput from "@utils/validateExpenseInput";

type AddItemModalProps = {
  addItem: (item: Item) => void;
  closeModal: () => void;
  open: boolean;
};

const AddItemModal = ({ addItem, closeModal, open }: AddItemModalProps) => {
  const [item, setItem] = useState<Item>({
    itemName: "",
    unitPrice: "",
    itemQuantity: "",
    itemTotalPrice: "",
    itemId: "",
  });

  const [itemError, setItemError] = useState<ItemError>({});

  const { itemName, unitPrice, itemQuantity, itemTotalPrice } = item;

  const resetItem = () => {
    setItem({
      itemName: "",
      unitPrice: "",
      itemQuantity: "",
      itemTotalPrice: "",
      itemId: "",
    });
  };

  const submitNewItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    const { errors, isValid } = validateExpenseInput(item, "Item");

    const randomId = uuidv4();

    if (isValid) {
      addItem({ ...item, itemId: randomId });
      resetItem();
      setItemError({}); 
      closeModal();
    } else {
      setItemError(errors);
    }
  };

  const cancelAddItem = () => {
    resetItem();

    setItemError({});

    closeModal();
  };

  const updateItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  return (
    <Modal ariaLabel="Add Item" closeModal={closeModal} isOpen={open}>
      <Box
        sx={{
          textAlign: "left",
        }}
      >
        <Typography variant="h6" gutterBottom color="text.secondary">
          Add Item
        </Typography>
        <StandardLabeledInput
          error={itemError.itemName}
          changeInput={updateItem}
          label="Item Name *"
          name="itemName"
          sx={{ mb: 2 }}
          value={itemName}
        />
        <StandardLabeledInput
          error={itemError.unitPrice}
          changeInput={updateItem}
          label="Unit Price *"
          name="unitPrice"
          sx={{ mb: 2 }}
          value={unitPrice}
        />
        <StandardLabeledInput
          error={itemError.itemQuantity}
          changeInput={updateItem}
          label="Quantity *"
          name="itemQuantity"
          sx={{ mb: 2 }}
          value={itemQuantity}
        />
        <StandardLabeledInput
          error={itemError.itemTotalPrice}
          changeInput={updateItem}
          label="Total Price *"
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
            onClick={(e) => submitNewItem(e)}
          >
            Add
          </CustomButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddItemModal;
