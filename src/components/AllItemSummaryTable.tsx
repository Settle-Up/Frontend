import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import theme from "@theme";

type AllItemSummaryTableProps = {
  itemOrderDetailsList: ItemOrderDetails[];
};

const AllItemSummaryTable = ({
  itemOrderDetailsList,
}: AllItemSummaryTableProps) => {
  return (
    <TableContainer className="custom-scrollbar" sx={{ "&  *": {
      wordBreak: "none",
    },}}>
      <Table sx={{ minWidtsh: 650 }} aria-label="Receipt Items Summary Table">
        <TableHead>
          <TableRow
            sx={{
              "& > *": {
                whiteSpace: "nowrap",
              },
            }}
          >
            {["Item", "Unit Price", "Quantity", "Total Price"].map(
              (text, index) => (
                <TableCell
                  key={text}
                  sx={{
                    fontWeight: "bold",
                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                    backgroundColor:
                      index % 2 === 0
                        ? theme.palette.background.paper
                        : "#EDEDED",
                    color:
                      index % 2 === 0
                        ? theme.palette.text.secondary
                        : "inherit",
                  }}
                >
                  {text}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {itemOrderDetailsList.map(
            ({ itemId, itemName, unitPrice, itemQuantity }, rowIndex) => {
              console.log(`Row Key: ${itemId}`);
              return (
                <TableRow key={rowIndex}>
                  {[
                    itemName,
                    unitPrice + "₩",
                    itemQuantity,
                    `${parseFloat(unitPrice) * parseInt(itemQuantity)}₩`,
                  ].map((cellData, cellIndex) => {
                    const isOdd = cellIndex % 2 === 0;
                    return (
                      <TableCell
                        key={`${rowIndex}-${cellIndex}`}
                        component={cellIndex === 0 ? "th" : undefined}
                        scope={cellIndex === 0 ? "row" : undefined}
                        sx={{
                          backgroundColor: isOdd
                            ? theme.palette.background.paper
                            : "#EDEDED",
                          color: isOdd
                            ? theme.palette.text.secondary
                            : "inherit",
                        }}
                      >
                        {cellData}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllItemSummaryTable;
