import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StandardLabeledInput from "@components/StandardLabeledInput";
import theme from "@theme";
import RemoveIcon from "@mui/icons-material/Remove";
import CustomIconButton from "./CustomIconButton";

type ExpenseItemAccordionProps = {
  item: ItemOrderDetails;
  itemErrors: ItemError;
  expanded: boolean;
  toggleAccordion: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  handleItemDetailsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete: () => void;
};
const ExpenseItemAccordion = ({
  item,
  itemErrors,
  expanded,
  toggleAccordion,
  handleItemDetailsChange,
  handleDelete,
}: ExpenseItemAccordionProps) => {
  const { itemId, itemName, unitPrice, itemQuantity, itemTotalPrice } = item;

  return (
    <Accordion
      expanded={expanded}
      onChange={toggleAccordion}
      sx={{
        border: `1px solid ${theme.palette.tertiary.main}`,
        "&:hover": {
          backgroundColor: theme.palette.tertiary.light,
        },
        transition: "background-color 0.5s ease",
      }}
      disableGutters={true}
    >
      <AccordionSummary
        expandIcon={
          <IconButton
            color="primary"
            aria-label="dropdown"
            onClick={() => {}}
            sx={{ p: 0.5 }}
          >
            <ExpandMoreIcon fontSize="large" />
          </IconButton>
        }
        aria-controls={`panel${itemId}-header`}
        id={`panel${itemId}-header`}
        sx={{
          borderBottom: `1px solid ${theme.palette.tertiary.main}`,
          color: theme.palette.primary.main,
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", width: "100%", gap: 2 }}
        >
          <CustomIconButton
            ariaLabel="Delete receipt item"
            icon={<RemoveIcon sx={{ fontSize: "24px" }} />}
            handleClick={handleDelete}
            shape="round"
            sx={{ p: 0 }}
            variant="primary"
          />
          <Typography variant="subtitle1" sx={{ width: "33%", flexShrink: 0 }}>
            {itemName}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          <StandardLabeledInput
            error={itemErrors?.itemName.hasError}
            errorText={itemErrors.itemName.message}
            handleInputChange={handleItemDetailsChange}
            label="Item Name"
            name="itemName"
            value={itemName}
          />
          <StandardLabeledInput
            error={itemErrors?.unitPrice.hasError}
            errorText={itemErrors.unitPrice.message}
            handleInputChange={handleItemDetailsChange}
            label="Unit Price"
            name="unitPrice"
            value={unitPrice}
          />
          <StandardLabeledInput
            error={itemErrors?.itemQuantity.hasError}
            errorText={itemErrors.itemQuantity.message}
            handleInputChange={handleItemDetailsChange}
            label="Quantity"
            name="itemQuantity"
            value={itemQuantity}
          />
          <StandardLabeledInput
            error={itemErrors?.itemTotalPrice.hasError}
            errorText={itemErrors.itemTotalPrice.message}
            handleInputChange={handleItemDetailsChange}
            label="Total Price"
            name="itemTotalPrice"
            value={itemTotalPrice}
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default ExpenseItemAccordion;
