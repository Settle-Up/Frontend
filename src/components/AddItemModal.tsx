import { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import StandardLabeledInput from "@components/StandardLabeledInput";
import CustomButton from "./CustomButton";
import theme from "@theme";
import { useSetRecoilState } from "recoil";
import { newExpenseState } from "@store/expenseStore";
import { v4 as uuidv4 } from "uuid";

type AddItemModalProps = {
  handleClose: () => void;
  open: boolean;
  triggerRequiredFieldsAlert: () => void;
};

const AddItemModal = ({
  handleClose,
  open,
  triggerRequiredFieldsAlert,
}: AddItemModalProps) => {
  const setNewExpense = useSetRecoilState(newExpenseState);

  const [item, setItem] = useState<ItemOrderDetails>({
    itemName: "",
    unitPrice: "",
    itemQuantity: "",
    itemTotalPrice: "",
    id: uuidv4(),
  });

  const { itemName, unitPrice, itemQuantity, itemTotalPrice } = item;

  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const isFormValid = itemName && unitPrice && itemQuantity && itemTotalPrice;

    if (isFormValid) {
      setNewExpense((prevExpense) => ({
        ...prevExpense,
        itemOrderDetailsList: [...prevExpense.itemOrderDetailsList, item],
      }));

      setItem({
        itemName: "",
        unitPrice: "",
        itemQuantity: "",
        itemTotalPrice: "",
        id: uuidv4(),
      });

      handleClose();
    } else {
      triggerRequiredFieldsAlert();
    }
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
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
            handleInputChange={handleItemChange}
            label="Item Name"
            name="itemName"
            sx={{mb: 2}}
            value={itemName}
          />
          <StandardLabeledInput
            handleInputChange={handleItemChange}
            label="Unit Price"
            name="unitPrice"
            sx={{mb: 2}}
            value={unitPrice}
          />
          <StandardLabeledInput
            handleInputChange={handleItemChange}
            label="Quantity"
            name="itemQuantity"
            sx={{mb: 2}}
            value={itemQuantity}
          />
          <StandardLabeledInput
            handleInputChange={handleItemChange}
            label="Total Price"
            name="itemTotalPrice"
            sx={{mb: 2}}
            value={itemTotalPrice}
          />
          <Box sx={{ display: "flex", gap: 1 }} mt={2}>
            <CustomButton
              buttonStyle="secondaryOutline"
              onClick={handleClose}
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
