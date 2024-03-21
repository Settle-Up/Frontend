import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import theme from "@theme";

type Participant = {
  id: number;
  name: string;
};

type ItemAllocationAccordionProps = {
  participantList: Participant[];
  item: ReceiptItem;
};

type AllocationItem = {
    name: string;
    count: number;
  };
  
const ItemAllocationAccordion = ({
  participantList,
  item,
}: ItemAllocationAccordionProps) => {
  // const [expanded, setExpanded] = useState<number | false>(false);
  // const [allocations, setAllocations] = useState<AllocationItem[]>(items);

  // const { id, itemName, quantity: maxQuantity } = item;

  // const handleChange =
  //   (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
  //     setExpanded(isExpanded ? panel : false);
  //   };

  //   const handleQuantityChange = (index: number, delta: number) => {
  //       const newAllocations = allocations.map((item, idx) => {
  //         if (idx === index) {
  //           let newCount = item.count + delta;
  //           // Ensure the count is never below 0 or above maxQuantity.
  //           newCount = Math.max(0, newCount);
  //           newCount = Math.min(maxQuantity, newCount);
  //           return { ...item, count: newCount };
  //         }
  //         return item;
  //       });
  //       setAllocations(newAllocations);
  //     };

  //   const totalAllocated = allocations.reduce((total, item) => total + item.count, 0);

  return (
    <></>
    // <Accordion
    //   expanded={expanded === id}
    //   onChange={handleChange(id)}
    //   sx={{
    //     border: `1px solid ${theme.palette.tertiary.main}`,
    //     "&:hover": {
    //       backgroundColor: theme.palette.tertiary.light,
    //     },
    //     transition: "background-color 0.5s ease",
    //   }}
    //   disableGutters={true}
    // >
    //   <AccordionSummary
    //     expandIcon={
    //       <IconButton
    //         color="primary"
    //         aria-label="dropdown"
    //         onClick={() => {}}
    //         sx={{ p: 0.5 }}
    //       >
    //         <ExpandMoreIcon fontSize="large" />
    //       </IconButton>
    //     }
    //     aria-controls={`panel${id}-header`}
    //     id={`panel${id}-header`}
    //     sx={{
    //       borderBottom: `1px solid ${theme.palette.tertiary.main}`,
    //       color: theme.palette.primary.main,
    //     }}
    //   >
    //     {/* <Box
    //       sx={{ display: "flex", alignItems: "center", width: "100%", gap: 1 }}
    //     >
    //       <Typography variant="subtitle1" sx={{ width: "33%", flexShrink: 0 }}>
    //         {itemName}
    //       </Typography>
    //     </Box> */}
    //     <Box
    //       sx={{
    //         width: "100%",
    //         display: "flex",
    //         justifyContent: "space-between",
    //         alignItems: "center",
    //         gap: 1,
    //       }}
    //     >
    //       <Stack
    //         sx={{ wordBreak: "break-all", flexWrap: "wrap", width: "80%" }}
    //       >
    //         <Typography>{item.itemName}</Typography>
    //         <Typography variant="caption" color="textSecondary">
    //           ({item.unitPrice.toLocaleString()}₩ x {item.quantity})
    //         </Typography>
    //       </Stack>
    //       <Typography
    //         variant="subtitle2"
    //         sx={{
    //           backgroundColor: theme.palette.tertiary.main,
    //           borderRadius: 10,
    //           px: 1.2,
    //           py: 0.2,
    //         }}
    //       >
    //         {`${item.itemTotalPrice.toLocaleString()}₩`}
    //       </Typography>
    //     </Box>
    //   </AccordionSummary>
    //   <AccordionDetails>
    //     <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
    //       {participantList.map(({id, name}, index) => (
    //         <Paper
    //           variant="outlined"
    //           square
    //           key={id}
    //           sx={{
    //             mb: 1,
    //             p: 1,
    //             display: "flex",
    //             justifyContent: "space-between",
    //             alignItems: "center",
    //           }}
    //         >
    //           <Typography variant="body1">{name}</Typography>
    //           <ButtonGroup size="small" aria-label="small button group">
    //             <Button onClick={() => handleQuantityChange(index, -1)}>
    //               -
    //             </Button>
    //             {/* <Button disabled>{count}</Button> */}
    //             <Button onClick={() => handleQuantityChange(index, 1)}>
    //               +
    //             </Button>
    //           </ButtonGroup>
    //         </Paper>
    //       ))}
    //       <Box
    //         sx={{
    //           mt: 2,
    //           display: "flex",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //         }}
    //       >
    //         <Typography variant="body2">{`${totalAllocated}/${maxQuantity} Quantity Allocated`}</Typography>
    //       </Box>
    //     </Box>
    //   </AccordionDetails>
    // </Accordion>
  );
};

export default ItemAllocationAccordion;
