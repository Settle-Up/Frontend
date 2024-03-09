import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import theme from "@theme";
import { useRecoilValue } from "recoil";
import { newExpenseState } from "@store/expenseStore";
import mockExpense from "@mock/receiptMock";

const ItemPriceTable = () => {
  //   const { itemOrderDetailsList } = useRecoilValue(newExpenseState);
  const { itemOrderDetailsList } = mockExpense;

  return (
    <TableContainer className="custom-scrollbar">
      <Table sx={{ minWidth: 650 }} aria-label="Receipt Items Summary Table">
        <TableHead>
          <TableRow
            sx={{
              "& > * ": {
                borderBottom: `2px solid ${theme.palette.primary.main}`,
                fontWeight: "bold",
              },
              "& > *:nth-child(odd)": {
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.secondary,
              },
              "& > *:nth-child(even)": {
                backgroundColor: "#EDEDED",
              },
            }}
          >
            <TableCell>Item</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemOrderDetailsList.map(
            ({ id, itemName, unitPrice, itemQuantity, itemTotalPrice }) => (
              <TableRow
                key={id}
                sx={{
                  "& > *:nth-child(odd)": {
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.secondary,
                  },
                  "& > *:nth-child(even)": {
                    backgroundColor: "#EDEDED",
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {itemName}
                </TableCell>
                <TableCell>{unitPrice.toLocaleString()}₩</TableCell>
                <TableCell>{itemQuantity}</TableCell>
                <TableCell>{itemTotalPrice.toLocaleString()}₩</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemPriceTable;
