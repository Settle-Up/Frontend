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
import theme from "@theme";
import ItemDescription from "@components/ItemDescription";

type ParticipantExpenseAccordionProps = {
  allocationType: AllocationType;
  expanded: boolean;
  participant: GeneralUser;
  participantExpense: ParticipantPurchaseDetails;
  toggleAccordion: (event: React.SyntheticEvent, isExpanded: boolean) => void;
};

const ParticipantExpenseAccordion = ({
  allocationType,
  expanded,
  participant,
  participantExpense,
  toggleAccordion,
}: ParticipantExpenseAccordionProps) => {
  const { userId, userName } = participant;

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
            <ExpandMoreIcon fontSize="medium" />
          </IconButton>
        }
        aria-controls={`panel${userId}-header`}
        id={`panel${userId}-header`}
        sx={{
          borderBottom: `1px solid ${theme.palette.tertiary.main}`,
          color: theme.palette.primary.main,
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", width: "100%", gap: 1 }}
        >
          <Typography
            variant="subtitle1"
            sx={{ width: "60%", wordBreak: "break-all" }}
          >
            {userName}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ width: "40%", wordBreak: "break-all", textAlign: "right" }}
          >
            {participantExpense.totalPurchasedCost}₩
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={1}>
          {participantExpense.purchasedItemList.map((purchasedItem, index) => {
            if (allocationType === "Equal Quantity") {
              const {
                itemName,
                itemTotalPrice,
                jointPurchaserCount,
                itemPurchasedCost,
              } = purchasedItem as EqualShareItemDetails;
              return (
                <ItemDescription
                  key={index}
                  itemName={itemName}
                  initialAmount={itemTotalPrice}
                  quantity={jointPurchaserCount!.toString()}
                  calculatedTotal={itemPurchasedCost!.toString()}
                  mode="equalQuantity"
                />
              );
            } else {
              const {
                itemName,
                unitPrice,
                purchasedQuantity,
                itemPurchasedCost,
              } = purchasedItem as VariableShareItemDetails;
              return (
                <ItemDescription
                  key={index}
                  itemName={itemName}
                  initialAmount={unitPrice}
                  quantity={purchasedQuantity.toString()}
                  calculatedTotal={itemPurchasedCost.toString()}
                  mode="variableQuantity"
                />
              );
            }
          })}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default ParticipantExpenseAccordion;
